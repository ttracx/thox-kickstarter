use anyhow::{anyhow, Context, Result};
use serde::{Deserialize, Serialize};
use serde_json::{json, Value};
use std::collections::BTreeMap;
use std::fs;
use std::hash::{Hash, Hasher};
use std::path::{Path, PathBuf};
use std::time::Instant;

use crate::protocol::{CAP_EMBED_HASH, CAP_INTENT, CAP_SENSOR_ANOMALY};

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct IntentModel {
    pub name: String,
    pub version: String,
    pub labels: Vec<String>,
    pub vocabulary: Vec<String>,
    pub weights: Vec<Vec<f64>>,
    pub bias: Vec<f64>,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct SensorAnomalyModel {
    pub name: String,
    pub version: String,
    pub feature_names: Vec<String>,
    pub mean: Vec<f64>,
    pub std: Vec<f64>,
    pub threshold: f64,
}

#[derive(Debug, Clone)]
pub struct EdgeAiEngine {
    intent: IntentModel,
    sensor: SensorAnomalyModel,
}

impl EdgeAiEngine {
    pub fn load(models_dir: impl AsRef<Path>) -> Result<Self> {
        let dir = models_dir.as_ref();
        let intent_path = dir.join("intent_v1.json");
        let sensor_path = dir.join("sensor_anomaly_v1.json");
        let intent = read_json::<IntentModel>(&intent_path)
            .with_context(|| format!("loading {}", intent_path.display()))?;
        let sensor = read_json::<SensorAnomalyModel>(&sensor_path)
            .with_context(|| format!("loading {}", sensor_path.display()))?;
        intent.validate()?;
        sensor.validate()?;
        Ok(Self { intent, sensor })
    }

    pub fn capabilities(&self) -> Vec<String> {
        vec![CAP_INTENT.to_string(), CAP_SENSOR_ANOMALY.to_string(), CAP_EMBED_HASH.to_string()]
    }

    pub fn run(&self, kind: &str, payload: &Value, max_output_bytes: usize) -> Result<Value> {
        let started = Instant::now();
        let result = match kind {
            CAP_INTENT => self.intent(payload)?,
            CAP_SENSOR_ANOMALY => self.sensor_anomaly(payload)?,
            CAP_EMBED_HASH => self.embed_hash(payload)?,
            other => return Err(anyhow!("unsupported task kind: {other}")),
        };
        let mut result = result;
        if let Value::Object(ref mut map) = result {
            map.insert("duration_ms".to_string(), json!(started.elapsed().as_millis() as u64));
        }
        let encoded = serde_json::to_vec(&result)?;
        if encoded.len() > max_output_bytes {
            return Err(anyhow!("result exceeds max_output_bytes"));
        }
        Ok(result)
    }

    fn intent(&self, payload: &Value) -> Result<Value> {
        let text = payload.get("text").and_then(Value::as_str).ok_or_else(|| anyhow!("payload.text is required"))?;
        let tokens = tokenize(text);
        let mut features = vec![0.0; self.intent.vocabulary.len()];
        let vocab_index: BTreeMap<&str, usize> = self.intent.vocabulary.iter().enumerate().map(|(i, s)| (s.as_str(), i)).collect();
        for token in tokens {
            if let Some(i) = vocab_index.get(token.as_str()) {
                features[*i] += 1.0;
            }
        }
        let mut scores = Vec::with_capacity(self.intent.labels.len());
        for label_idx in 0..self.intent.labels.len() {
            let mut score = self.intent.bias[label_idx];
            for (feature, weight) in features.iter().zip(self.intent.weights[label_idx].iter()) {
                score += feature * weight;
            }
            scores.push(score);
        }
        let probs = softmax(&scores);
        let (best_idx, best_prob) = probs
            .iter()
            .enumerate()
            .max_by(|(_, a), (_, b)| a.partial_cmp(b).unwrap_or(std::cmp::Ordering::Equal))
            .ok_or_else(|| anyhow!("empty model probabilities"))?;
        let mut all = BTreeMap::new();
        for (label, prob) in self.intent.labels.iter().zip(probs.iter()) {
            all.insert(label.clone(), *prob);
        }
        Ok(json!({
            "kind": CAP_INTENT,
            "model": self.intent.name,
            "version": self.intent.version,
            "label": self.intent.labels[best_idx],
            "confidence": best_prob,
            "scores": all,
            "preview": format!("intent={} confidence={:.3}", self.intent.labels[best_idx], best_prob),
        }))
    }

    fn sensor_anomaly(&self, payload: &Value) -> Result<Value> {
        let arr = payload.get("features").and_then(Value::as_array).ok_or_else(|| anyhow!("payload.features array is required"))?;
        if arr.len() != self.sensor.mean.len() {
            return Err(anyhow!("expected {} features, got {}", self.sensor.mean.len(), arr.len()));
        }
        let mut z = Vec::with_capacity(arr.len());
        let mut sum_sq = 0.0;
        for (idx, value) in arr.iter().enumerate() {
            let x = value.as_f64().ok_or_else(|| anyhow!("features[{idx}] must be numeric"))?;
            let denom = self.sensor.std[idx].max(1e-9);
            let zi = (x - self.sensor.mean[idx]) / denom;
            z.push(zi);
            sum_sq += zi * zi;
        }
        let score = (sum_sq / arr.len() as f64).sqrt();
        let anomaly = score >= self.sensor.threshold;
        Ok(json!({
            "kind": CAP_SENSOR_ANOMALY,
            "model": self.sensor.name,
            "version": self.sensor.version,
            "score": score,
            "threshold": self.sensor.threshold,
            "anomaly": anomaly,
            "z": z,
            "feature_names": self.sensor.feature_names,
            "preview": format!("anomaly={} score={:.3}", anomaly, score),
        }))
    }

    fn embed_hash(&self, payload: &Value) -> Result<Value> {
        let text = payload.get("text").and_then(Value::as_str).ok_or_else(|| anyhow!("payload.text is required"))?;
        let dims = payload.get("dims").and_then(Value::as_u64).unwrap_or(64).clamp(8, 512) as usize;
        let mut vector = vec![0.0f64; dims];
        for token in tokenize(text) {
            let mut hasher = std::collections::hash_map::DefaultHasher::new();
            token.hash(&mut hasher);
            let h = hasher.finish();
            let idx = (h as usize) % dims;
            let sign = if (h >> 63) == 0 { 1.0 } else { -1.0 };
            vector[idx] += sign;
        }
        let norm = vector.iter().map(|v| v * v).sum::<f64>().sqrt().max(1e-9);
        for v in &mut vector {
            *v /= norm;
        }
        Ok(json!({
            "kind": CAP_EMBED_HASH,
            "dims": dims,
            "vector": vector,
            "preview": format!("hash_embedding dims={dims}"),
        }))
    }
}

impl IntentModel {
    fn validate(&self) -> Result<()> {
        if self.labels.is_empty() || self.vocabulary.is_empty() {
            return Err(anyhow!("intent model labels/vocabulary cannot be empty"));
        }
        if self.weights.len() != self.labels.len() || self.bias.len() != self.labels.len() {
            return Err(anyhow!("intent model weight/bias label dimension mismatch"));
        }
        for row in &self.weights {
            if row.len() != self.vocabulary.len() {
                return Err(anyhow!("intent model weight vocabulary dimension mismatch"));
            }
        }
        Ok(())
    }
}

impl SensorAnomalyModel {
    fn validate(&self) -> Result<()> {
        let n = self.feature_names.len();
        if n == 0 || self.mean.len() != n || self.std.len() != n {
            return Err(anyhow!("sensor anomaly model dimension mismatch"));
        }
        Ok(())
    }
}

fn read_json<T: for<'de> Deserialize<'de>>(path: &PathBuf) -> Result<T> {
    let data = fs::read_to_string(path)?;
    Ok(serde_json::from_str(&data)?)
}

fn tokenize(text: &str) -> Vec<String> {
    text.to_lowercase()
        .split(|c: char| !c.is_ascii_alphanumeric())
        .filter(|s| !s.is_empty())
        .map(ToString::to_string)
        .collect()
}

fn softmax(scores: &[f64]) -> Vec<f64> {
    let max = scores.iter().copied().fold(f64::NEG_INFINITY, f64::max);
    let exps: Vec<f64> = scores.iter().map(|s| (s - max).exp()).collect();
    let denom = exps.iter().sum::<f64>().max(1e-12);
    exps.into_iter().map(|v| v / denom).collect()
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn softmax_sums_to_one() {
        let probs = softmax(&[1.0, 2.0, 3.0]);
        let total: f64 = probs.iter().sum();
        assert!((total - 1.0).abs() < 1e-9);
    }

    #[test]
    fn tokenize_basic() {
        assert_eq!(tokenize("Hello, Air-node!"), vec!["hello", "air", "node"]);
    }
}

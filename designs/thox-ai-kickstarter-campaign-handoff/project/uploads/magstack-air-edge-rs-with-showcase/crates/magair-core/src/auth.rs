use anyhow::{anyhow, Result};
use hmac::{Hmac, Mac};
use sha2::Sha256;
use std::time::{SystemTime, UNIX_EPOCH};

type HmacSha256 = Hmac<Sha256>;

pub fn now_ms() -> i64 {
    SystemTime::now()
        .duration_since(UNIX_EPOCH)
        .unwrap_or_default()
        .as_millis() as i64
}

pub fn sign_body(secret: &str, timestamp_ms: i64, body: &[u8]) -> Result<String> {
    let mut mac = HmacSha256::new_from_slice(secret.as_bytes())
        .map_err(|_| anyhow!("invalid hmac key"))?;
    mac.update(timestamp_ms.to_string().as_bytes());
    mac.update(b".");
    mac.update(body);
    Ok(hex::encode(mac.finalize().into_bytes()))
}

pub fn verify_body(secret: &str, timestamp_ms: i64, body: &[u8], signature_hex: &str, max_skew_ms: i64) -> Result<()> {
    let now = now_ms();
    if (now - timestamp_ms).abs() > max_skew_ms {
        return Err(anyhow!("hmac timestamp outside allowed skew"));
    }
    let expected = sign_body(secret, timestamp_ms, body)?;
    let expected_bytes = hex::decode(expected)?;
    let provided_bytes = hex::decode(signature_hex)?;
    if expected_bytes.len() != provided_bytes.len() {
        return Err(anyhow!("hmac length mismatch"));
    }
    let mut diff = 0u8;
    for (a, b) in expected_bytes.iter().zip(provided_bytes.iter()) {
        diff |= a ^ b;
    }
    if diff != 0 {
        return Err(anyhow!("invalid hmac signature"));
    }
    Ok(())
}

pub fn bearer_matches(header_value: Option<&str>, token: &str) -> bool {
    match header_value {
        Some(v) => v.trim() == format!("Bearer {}", token) || v.trim() == token,
        None => false,
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn sign_and_verify_roundtrip() {
        let body = br#"{"hello":"world"}"#;
        let ts = now_ms();
        let sig = sign_body("secret", ts, body).unwrap();
        verify_body("secret", ts, body, &sig, 10_000).unwrap();
    }

    #[test]
    fn bearer_variants() {
        assert!(bearer_matches(Some("Bearer abc"), "abc"));
        assert!(bearer_matches(Some("abc"), "abc"));
        assert!(!bearer_matches(Some("Bearer nope"), "abc"));
    }
}

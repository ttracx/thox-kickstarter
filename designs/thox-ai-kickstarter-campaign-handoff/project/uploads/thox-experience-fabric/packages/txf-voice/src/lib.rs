//! TXF voice contract.
//!
//! Wake phrase: `THOXY`. State machine is universal; rendering (audio cue,
//! haptic, on-screen ring) is per-surface.

use schemars::JsonSchema;
use serde::{Deserialize, Serialize};

pub const WAKE_PHRASE: &str = "THOXY";

#[derive(Debug, Clone, Copy, PartialEq, Eq, Serialize, Deserialize, JsonSchema)]
#[serde(rename_all = "camelCase")]
pub enum VoiceState {
    Idle,
    Listening,
    Thinking,
    Responding,
    Executing,
    Completed,
    Error,
}

#[derive(Debug, Clone, Serialize, Deserialize, JsonSchema)]
#[serde(rename_all = "camelCase")]
pub struct VoiceTransition {
    pub from: VoiceState,
    pub to: VoiceState,
    pub reason: String,
}

/// Returns true if the transition is allowed by the universal voice
/// state machine. Surfaces must reject transitions not in this set.
pub fn is_legal_transition(from: VoiceState, to: VoiceState) -> bool {
    use VoiceState::{Completed, Error, Executing, Idle, Listening, Responding, Thinking};
    matches!(
        (from, to),
        (Idle, Listening)
            | (Listening, Thinking)
            | (Listening, Idle)
            | (Thinking, Responding)
            | (Thinking, Executing)
            | (Thinking, Error)
            | (Responding, Executing)
            | (Responding, Completed)
            | (Executing, Completed)
            | (Executing, Error)
            | (Completed, Idle)
            | (Error, Idle)
    )
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn legal_transitions() {
        assert!(is_legal_transition(VoiceState::Idle, VoiceState::Listening));
        assert!(is_legal_transition(VoiceState::Thinking, VoiceState::Responding));
        assert!(is_legal_transition(VoiceState::Executing, VoiceState::Completed));
    }

    #[test]
    fn illegal_transitions() {
        assert!(!is_legal_transition(VoiceState::Idle, VoiceState::Thinking));
        assert!(!is_legal_transition(VoiceState::Completed, VoiceState::Listening));
    }
}

//! TXF release-gate scoring.
//!
//! Aggregates the four validators into the THOX Experience Score (0-100).
//!
//! | Score   | Outcome           |
//! |---------|-------------------|
//! | 90-100  | Ship              |
//! | 80-89   | Review required   |
//! | < 80    | Blocked           |

use serde::{Deserialize, Serialize};

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct Score {
    pub branding: u8,
    pub navigation: u8,
    pub accessibility: u8,
    pub agents: u8,
    pub devices: u8,
    pub memory: u8,
}

impl Score {
    /// Weighted overall: branding 20, navigation 20, a11y 20, agents 15, devices 15, memory 10.
    pub fn experience_score(&self) -> u8 {
        let total: u32 = (u32::from(self.branding) * 20
            + u32::from(self.navigation) * 20
            + u32::from(self.accessibility) * 20
            + u32::from(self.agents) * 15
            + u32::from(self.devices) * 15
            + u32::from(self.memory) * 10)
            / 100;
        total.min(100) as u8
    }

    pub fn gate(&self) -> Gate {
        let s = self.experience_score();
        if s >= 90 {
            Gate::Ship
        } else if s >= 80 {
            Gate::Review
        } else {
            Gate::Blocked
        }
    }
}

#[derive(Debug, Clone, Copy, Serialize, Deserialize, PartialEq, Eq)]
pub enum Gate {
    Ship,
    Review,
    Blocked,
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn perfect_ships() {
        let s = Score { branding: 100, navigation: 100, accessibility: 100, agents: 100, devices: 100, memory: 100 };
        assert_eq!(s.experience_score(), 100);
        assert_eq!(s.gate(), Gate::Ship);
    }

    #[test]
    fn middling_reviews() {
        let s = Score { branding: 85, navigation: 85, accessibility: 85, agents: 85, devices: 85, memory: 85 };
        assert_eq!(s.gate(), Gate::Review);
    }

    #[test]
    fn failing_blocks() {
        let s = Score { branding: 50, navigation: 50, accessibility: 50, agents: 50, devices: 50, memory: 50 };
        assert_eq!(s.gate(), Gate::Blocked);
    }
}

//! THOX Experience Fabric Rust SDK.
//!
//! One import line for everything:
//! ```rust
//! use txf::prelude::*;
//! ```

pub use txf_agent_framework as agents;
pub use txf_components as components;
pub use txf_compliance as compliance;
pub use txf_core as core;
pub use txf_design_tokens as tokens;
pub use txf_device_fabric as devices;
pub use txf_memory as memory;
pub use txf_navigation as navigation;
pub use txf_notifications as notifications;
pub use txf_projects as projects;
pub use txf_voice as voice;

pub mod prelude {
    pub use crate::core::prelude::*;
    pub use crate::navigation::NavigationSection;
    pub use crate::tokens::{thox_tokens, Tokens};
    pub use crate::voice::{VoiceState, WAKE_PHRASE};
}

/// TXF SDK version (mirrors workspace).
pub const SDK_VERSION: &str = env!("CARGO_PKG_VERSION");

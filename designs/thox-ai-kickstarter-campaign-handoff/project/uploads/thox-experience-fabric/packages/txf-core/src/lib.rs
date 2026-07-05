//! THOX Experience Fabric core types.
//!
//! Defines the Universal User Model, the TXF Manifest schema, and the
//! cross-product identity / project / device / agent contracts every TXF
//! application must implement.
//!
//! These types are the source of truth. SDKs and product surfaces consume
//! them via FFI, codegen, or JSON Schema (see [`manifest::txf_manifest_schema`]).

pub mod identity;
pub mod manifest;
pub mod prelude;

pub use identity::{Device, Preferences, Project, ThoxUser, UserProfile};
pub use manifest::{TxfManifest, MANIFEST_VERSION};

/// Current TXF spec version this crate implements.
pub const TXF_VERSION: &str = "2.0";

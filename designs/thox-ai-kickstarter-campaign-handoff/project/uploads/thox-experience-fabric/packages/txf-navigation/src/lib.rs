//! TXF navigation model.
//!
//! Every TXF-certified app exposes exactly the five sections in
//! [`NavigationSection::canonical_order`]. Order is locked. Icons and labels
//! are locked. Surfaces may add deeper routes within a section but must not
//! add or remove sections.

use schemars::JsonSchema;
use serde::{Deserialize, Serialize};

#[derive(Debug, Clone, Copy, PartialEq, Eq, Hash, Serialize, Deserialize, JsonSchema)]
#[serde(rename_all = "snake_case")]
pub enum NavigationSection {
    Home,
    Agents,
    Projects,
    Devices,
    Vault,
}

impl NavigationSection {
    /// The locked canonical order. Surfaces must render in this order.
    pub const fn canonical_order() -> [Self; 5] {
        [
            Self::Home,
            Self::Agents,
            Self::Projects,
            Self::Devices,
            Self::Vault,
        ]
    }

    pub const fn label(self) -> &'static str {
        match self {
            Self::Home => "Home",
            Self::Agents => "Agents",
            Self::Projects => "Projects",
            Self::Devices => "Devices",
            Self::Vault => "Vault",
        }
    }

    pub const fn icon(self) -> &'static str {
        match self {
            Self::Home => "home",
            Self::Agents => "users",
            Self::Projects => "folder",
            Self::Devices => "cpu",
            Self::Vault => "shield",
        }
    }
}

/// Universal command palette entry.
#[derive(Debug, Clone, Serialize, Deserialize, JsonSchema)]
#[serde(rename_all = "camelCase")]
pub struct CommandEntry {
    pub id: String,
    pub label: String,
    pub keywords: Vec<String>,
    pub section: NavigationSection,
    pub shortcut: Option<String>,
    pub icon: Option<String>,
}

/// The canonical universal commands every TXF app must register.
pub fn universal_commands() -> Vec<CommandEntry> {
    vec![
        CommandEntry { id: "create-project".into(), label: "Create Project".into(),
            keywords: vec!["new".into(), "project".into()], section: NavigationSection::Projects,
            shortcut: Some("Mod+Shift+N".into()), icon: Some("plus".into()) },
        CommandEntry { id: "open-vault".into(), label: "Open Vault".into(),
            keywords: vec!["vault".into(), "archive".into()], section: NavigationSection::Vault,
            shortcut: Some("Mod+Shift+V".into()), icon: Some("shield".into()) },
        CommandEntry { id: "find-device".into(), label: "Find Device".into(),
            keywords: vec!["device".into(), "find".into()], section: NavigationSection::Devices,
            shortcut: Some("Mod+Shift+D".into()), icon: Some("cpu".into()) },
        CommandEntry { id: "launch-agent".into(), label: "Launch Agent".into(),
            keywords: vec!["agent".into(), "thoxy".into()], section: NavigationSection::Agents,
            shortcut: Some("Mod+Shift+A".into()), icon: Some("user".into()) },
        CommandEntry { id: "deploy-workflow".into(), label: "Deploy Workflow".into(),
            keywords: vec!["deploy".into(), "ship".into()], section: NavigationSection::Projects,
            shortcut: Some("Mod+Shift+P".into()), icon: Some("rocket".into()) },
        CommandEntry { id: "generate-code".into(), label: "Generate Code".into(),
            keywords: vec!["code".into(), "gen".into()], section: NavigationSection::Agents,
            shortcut: None, icon: Some("code".into()) },
        CommandEntry { id: "print-asset".into(), label: "Print Asset".into(),
            keywords: vec!["print".into(), "3d".into()], section: NavigationSection::Projects,
            shortcut: None, icon: Some("printer".into()) },
        CommandEntry { id: "search-memory".into(), label: "Search Memory".into(),
            keywords: vec!["memory".into(), "recall".into()], section: NavigationSection::Vault,
            shortcut: Some("Mod+Shift+F".into()), icon: Some("search".into()) },
    ]
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn canonical_order_is_locked() {
        let order = NavigationSection::canonical_order();
        assert_eq!(order[0], NavigationSection::Home);
        assert_eq!(order[4], NavigationSection::Vault);
    }

    #[test]
    fn universal_commands_have_unique_ids() {
        let cmds = universal_commands();
        let mut ids: Vec<&str> = cmds.iter().map(|c| c.id.as_str()).collect();
        ids.sort_unstable();
        ids.dedup();
        assert_eq!(ids.len(), 8);
    }
}

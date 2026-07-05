/// THOX Experience Fabric Flutter SDK.
library txf;

const String txfVersion = '2.0';
const String sdkVersion = '0.1.0';

enum NavigationSection { home, agents, projects, devices, vault }

extension NavigationSectionLabel on NavigationSection {
  String get label {
    switch (this) {
      case NavigationSection.home: return 'Home';
      case NavigationSection.agents: return 'Agents';
      case NavigationSection.projects: return 'Projects';
      case NavigationSection.devices: return 'Devices';
      case NavigationSection.vault: return 'Vault';
    }
  }
}

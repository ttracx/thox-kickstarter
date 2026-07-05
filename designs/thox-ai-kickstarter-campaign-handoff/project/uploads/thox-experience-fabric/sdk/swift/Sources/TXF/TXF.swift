// THOX Experience Fabric - SwiftUI SDK.
// Phase 0: surface declaration. Phase 1: implement navigation + tokens + components.

import SwiftUI

public enum TXF {
    public static let version = "2.0"
    public static let sdkVersion = "0.1.0"
}

public enum NavigationSection: String, CaseIterable, Identifiable {
    case home, agents, projects, devices, vault
    public var id: String { rawValue }
    public var label: String {
        switch self {
        case .home: return "Home"
        case .agents: return "Agents"
        case .projects: return "Projects"
        case .devices: return "Devices"
        case .vault: return "Vault"
        }
    }
    public var systemImage: String {
        switch self {
        case .home: return "house"
        case .agents: return "person.2"
        case .projects: return "folder"
        case .devices: return "cpu"
        case .vault: return "lock.shield"
        }
    }
}

public struct ThoxNavigation: View {
    @Binding public var selection: NavigationSection
    public init(selection: Binding<NavigationSection>) { self._selection = selection }
    public var body: some View {
        TabView(selection: $selection) {
            ForEach(NavigationSection.allCases) { section in
                Text(section.label)
                    .tabItem { Label(section.label, systemImage: section.systemImage) }
                    .tag(section)
            }
        }
    }
}

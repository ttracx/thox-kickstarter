// THOX Experience Fabric - Kotlin SDK.
package ai.thox.txf

object TXF {
    const val VERSION = "2.0"
    const val SDK_VERSION = "0.1.0"
}

enum class NavigationSection(val label: String, val icon: String) {
    Home("Home", "home"),
    Agents("Agents", "users"),
    Projects("Projects", "folder"),
    Devices("Devices", "cpu"),
    Vault("Vault", "shield");

    companion object {
        val canonicalOrder = values().toList()
    }
}

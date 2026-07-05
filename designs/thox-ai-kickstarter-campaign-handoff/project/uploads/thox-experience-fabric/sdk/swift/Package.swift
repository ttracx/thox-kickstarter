// swift-tools-version:5.9
import PackageDescription

let package = Package(
    name: "TXF",
    platforms: [.iOS(.v17), .macOS(.v14), .watchOS(.v10), .visionOS(.v1)],
    products: [.library(name: "TXF", targets: ["TXF"])],
    targets: [
        .target(name: "TXF", path: "Sources/TXF"),
    ]
)

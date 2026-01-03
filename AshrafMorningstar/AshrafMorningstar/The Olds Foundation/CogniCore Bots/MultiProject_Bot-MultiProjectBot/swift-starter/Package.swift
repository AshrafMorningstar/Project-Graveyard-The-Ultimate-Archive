/*
 Copyright (c) 2026 Ashraf Morningstar
 These are personal recreations of existing projects, developed by Ashraf Morningstar
 for learning and skill development.
 Original project concepts remain the intellectual property of their respective creators.
 Repository: https://github.com/AshrafMorningstar
*/

// swift-tools-version:5.6
import PackageDescription

let package = Package(
    name: "SwiftStarter",
    products: [.executable(name: "SwiftStarter", targets: ["App"])],
    targets: [
        .executableTarget(name: "App", path: "Sources")
    ]
)

// swift-tools-version: 5.9

import PackageDescription
import AppleProductTypes

let package = Package(
    name: "KudiFlow",
    platforms: [
        .iOS("18.0")
    ],
    products: [
        .iOSApplication(
            name: "KudiFlow",
            targets: ["AppModule"],
            bundleIdentifier: "com.demo.kudiflow",
            teamIdentifier: "",
            displayVersion: "1.0",
            bundleVersion: "1",
            appIcon: .placeholder(icon: .banknote),
            accentColor: .presetColor(.blue),
            supportedDeviceFamilies: [
                .pad,
                .phone
            ],
            supportedInterfaceOrientations: [
                .portrait,
                .landscapeRight,
                .landscapeLeft,
                .portraitUpsideDown(.when(deviceFamilies: [.pad]))
            ],
            capabilities: [
                .photoLibrary(purposeString: "KudiFlow needs access to your photos so you can select receipts and bank alerts.")
            ]
        )
    ],
    dependencies: [
        .package(url: "https://github.com/firebase/firebase-ios-sdk.git", .upToNextMajor(from: "11.0.0"))
    ],
    targets: [
        .executableTarget(
            name: "AppModule",
            dependencies: [
                .product(name: "FirebaseCore", package: "firebase-ios-sdk"),
                .product(name: "FirebaseFirestore", package: "firebase-ios-sdk"),
                .product(name: "FirebaseFirestoreSwift", package: "firebase-ios-sdk"),
                .product(name: "FirebaseVertexAI", package: "firebase-ios-sdk")
            ],
            path: "."
        )
    ]
)

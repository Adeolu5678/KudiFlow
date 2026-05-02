import SwiftUI

@main
struct KudiFlowApp: App {
    @UIApplicationDelegateAdaptor(AppDelegate.self) var delegate

    var body: some Scene {
        WindowGroup {
            RootTabView()
        }
    }
}

import SwiftUI

struct RootTabView: View {
    @State private var selectedTab = 0
    @StateObject private var repository = LedgerRepository()
    
    var body: some View {
        TabView(selection: $selectedTab) {
            HomeDashboardView(selectedTab: $selectedTab)
                .tabItem {
                    Label("Home", systemImage: "house.fill")
                }
                .tag(0)
            
            UniversalLogView()
                .tabItem {
                    Label("Log", systemImage: "plus.circle.fill")
                }
                .tag(1)
            
            AssistantView()
                .tabItem {
                    Label("Ask Kudi", systemImage: "sparkles")
                }
                .tag(2)
                
            LedgerListView()
                .tabItem {
                    Label("Ledger", systemImage: "list.bullet.rectangle.portrait")
                }
                .tag(3)
                
            CreditSummaryView()
                .tabItem {
                    Label("Credit", systemImage: "doc.text.magnifyingglass")
                }
                .tag(4)
        }
        .environmentObject(repository)
        .onAppear {
            repository.listen(userId: AppConfig.demoUserId)
        }
    }
}

#Preview {
    RootTabView()
}

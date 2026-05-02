import Foundation

class DashboardViewModel: ObservableObject {
    @Published var summary = DashboardSummary()
    
    func update(with entries: [LedgerEntry]) {
        self.summary = DashboardCalculator.calculate(entries: entries)
    }
}

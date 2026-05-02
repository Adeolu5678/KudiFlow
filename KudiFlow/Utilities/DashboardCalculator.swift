import Foundation

struct DashboardCalculator {
    static func calculate(entries: [LedgerEntry]) -> DashboardSummary {
        var summary = DashboardSummary()
        
        for entry in entries {
            switch entry.type {
            case .income:
                summary.totalSales += entry.amount
                if entry.paymentStatus == .paid {
                    summary.cashCollected += entry.amount
                } else if entry.paymentStatus == .unpaid {
                    summary.totalReceivables += entry.amount
                    summary.outstandingCount += 1
                }
            case .expense:
                summary.totalExpenses += entry.amount
            case .receivable:
                summary.totalReceivables += entry.amount
                summary.outstandingCount += 1
            default:
                break
            }
        }
        
        summary.estimatedProfit = summary.totalSales - summary.totalExpenses
        return summary
    }
}

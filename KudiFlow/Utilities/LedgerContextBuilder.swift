import Foundation

struct LedgerContextBuilder {
    static func buildContext(from entries: [LedgerEntry]) -> String {
        let summary = DashboardCalculator.calculate(entries: entries)
        
        var unpaidCustomers: [[String: Any]] = []
        for entry in entries where entry.paymentStatus == .unpaid && entry.type == .receivable {
            if let counterparty = entry.counterparty {
                unpaidCustomers.append([
                    "name": counterparty,
                    "amount": entry.amount,
                    "item": entry.title
                ])
            }
        }
        
        let contextDict: [String: Any] = [
            "date": Date().formatted(date: .abbreviated, time: .omitted),
            "currency": "NGN",
            "totals": [
                "sales": summary.totalSales,
                "expenses": summary.totalExpenses,
                "cashCollected": summary.cashCollected,
                "receivables": summary.totalReceivables,
                "estimatedProfit": summary.estimatedProfit
            ],
            "unpaidCustomers": unpaidCustomers
        ]
        
        if let jsonData = try? JSONSerialization.data(withJSONObject: contextDict, options: .prettyPrinted),
           let jsonString = String(data: jsonData, encoding: .utf8) {
            return jsonString
        }
        
        return "{}"
    }
}

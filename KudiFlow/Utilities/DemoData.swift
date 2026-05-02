import Foundation

struct DemoData {
    static let sampleEntries: [LedgerEntry] = [
        LedgerEntry(
            id: UUID().uuidString,
            type: .income,
            title: "Sold rice to Tunde",
            amount: 15000.0,
            currency: "NGN",
            date: Date().addingTimeInterval(-86400),
            paymentStatus: .paid,
            counterparty: "Tunde",
            items: [LedgerItem(name: "rice")],
            sourceType: .text,
            originalNote: "Sold rice to Tunde for 15000, paid transfer.",
            confidence: 0.95,
            createdAt: Date().addingTimeInterval(-86400),
            updatedAt: Date().addingTimeInterval(-86400)
        ),
        LedgerEntry(
            id: UUID().uuidString,
            type: .receivable,
            title: "Garri sold to Mama Bose",
            amount: 8000.0,
            currency: "NGN",
            date: Date(),
            paymentStatus: .unpaid,
            counterparty: "Mama Bose",
            items: [LedgerItem(name: "garri")],
            sourceType: .text,
            originalNote: "Mama Bose collect garri 8k she go pay tomorrow",
            confidence: 0.88,
            createdAt: Date(),
            updatedAt: Date()
        ),
        LedgerEntry(
            id: UUID().uuidString,
            type: .expense,
            title: "Bought tomatoes",
            amount: 30000.0,
            currency: "NGN",
            date: Date().addingTimeInterval(-172800),
            paymentStatus: .paid,
            counterparty: nil,
            items: [LedgerItem(name: "tomatoes")],
            sourceType: .text,
            originalNote: "Bought tomatoes 30000 cash.",
            confidence: 0.90,
            createdAt: Date().addingTimeInterval(-172800),
            updatedAt: Date().addingTimeInterval(-172800)
        )
    ]
}

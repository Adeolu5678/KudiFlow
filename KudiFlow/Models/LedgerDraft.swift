import Foundation

struct LedgerDraft: Codable {
    var type: LedgerEntryType
    var title: String
    var amount: Double?
    var currency: String
    var dateText: String?
    var paymentStatus: PaymentStatus
    var counterparty: String?
    var items: [LedgerItemDraft]
    var sourceType: SourceType
    var originalNote: String?
    var confidence: Double
    var needsReview: Bool
    var warnings: [String]
}

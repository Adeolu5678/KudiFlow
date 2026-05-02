import Foundation
import FirebaseFirestore

struct LedgerEntry: Identifiable, Codable {
    @DocumentID var id: String?
    var type: LedgerEntryType
    var title: String
    var amount: Double
    var currency: String
    var date: Date
    var paymentStatus: PaymentStatus
    var counterparty: String?
    var items: [LedgerItem]
    var sourceType: SourceType
    var originalNote: String?
    var confidence: Double
    var createdAt: Date
    var updatedAt: Date
}

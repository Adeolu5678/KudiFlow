import Foundation

struct LedgerItem: Codable, Identifiable, Hashable {
    var id: String = UUID().uuidString
    var name: String
    var quantity: String?
    var unitPrice: Double?
}

struct LedgerItemDraft: Codable, Hashable {
    var name: String
    var quantity: String?
    var unitPrice: Double?
}

import Foundation

enum LedgerEntryType: String, Codable, CaseIterable {
    case income
    case expense
    case receivable
    case payable
    case inventory
    case unknown
}

enum PaymentStatus: String, Codable, CaseIterable {
    case paid
    case unpaid
    case partial
    case unknown
}

enum SourceType: String, Codable, CaseIterable {
    case text
    case imageReceipt
    case bankAlertScreenshot
    case manual
    case assistant
}

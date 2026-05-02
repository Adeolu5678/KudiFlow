# Data Model and Firestore Schema

## Swift model: LedgerEntry

```swift
struct LedgerEntry: Identifiable, Codable {
    var id: String
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
```

## Enums

```swift
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
```

## Swift model: LedgerItem

```swift
struct LedgerItem: Codable, Identifiable {
    var id: String
    var name: String
    var quantity: String?
    var unitPrice: Double?
}
```

## Swift model: LedgerDraft

Use this before saving.

```swift
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
```

## Firestore path

```text
users/{userId}/ledgerEntries/{entryId}
```

## Firestore document example

```json
{
  "type": "receivable",
  "title": "Garri sold to Mama Bose",
  "amount": 8000,
  "currency": "NGN",
  "date": "2026-05-02T10:30:00Z",
  "paymentStatus": "unpaid",
  "counterparty": "Mama Bose",
  "items": [
    {
      "id": "item-1",
      "name": "Garri",
      "quantity": null,
      "unitPrice": null
    }
  ],
  "sourceType": "text",
  "originalNote": "Mama Bose collect garri 8k she go pay tomorrow",
  "confidence": 0.86,
  "createdAt": "2026-05-02T10:30:05Z",
  "updatedAt": "2026-05-02T10:30:05Z"
}
```

## Dashboard calculations

Income:
- Sum entries where `type == income`.

Expenses:
- Sum entries where `type == expense`.

Receivables:
- Sum entries where `type == receivable` OR `paymentStatus == unpaid` and type is income-like.

Estimated profit:
- income - expense.
- Receivables are shown separately.
- Do not count unpaid receivables as cash received unless clearly marked as sale value.

Cash collected:
- Sum paid income.

Outstanding:
- Sum unpaid receivables.

## Required indexes

For MVP:
- No composite index required if querying all demo user entries and sorting client-side.

Production:
- Query by `date`.
- Query by `type`.
- Query by `paymentStatus`.

## Data validation

Before save:
- amount must be greater than 0.
- currency must be `NGN`.
- type cannot be missing.
- if confidence below 0.5, force `needsReview = true`.
- if date missing, default to today but add warning.

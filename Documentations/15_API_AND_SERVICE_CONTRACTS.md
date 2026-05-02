# API and Service Contracts

## AIExtractionService

```swift
protocol AIExtractionServicing {
    func extractFromText(_ text: String, sourceType: SourceType) async throws -> LedgerDraft
    func extractFromImage(_ imageData: Data, sourceType: SourceType) async throws -> LedgerDraft
}
```

Errors:
- `emptyInput`
- `invalidJSON`
- `modelUnavailable`
- `lowConfidence`
- `network`

## AssistantService

```swift
protocol AssistantServicing {
    func sendMessage(_ message: String, ledgerContext: String) async throws -> String
    func generateCreditSummary(from context: String) async throws -> String
}
```

Errors:
- `emptyMessage`
- `noLedgerContext`
- `modelUnavailable`
- `network`

## LedgerRepository

```swift
protocol LedgerRepositoring {
    func save(_ entry: LedgerEntry, userId: String) async throws
    func fetchRecent(userId: String, limit: Int) async throws -> [LedgerEntry]
    func listen(userId: String, onChange: @escaping ([LedgerEntry]) -> Void)
}
```

## DashboardCalculator

```swift
struct DashboardCalculator {
    static func calculate(entries: [LedgerEntry]) -> DashboardSummary
}
```

Must not call network.

## LedgerContextBuilder

```swift
struct LedgerContextBuilder {
    static func build(entries: [LedgerEntry], date: Date) -> String
}
```

Output:
- compact JSON string.

## LedgerValidator

```swift
struct LedgerValidator {
    static func validateDraft(_ draft: LedgerDraft) -> [ValidationIssue]
    static func makeEntry(from draft: LedgerDraft) throws -> LedgerEntry
}
```

Validation:
- amount exists and > 0,
- currency == NGN,
- type known or user explicitly confirms unknown,
- date defaults to today if missing.

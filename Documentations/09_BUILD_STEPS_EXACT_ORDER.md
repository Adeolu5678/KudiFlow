# Exact Build Steps

Use this order. Do not skip ahead.

## Phase 0: Setup

### 0.1 Create Xcode project

- App name: KudiFlow
- Interface: SwiftUI
- Language: Swift
- Minimum iOS target: iOS 18.0 or latest available stable target.
- Bundle ID example: `com.yourteam.kudiflow`

Test:
- Build and run empty app on simulator.

Stop gate:
- Do not continue until simulator opens app.

### 0.2 Create Firebase project

- Create Firebase project.
- Register iOS app with exact Bundle ID.
- Download `GoogleService-Info.plist`.
- Add plist to Xcode project root and app target.

Test:
- Confirm plist is included in target membership.

### 0.3 Add Firebase packages

Use Swift Package Manager:
- File > Add Package Dependencies
- URL: `https://github.com/firebase/firebase-ios-sdk`
- Select latest compatible SDK.
- Add:
  - FirebaseCore
  - FirebaseFirestore
  - FirebaseAILogic
  - FirebaseStorage optional
  - FirebaseAuth optional
  - FirebaseAppCheck optional

Test:
- Build succeeds.

### 0.4 Initialize Firebase

Create `FirebaseBootstrap.swift`.

Acceptance:
- `FirebaseApp.configure()` runs on app launch.
- No crash.

## Phase 1: Static UI

### 1.1 Create root navigation

Build `RootTabView` with:
- Home
- Log
- Assistant
- Ledger
- Credit

Test:
- All tabs open.

### 1.2 Build static screens

Create placeholder UI for each screen.

Test:
- App compiles.
- Screens have expected CTAs.

Stop gate:
- Demo can navigate before backend exists.

## Phase 2: Models and local data

### 2.1 Create Swift models

Add:
- `LedgerEntry`
- `LedgerDraft`
- `LedgerItem`
- enums.

Test:
- Create sample entries in code.
- Preview dashboard with sample entries.

### 2.2 Create DashboardCalculator

Functions:
- `calculate(entries: [LedgerEntry]) -> DashboardSummary`

Test cases:
- income 10000, expense 3000 -> profit 7000.
- receivable 8000 -> outstanding 8000.
- empty entries -> zeros.

Stop gate:
- Dashboard works with local seeded data.

## Phase 3: Firestore

### 3.1 Create LedgerRepository

Required methods:
- `save(entry: LedgerEntry) async throws`
- `listen(userId: String, onChange: @escaping ([LedgerEntry]) -> Void)`
- `fetchRecent(userId: String, limit: Int) async throws -> [LedgerEntry]`

### 3.2 Save seeded entry

Create a debug button or run first save from a view.

Test:
- Entry appears in Firebase console.
- Entry appears in Ledger tab.

### 3.3 Realtime listener

Ledger and dashboard should update after save.

Test:
- Save entry -> dashboard number changes.

Stop gate:
- Firestore write/read works before AI integration.

## Phase 4: Manual ledger entry

### 4.1 Build ReviewEntryView

Make all fields editable.

### 4.2 Save manual entry

From Universal Log text field, allow "Manual Save" if AI disabled.

Test:
- Manually enter sale.
- Save.
- Ledger updates.

Stop gate:
- App remains useful even if AI fails.

## Phase 5: Gemini extraction

### 5.1 Create AIExtractionService

Required methods:
- `extractFromText(_ text: String) async throws -> LedgerDraft`
- `extractFromImage(_ imageData: Data, sourceType: SourceType) async throws -> LedgerDraft`

### 5.2 Use structured output

Configure model to return the extraction schema.

If SDK structured-output syntax takes too long, fallback:
- ask model for JSON only,
- parse with `JSONDecoder`,
- reject non-JSON output.

### 5.3 Text extraction first

Test prompts:
- "Sold rice to Tunde for 15000, paid transfer."
- "Mama Bose collect garri 8k she go pay tomorrow."
- "Bought tomatoes 30000 cash."

Acceptance:
- Draft fields are correct enough.
- Review screen opens.
- User can save.

### 5.4 Image extraction

Use PhotosPicker.
Send selected image data to Gemini with extraction prompt.

Test:
- Use screenshot/photo fixture.
- Review screen opens.

Stop gate:
- One text extraction and one image extraction works live.

## Phase 6: Assistant

### 6.1 Create LedgerContextBuilder

Input:
- `[LedgerEntry]`

Output:
- compact JSON string with totals, unpaid customers, recent transactions.

### 6.2 Create AssistantService

Input:
- user message
- ledger context

Output:
- concise answer.

### 6.3 Build AssistantView

Add quick prompt chips.

Test:
- "Who owes me?"
- "How is my business today?"
- "Generate credit summary."
- "Write reminder for Mama Bose."

Stop gate:
- Assistant answers from data saved during demo.

## Phase 7: Credit Summary

### 7.1 App-calculated summary

Calculate:
- sales,
- expenses,
- cash collected,
- receivables,
- estimated profit,
- number of transactions.

### 7.2 Gemini-formatted summary

Send app-calculated numbers to Gemini for clean wording.

Test:
- Report includes exact numbers supplied by app.
- No invented loan approval.

Stop gate:
- Credit summary demo works even if assistant screen is skipped.

## Phase 8: Polish

Add:
- loading states,
- error banners,
- confidence warnings,
- sample seeded data reset button,
- Naira formatting,
- demo script rehearsed.

## Phase 9: Backup demo mode

Add a toggle:
- `AppConfig.useMockAI = false`

If true:
- extraction returns hardcoded `LedgerDraft`.
- assistant returns deterministic canned answers from current ledger.

Reason:
- If Wi-Fi/API fails during judging, demo still works.

This is mandatory for competition reliability.

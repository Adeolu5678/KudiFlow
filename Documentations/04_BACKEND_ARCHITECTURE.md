# Backend Architecture

## Architecture decision

Use Backend-as-a-Service for MVP.

Chosen backend:
- Firebase Firestore
- Firebase Storage only if image persistence is required
- Firebase AI Logic
- Optional Firebase Auth anonymous sign-in

Rejected for MVP:
- Node.js
- Express
- PostgreSQL
- Custom REST API

Reason:
- Single-day competition.
- iOS-first app.
- Less infrastructure.
- Faster integration.
- Fewer places for AI coding agent drift.

## Logical architecture

```text
SwiftUI App
  |
  |-- Universal Log View
  |     |-- PhotosPicker / TextEditor
  |     |-- AIExtractionService
  |
  |-- Review Entry View
  |     |-- LedgerRepository.save()
  |
  |-- Ledger View
  |     |-- LedgerRepository.listen()
  |
  |-- Dashboard View
  |     |-- DashboardCalculator
  |
  |-- Assistant View
  |     |-- LedgerContextBuilder
  |     |-- AssistantService
  |
  |-- Credit Summary View
        |-- CreditSummaryCalculator
        |-- AssistantService.formatSummary()
```

## Firebase services

### Firestore

Collections:
- `users/{userId}/ledgerEntries/{entryId}`
- `users/{userId}/assistantMessages/{messageId}` optional
- `users/{userId}/creditSummaries/{summaryId}` optional

### Firebase Storage

Optional path:
- `users/{userId}/uploads/{uploadId}.jpg`

For one-day MVP:
- If image does not need persistence, do not upload it to Storage.
- Send image directly to Gemini where SDK allows.
- Save only extracted ledger data.

### Firebase AI Logic

Used for:
- extraction,
- assistant response,
- credit summary wording,
- optional visual freshness check.

## Identity strategy

P0:
- hardcode `demoUserId = "demo-user"` in `AppConfig`.
- This is acceptable for hackathon demo.

P1:
- add anonymous Firebase Auth.
- use `Auth.auth().currentUser.uid`.

## Data flow

### Universal Log

1. View captures input.
2. AIExtractionService calls Gemini.
3. Decoder parses `LedgerDraft`.
4. Validator checks amount/type/date.
5. Review screen edits draft.
6. Repository saves final `LedgerEntry`.

### Dashboard

1. Repository listens to Firestore.
2. App maps docs to `[LedgerEntry]`.
3. DashboardCalculator computes totals locally.
4. UI renders metric cards.

### Assistant

1. Repository loads recent ledger entries.
2. LedgerContextBuilder builds compact JSON summary.
3. AssistantService sends prompt + summary + user question.
4. Gemini returns answer.
5. UI displays message.

## Offline behavior

- Firestore can cache locally, but do not build custom offline mode for MVP.
- If AI is unavailable, allow manual ledger entry.

## Failure fallback

Every AI feature must have a manual fallback:
- extraction fails -> manual entry form,
- assistant fails -> show dashboard numbers,
- credit summary fails -> show app-generated raw summary.

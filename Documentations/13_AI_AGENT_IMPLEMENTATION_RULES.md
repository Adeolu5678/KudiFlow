# AI Agent Implementation Rules

Read this before writing code.

## Product constraint

Build only the one-day MVP. Do not expand the scope.

## Architecture constraints

You must:
- use SwiftUI,
- use Firebase Firestore,
- use Firebase AI Logic for Gemini,
- use one central model config,
- use a review screen before saving.

You must not:
- add Node.js,
- add PostgreSQL,
- add custom REST backend,
- add LangChain,
- add complex auth before MVP works,
- make AI save transactions without user confirmation,
- build real bank integration,
- build real-time voice agent,
- rewrite the product into a generic chatbot.

## AI behavior constraints

Extraction:
- JSON only.
- No Markdown.
- No invented values.
- Include confidence and warnings.
- All saved entries must be user-reviewed.

Assistant:
- Answer only from ledger context.
- Be concise.
- Use Nigerian Naira.
- Refuse unrelated questions.
- Do not promise loan approval.
- Do not provide legal/tax advice.

## Coding rules

- Build in small compiling steps.
- After every major file group, run build.
- If Firebase AI syntax fails, isolate it in service file and mock it temporarily.
- Keep UI usable with mock data.
- Use `AppConfig.useMockAI` for fallback.
- Do not block the full app on perfect AI extraction.

## Naming rules

Use these names exactly:
- `LedgerEntry`
- `LedgerDraft`
- `LedgerRepository`
- `AIExtractionService`
- `AssistantService`
- `DashboardCalculator`
- `LedgerContextBuilder`
- `UniversalLogView`
- `ReviewEntryView`
- `AssistantView`
- `CreditSummaryView`

## Build priority

1. Navigation.
2. Models.
3. Dashboard with seed data.
4. Firestore save/read.
5. Manual entry.
6. Gemini text extraction.
7. Gemini image extraction.
8. Assistant.
9. Credit summary.
10. Polish.

## Stop rule

If a feature takes more than 45 minutes and blocks the main demo, mock it and move on.

## Final demo must not depend on

- perfect internet,
- perfect OCR,
- production auth,
- external bank APIs,
- real customer data.

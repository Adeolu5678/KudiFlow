# SSD: System Specification Document

## System overview

KudiFlow is a native iOS app that uses Firebase as its backend and Gemini through Firebase AI Logic for AI extraction and business assistance.

## Actors

1. Business owner
   - Logs transactions.
   - Reviews AI extraction.
   - Asks assistant questions.
   - Reads dashboard and credit summary.

2. Kudi Assistant
   - Reads compact ledger context.
   - Answers business questions.
   - Drafts reminder messages.
   - Generates credit summary.

3. Firebase services
   - Stores ledger data.
   - Stores images if needed.
   - Provides AI access through Firebase AI Logic.

## System boundaries

Inside MVP:
- iOS app.
- Firebase Firestore.
- Firebase AI Logic.
- Optional Firebase Storage.

Outside MVP:
- Banking APIs.
- Loan providers.
- External accounting systems.
- WhatsApp Business API.
- Server-side Node.js backend.

## Main flows

### Flow A: Text Universal Log

1. User opens Universal Log.
2. User enters text: "Sold rice to Tunde for 15000, paid transfer."
3. App sends text to Gemini extraction prompt.
4. Gemini returns `LedgerDraft`.
5. App validates draft locally.
6. App shows Review screen.
7. User taps Save.
8. App writes `LedgerEntry` to Firestore.
9. Dashboard and ledger update.

### Flow B: Image Universal Log

1. User opens Universal Log.
2. User picks image from Photos.
3. App sends image + extraction prompt to Gemini.
4. Gemini returns `LedgerDraft`.
5. App shows Review screen.
6. User saves.
7. Entry stored in Firestore.

### Flow C: Assistant Q&A

1. User opens Assistant.
2. App builds compact ledger context from Firestore.
3. User asks supported question.
4. App sends system instruction + ledger context + user message to Gemini.
5. Gemini returns concise business answer.
6. App displays response.

### Flow D: Credit Summary

1. User opens Credit Summary or asks assistant.
2. App calculates sales, expenses, receivables, profit estimate.
3. Gemini formats plain-language summary.
4. User can copy or present report.

## Functional requirements

FR1. App shall accept text input for Universal Log.
FR2. App shall accept image input for Universal Log.
FR3. App shall call Gemini through Firebase AI Logic.
FR4. App shall receive structured output for ledger extraction.
FR5. App shall validate AI output before display.
FR6. App shall require user confirmation before saving any ledger entry.
FR7. App shall save confirmed entries to Firestore.
FR8. App shall display saved ledger entries.
FR9. App shall calculate dashboard metrics from saved entries.
FR10. App shall support Kudi Assistant questions using ledger context.
FR11. App shall generate credit summary from ledger entries.

## Non-functional requirements

NFR1. Demo flow must work offline only for already-seeded data; AI requires internet.
NFR2. App must not crash when AI output is invalid.
NFR3. App must show loading/error states.
NFR4. App must use plain language suitable for micro-SME users.
NFR5. App must avoid accounting jargon.
NFR6. App must not expose secrets in code.
NFR7. App must be buildable from a fresh clone in Xcode with Firebase config added.

## Error handling

AI extraction failure:
- Show: "I could not read this clearly. Please edit manually."
- Present empty editable draft.

Firestore save failure:
- Show retry button.
- Keep draft in memory.

No ledger entries:
- Dashboard shows empty state.
- Assistant says it needs records first and offers "Add a sale".

Unsupported assistant question:
- Assistant redirects to business-record tasks.

## Performance targets

- Text extraction: under 8 seconds.
- Image extraction: under 15 seconds.
- Dashboard refresh: under 2 seconds after save.
- Assistant response: under 10 seconds for normal questions.

## Security baseline

- Do not store Gemini API key manually in app source.
- Use Firebase AI Logic setup.
- For production, enable App Check.
- For demo, use Firebase App Check debug provider or disable enforcement until final demo only.

# Roadmap and Scope Control

## One-day MVP scope

Must ship:
- SwiftUI app.
- Firebase setup.
- Firestore ledger.
- Text extraction.
- Image extraction.
- Review/save flow.
- Dashboard.
- Assistant from ledger context.
- Credit summary.
- Mock AI fallback.

## Time-boxed build schedule

Assuming 8 focused hours.

### Hour 0-1: Setup

- Xcode project.
- Firebase project.
- Packages installed.
- Root UI.

### Hour 1-2: Models and dashboard

- Data models.
- Seeded entries.
- Dashboard calculator.
- Static ledger.

### Hour 2-3: Firestore

- Save entry.
- Listen to entries.
- Dashboard live update.

### Hour 3-4: Manual entry and review

- Universal Log text UI.
- Review screen.
- Save final entry.

### Hour 4-5: Gemini text extraction

- AIExtractionService.
- Prompt.
- JSON parsing.
- Review screen.

### Hour 5-6: Image extraction

- PhotosPicker.
- Image prompt.
- Review screen.

### Hour 6-7: Assistant and credit summary

- LedgerContextBuilder.
- AssistantService.
- Quick prompts.
- Credit summary.

### Hour 7-8: Polish and demo

- Mock fallback.
- Error states.
- Rehearse.
- Prepare pitch.

## Strict cutline

If behind schedule at Hour 5:
- Cut image extraction.
- Demo text extraction + bank alert typed as text.

If behind schedule at Hour 6:
- Cut assistant free-text input.
- Use quick prompts only.

If behind schedule at Hour 7:
- Cut credit summary screen.
- Generate credit summary inside assistant.

Never cut:
- Review before save.
- Dashboard.
- Saved ledger.

## Post-hackathon roadmap

### Week 1

- Anonymous Auth.
- App Check.
- Camera capture.
- PDF export.
- Better empty states.

### Month 1

- Real audio note capture.
- WhatsApp-style reminder sharing.
- Inventory fields.
- Multi-business profiles.
- Lender-friendly reports.

### Month 2+

- Bank statement import.
- Loan partner integration.
- Cashflow trend analysis.
- Produce-specific freshness module.
- Offline-first improvements.

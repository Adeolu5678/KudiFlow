# PRD: KudiFlow

## Product name

KudiFlow.

## One-line pitch

KudiFlow turns receipts, bank alerts, and voice-style notes into bank-ready business records for Nigerian SMEs.

## Target user

Primary persona:
- Name: "Mama Bose" persona.
- Location: Ibadan, Nigeria.
- Business: market trader / provisions seller / produce seller.
- Tech behavior: uses WhatsApp, transfer alerts, paper receipts, voice notes.
- Pain: cannot maintain clean business records, does not know daily profit, struggles to prove cashflow for credit.

## Problem

Small business activity is recorded informally:
- handwritten receipts,
- bank alert screenshots,
- memory,
- voice notes,
- WhatsApp messages,
- notebook entries.

This creates poor visibility into sales, expenses, receivables, and credit-readiness.

## MVP value proposition

KudiFlow converts messy input into clean ledger records and explains the business in simple language.

## Core user promise

"Record your business the way you already work. KudiFlow will organize it."

## MVP features

### P0 features: must build

1. Universal Log
   - Accept image input.
   - Accept text input.
   - Accept bank alert screenshot as image input.
   - Convert input into structured ledger data using Gemini.
   - Show review screen before saving.

2. Ledger
   - List saved entries.
   - Show type, title, amount, date, payment status, counterparty.

3. Dashboard
   - Total sales.
   - Total expenses.
   - Estimated profit.
   - Total receivables.
   - Top customers/items if data exists.

4. Kudi Assistant
   - Chat interface.
   - Quick prompts.
   - Answers from current ledger summary.
   - Can generate customer reminder text.
   - Can generate credit summary.

5. Credit Summary
   - Plain-language report based on ledger entries.
   - Export/copy as text.
   - PDF export is P1, not P0.

### P1 features: build only if P0 is complete

- Firebase Auth anonymous sign-in.
- Image capture with camera.
- Audio recording.
- PDF export.
- App Check.
- Spoil-Sense visual freshness check.
- Firebase AI Logic function calling.

### P2 features: after hackathon

- Real bank statement import.
- WhatsApp import.
- Lender dashboard.
- Multi-business support.
- Inventory forecasting.
- Paid SaaS subscriptions.

## Non-goals for one-day MVP

- No loan disbursement.
- No regulated credit scoring.
- No accounting-grade tax calculations.
- No fully automated inventory valuation.
- No claim of certified financial audit.

## User stories

1. As a trader, I want to upload a receipt so that I do not have to type every transaction.
2. As a trader, I want to speak or type a casual sales note so that I can log quickly.
3. As a trader, I want to see who owes me so that I can follow up.
4. As a trader, I want to know today's profit so that I can make better restocking decisions.
5. As a trader, I want to generate a simple credit summary so that I can show business activity to a lender.

## Acceptance criteria

- User can create one ledger entry from text.
- User can create one ledger entry from image.
- User can save the entry to Firestore.
- Ledger list refreshes after saving.
- Dashboard totals update from Firestore data.
- Assistant answers at least 5 supported questions from ledger context.
- Credit summary can be generated from saved entries.

# KudiFlow Build Packet

As-of date: 2026-05-02.

This packet is designed to keep an AI coding agent from drifting. It defines the product, scope, architecture, schemas, build order, prompts, tests, and demo path.

## Core decision

Build a one-day iOS MVP:

> Messy business input -> Gemini extraction -> review screen -> Firestore ledger -> dashboard -> Kudi assistant -> credit summary.

## Do not build

- No custom Node.js backend for MVP.
- No PostgreSQL for MVP.
- No real banking integration.
- No automatic transaction saving without user confirmation.
- No full inventory engine.
- No real-time voice agent.
- No broad "ask AI anything" chatbot.
- No unsupported/beta-only Apple APIs.

## Build target

Native iOS app in SwiftUI using Firebase as the backend and Gemini through Firebase AI Logic.

## File reading order

1. `13_AI_AGENT_IMPLEMENTATION_RULES.md`
2. `01_PRODUCT_REQUIREMENTS_DOCUMENT_PRD.md`
3. `02_SYSTEM_SPECIFICATION_DOCUMENT_SSD.md`
4. `05_TECH_STACK_AND_DEPENDENCIES.md`
5. `09_BUILD_STEPS_EXACT_ORDER.md`
6. `07_AI_SCHEMAS_AND_PROMPTS.md`
7. `10_TEST_PLAN_BY_STAGE.md`

## Demo success condition

Within 3 minutes, judges must see:

1. User uploads handwritten receipt or bank alert screenshot.
2. Gemini extracts a ledger entry.
3. User reviews and saves it.
4. Dashboard updates.
5. User asks Kudi: "Who owes me?"
6. Assistant answers from saved ledger.
7. User generates a credit summary.

If that works, the MVP is successful.

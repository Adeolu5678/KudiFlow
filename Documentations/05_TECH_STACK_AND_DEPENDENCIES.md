# Exact Tech Stack and Dependencies

As-of date: 2026-05-02.

## Platform

- iOS native app.
- SwiftUI for UI.
- Swift concurrency: async/await.
- Xcode: latest stable available on competition machines.
- Firebase Apple SDK: install via Swift Package Manager using the latest available release.
- Firebase release notes indicate newer Firebase Apple SDK versions require at least Xcode 26.2 and Swift 6.2.3+ from Firebase 12.12.0 onward. If the competition machine is older, use the latest Firebase version compatible with that machine.

## iOS deployment target

Recommended:
- iOS 18.0 minimum for hackathon reliability.

Allowed:
- Set to the latest simulator/device version available on the Mac.

Do not use beta-only APIs.

## Firebase packages

Add through Swift Package Manager:

Repository:
- `https://github.com/firebase/firebase-ios-sdk`

Required packages:
- `FirebaseCore`
- `FirebaseFirestore`
- `FirebaseFirestoreSwift` if available in selected Firebase SDK organization
- `FirebaseAILogic`

Optional packages:
- `FirebaseStorage`
- `FirebaseAuth`
- `FirebaseAppCheck`

## AI model

Primary stable:
- `gemini-2.5-flash`

Optional latest preview:
- `gemini-3-flash-preview`

Rule:
- Use stable model for judged demo unless preview model is already verified.

## Apple frameworks

- SwiftUI
- PhotosUI
- Foundation
- Observation or ObservableObject depending on target compatibility
- AVFoundation only if real audio recording is implemented
- Speech only if system speech recognition is implemented

## Not used in MVP

- Node.js
- PostgreSQL
- Supabase
- Express
- Prisma
- Custom vector database
- LangChain
- Server-side LLM proxy

## Why Firebase AI Logic

Firebase AI Logic is selected because it is the official Firebase path for calling Gemini directly from mobile and web apps with client SDKs, including Swift. It also integrates with Firebase security controls like App Check.

## Why Firestore

Firestore is selected because:
- schema is flexible,
- realtime listeners are simple,
- Swift Codable mapping exists,
- Firebase setup is fast,
- hackathon MVP does not need relational joins.

## Why not PostgreSQL

PostgreSQL is a better production financial ledger database, but not for the one-day MVP. It adds:
- backend hosting,
- auth integration complexity,
- API design,
- migrations,
- deployment risk.

Use PostgreSQL only after the MVP proves demand.

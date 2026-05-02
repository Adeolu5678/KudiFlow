# SwiftUI App Architecture

## App module structure

```text
KudiFlow/
  App/
    KudiFlowApp.swift
    AppConfig.swift
    FirebaseBootstrap.swift

  Models/
    LedgerEntry.swift
    LedgerDraft.swift
    DashboardSummary.swift
    AssistantMessage.swift

  Services/
    AIExtractionService.swift
    AssistantService.swift
    LedgerRepository.swift
    CreditSummaryService.swift
    ImageInputService.swift

  ViewModels/
    UniversalLogViewModel.swift
    ReviewEntryViewModel.swift
    LedgerViewModel.swift
    DashboardViewModel.swift
    AssistantViewModel.swift
    CreditSummaryViewModel.swift

  Views/
    RootTabView.swift
    HomeDashboardView.swift
    UniversalLogView.swift
    ReviewEntryView.swift
    LedgerListView.swift
    AssistantView.swift
    CreditSummaryView.swift
    Components/
      MetricCard.swift
      EntryRow.swift
      LoadingOverlay.swift
      ErrorBanner.swift
      QuickPromptChip.swift

  Utilities/
    CurrencyFormatter.swift
    DateHelpers.swift
    LedgerValidator.swift
    LedgerContextBuilder.swift
    DashboardCalculator.swift
```

## Navigation

Use a TabView:

1. Home
2. Log
3. Assistant
4. Ledger
5. Credit

For demo, start on Home with a visible "Universal Log" CTA.

## Screen requirements

### HomeDashboardView

Must show:
- total sales,
- expenses,
- profit,
- outstanding,
- CTA: Universal Log,
- CTA: Ask Kudi.

### UniversalLogView

Must show:
- segmented control: Text / Image / Bank Alert.
- text input area.
- PhotosPicker for images.
- Extract button.
- loading state.
- error state.

### ReviewEntryView

Must show editable:
- type,
- title,
- amount,
- payment status,
- counterparty,
- item list,
- confidence warning.
- Save / Cancel.

### LedgerListView

Must show:
- entries sorted newest first,
- type badge,
- amount,
- payment status,
- counterparty.

### AssistantView

Must show:
- chat messages,
- quick prompt chips,
- input bar,
- typing/loading indicator.

Quick prompts:
- "How is my business today?"
- "Who owes me?"
- "Write reminder"
- "Generate credit summary"
- "What did I spend most on?"

### CreditSummaryView

Must show:
- total recorded sales,
- expenses,
- estimated profit,
- outstanding receivables,
- narrative summary,
- copy button.

## State management

Recommended:
- `@StateObject` ViewModels if using ObservableObject.
- `@Published` for observable state.
- async methods for service calls.

Do not over-engineer with Redux/TCA for hackathon.

## Visual style

- Clean, bold, simple.
- Large Naira numbers.
- Use cards.
- Avoid clutter.
- Business language over accounting language.

## Empty states

No entries:
- "No records yet. Tap Universal Log to add your first sale or expense."

No assistant context:
- "Add some records first, then Kudi can answer business questions."

AI error:
- "AI could not read this clearly. You can enter it manually."

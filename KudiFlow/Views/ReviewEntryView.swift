import SwiftUI

struct ReviewEntryView: View {
    @Environment(\.dismiss) var dismiss
    @State var draft: LedgerDraft
    var onSave: (LedgerEntry) -> Void
    
    var body: some View {
        NavigationView {
            Form {
                if draft.confidence < 0.8 {
                    Section {
                        Text("Please check this carefully.")
                            .foregroundColor(.orange)
                            .font(.subheadline)
                    }
                }
                
                Section(header: Text("Transaction Details")) {
                    Picker("Type", selection: $draft.type) {
                        ForEach(LedgerEntryType.allCases, id: \.self) { type in
                            Text(type.rawValue.capitalized).tag(type)
                        }
                    }
                    
                    TextField("Title", text: $draft.title)
                    
                    HStack {
                        Text("Amount (NGN)")
                        Spacer()
                        TextField("Amount", value: $draft.amount, format: .number)
                            .keyboardType(.decimalPad)
                            .multilineTextAlignment(.trailing)
                    }
                    
                    Picker("Payment Status", selection: $draft.paymentStatus) {
                        ForEach(PaymentStatus.allCases, id: \.self) { status in
                            Text(status.rawValue.capitalized).tag(status)
                        }
                    }
                    
                    TextField("Counterparty (Customer/Vendor)", text: Binding(
                        get: { draft.counterparty ?? "" },
                        set: { draft.counterparty = $0.isEmpty ? nil : $0 }
                    ))
                }
                
                Section {
                    Button(action: save) {
                        Text("Save Transaction")
                            .frame(maxWidth: .infinity)
                            .bold()
                    }
                    .buttonStyle(.borderedProminent)
                }
            }
            .navigationTitle("Review & Confirm")
            .navigationBarItems(leading: Button("Cancel") { dismiss() })
        }
    }
    
    private func save() {
        let entry = LedgerEntry(
            id: UUID().uuidString,
            type: draft.type,
            title: draft.title,
            amount: draft.amount ?? 0.0,
            currency: draft.currency,
            date: Date(),
            paymentStatus: draft.paymentStatus,
            counterparty: draft.counterparty,
            items: draft.items.map { LedgerItem(name: $0.name, quantity: $0.quantity, unitPrice: $0.unitPrice) },
            sourceType: draft.sourceType,
            originalNote: draft.originalNote,
            confidence: draft.confidence,
            createdAt: Date(),
            updatedAt: Date()
        )
        onSave(entry)
        dismiss()
    }
}

import SwiftUI

struct LedgerListView: View {
    @EnvironmentObject var repository: LedgerRepository
    
    var body: some View {
        NavigationView {
            List(repository.entries) { entry in
                HStack {
                    VStack(alignment: .leading) {
                        Text(entry.title)
                            .font(.headline)
                        Text(entry.date.formatted(date: .abbreviated, time: .shortened))
                            .font(.caption)
                            .foregroundColor(.gray)
                    }
                    Spacer()
                    VStack(alignment: .trailing) {
                        Text(entry.amount, format: .currency(code: entry.currency))
                            .bold()
                            .foregroundColor(entry.type == .income ? .green : (entry.type == .expense ? .red : .primary))
                        Text(entry.paymentStatus.rawValue.capitalized)
                            .font(.caption2)
                            .padding(.horizontal, 6)
                            .padding(.vertical, 2)
                            .background(statusColor(for: entry.paymentStatus).opacity(0.2))
                            .foregroundColor(statusColor(for: entry.paymentStatus))
                            .cornerRadius(4)
                    }
                }
            }
            .navigationTitle("Ledger")
            .overlay {
                if repository.entries.isEmpty {
                    VStack {
                        Image(systemName: "doc.text.magnifyingglass")
                            .font(.largeTitle)
                            .foregroundColor(.gray)
                        Text("No records yet. Tap Log to add your first sale or expense.")
                            .multilineTextAlignment(.center)
                            .padding()
                            .foregroundColor(.gray)
                    }
                }
            }
        }
    }
    
    private func statusColor(for status: PaymentStatus) -> Color {
        switch status {
        case .paid: return .green
        case .unpaid: return .orange
        case .partial: return .blue
        case .unknown: return .gray
        }
    }
}

#Preview {
    LedgerListView()
        .environmentObject(LedgerRepository())
}

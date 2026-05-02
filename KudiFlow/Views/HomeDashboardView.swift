import SwiftUI

struct HomeDashboardView: View {
    @Binding var selectedTab: Int
    @EnvironmentObject var repository: LedgerRepository
    @StateObject private var viewModel = DashboardViewModel()
    
    var body: some View {
        NavigationView {
            ScrollView {
                VStack(spacing: 20) {
                    HStack {
                        MetricCard(title: "Sales", value: viewModel.summary.totalSales, color: .green)
                        MetricCard(title: "Expenses", value: viewModel.summary.totalExpenses, color: .red)
                    }
                    
                    HStack {
                        MetricCard(title: "Est. Profit", value: viewModel.summary.estimatedProfit, color: .blue)
                        MetricCard(title: "Outstanding", value: viewModel.summary.totalReceivables, color: .orange)
                    }
                    
                    Button(action: { selectedTab = 1 }) {
                        Text("Log Transaction")
                            .font(.headline)
                            .frame(maxWidth: .infinity)
                            .padding()
                            .background(Color.blue)
                            .foregroundColor(.white)
                            .cornerRadius(10)
                    }
                    .padding(.top, 10)
                    
                    Button(action: { selectedTab = 2 }) {
                        Text("Ask Kudi")
                            .font(.headline)
                            .frame(maxWidth: .infinity)
                            .padding()
                            .foregroundColor(.blue)
                            .overlay(
                                RoundedRectangle(cornerRadius: 10)
                                    .stroke(Color.blue, lineWidth: 2)
                            )
                    }
                }
                .padding()
            }
            .navigationTitle("KudiFlow Dashboard")
            .onReceive(repository.$entries) { entries in
                viewModel.update(with: entries)
            }
        }
    }
}

struct MetricCard: View {
    let title: String
    let value: Double
    let color: Color
    
    var body: some View {
        VStack(alignment: .leading, spacing: 8) {
            Text(title)
                .font(.subheadline)
                .foregroundColor(.gray)
            Text(value, format: .currency(code: "NGN"))
                .font(.title3)
                .bold()
                .foregroundColor(color)
        }
        .frame(maxWidth: .infinity, alignment: .leading)
        .padding()
        .background(Color(.systemBackground))
        .cornerRadius(12)
        .shadow(color: Color.black.opacity(0.1), radius: 4, x: 0, y: 2)
    }
}

#Preview {
    HomeDashboardView(selectedTab: .constant(0))
        .environmentObject(LedgerRepository())
}

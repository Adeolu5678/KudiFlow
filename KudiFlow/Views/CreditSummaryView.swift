import SwiftUI

struct CreditSummaryView: View {
    @EnvironmentObject var repository: LedgerRepository
    @State private var reportText: String = ""
    @State private var isLoading = false
    @State private var isGenerated = false
    
    private let service = CreditSummaryService()
    
    var body: some View {
        NavigationView {
            ScrollView {
                VStack(spacing: 20) {
                    if !isGenerated && !isLoading {
                        Text("Generate a simple, plain-language credit summary to show your business activity.")
                            .multilineTextAlignment(.center)
                            .padding()
                            .foregroundColor(.gray)
                        
                        Button(action: { Task { await generate() } }) {
                            Text("Generate Report")
                                .font(.headline)
                                .frame(maxWidth: .infinity)
                                .padding()
                        }
                        .buttonStyle(.borderedProminent)
                        .padding(.horizontal)
                    }
                    
                    if isLoading {
                        ProgressView("Analyzing records...")
                            .padding()
                    }
                    
                    if isGenerated {
                        VStack(alignment: .leading, spacing: 16) {
                            Text(reportText)
                                .padding()
                                .background(Color(.systemGray6))
                                .cornerRadius(12)
                            
                            Button(action: {
                                UIPasteboard.general.string = reportText
                            }) {
                                Label("Copy to Clipboard", systemImage: "doc.on.doc")
                                    .frame(maxWidth: .infinity)
                            }
                            .buttonStyle(.bordered)
                        }
                        .padding()
                    }
                }
            }
            .navigationTitle("Credit Report")
        }
    }
    
    private func generate() async {
        isLoading = true
        do {
            reportText = try await service.generateSummary(entries: repository.entries)
            isGenerated = true
        } catch {
            reportText = "Could not generate report."
            isGenerated = true
        }
        isLoading = false
    }
}

#Preview {
    CreditSummaryView()
        .environmentObject(LedgerRepository())
}

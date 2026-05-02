import SwiftUI
import PhotosUI

struct UniversalLogView: View {
    @StateObject private var viewModel = UniversalLogViewModel()
    @EnvironmentObject var repository: LedgerRepository
    
    var body: some View {
        NavigationView {
            VStack(spacing: 20) {
                TextEditor(text: $viewModel.inputText)
                    .padding()
                    .overlay(RoundedRectangle(cornerRadius: 8).stroke(Color.gray.opacity(0.5)))
                    .frame(height: 150)
                    .padding(.horizontal)
                
                Button(action: { Task { await viewModel.extractText() } }) {
                    if viewModel.isLoading {
                        ProgressView()
                    } else {
                        Text("Extract from Text")
                    }
                }
                .buttonStyle(.borderedProminent)
                .disabled(viewModel.inputText.isEmpty || viewModel.isLoading)
                
                Divider().padding()
                
                PhotosPicker("Select Receipt or Bank Alert", selection: $viewModel.selectedItem, matching: .images)
                    .onChange(of: viewModel.selectedItem) { _ in
                        viewModel.loadSelectedImage()
                    }
                
                if let image = viewModel.selectedImage {
                    Image(uiImage: image)
                        .resizable()
                        .scaledToFit()
                        .frame(height: 150)
                    
                    Button(action: { Task { await viewModel.extractImage() } }) {
                        if viewModel.isLoading {
                            ProgressView()
                        } else {
                            Text("Extract from Image")
                        }
                    }
                    .buttonStyle(.borderedProminent)
                    .disabled(viewModel.isLoading)
                }
                
                if let error = viewModel.errorMessage {
                    Text(error)
                        .foregroundColor(.red)
                        .padding()
                }
                
                Spacer()
            }
            .navigationTitle("Log Transaction")
            .sheet(isPresented: $viewModel.showReview) {
                if let draft = viewModel.extractedDraft {
                    ReviewEntryView(draft: draft) { finalEntry in
                        Task {
                            try? await repository.save(entry: finalEntry, userId: AppConfig.demoUserId)
                            viewModel.inputText = ""
                            viewModel.selectedImage = nil
                            viewModel.selectedItem = nil
                        }
                    }
                }
            }
        }
    }
}

#Preview {
    UniversalLogView()
        .environmentObject(LedgerRepository())
}

import SwiftUI
import PhotosUI

@MainActor
class UniversalLogViewModel: ObservableObject {
    @Published var inputText: String = ""
    @Published var selectedItem: PhotosPickerItem?
    @Published var selectedImage: UIImage?
    @Published var isLoading = false
    @Published var errorMessage: String?
    @Published var extractedDraft: LedgerDraft?
    @Published var showReview = false
    
    private let aiService = AIExtractionService()
    
    func extractText() async {
        guard !inputText.isEmpty else { return }
        isLoading = true
        errorMessage = nil
        
        do {
            extractedDraft = try await aiService.extractFromText(inputText)
            showReview = true
        } catch {
            errorMessage = "AI could not read this clearly. You can enter it manually."
            print("Extraction error: \(error)")
        }
        
        isLoading = false
    }
    
    func extractImage() async {
        guard let image = selectedImage, let imageData = image.jpegData(compressionQuality: 0.8) else { return }
        isLoading = true
        errorMessage = nil
        
        do {
            extractedDraft = try await aiService.extractFromImage(imageData, mimeType: "image/jpeg", sourceType: .imageReceipt)
            showReview = true
        } catch {
            errorMessage = "AI could not read this image clearly. You can enter it manually."
            print("Extraction error: \(error)")
        }
        
        isLoading = false
    }
    
    func loadSelectedImage() {
        Task {
            if let data = try? await selectedItem?.loadTransferable(type: Data.self), let image = UIImage(data: data) {
                self.selectedImage = image
            }
        }
    }
}

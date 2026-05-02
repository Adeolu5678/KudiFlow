import Foundation

class CreditSummaryService {
    private let assistantService = AssistantService()
    
    func generateSummary(entries: [LedgerEntry]) async throws -> String {
        let contextJSON = LedgerContextBuilder.buildContext(from: entries)
        let prompt = "Generate a short, professional, lender-friendly credit summary report based on this context. Do not invent details. Do not promise loan approval. Format nicely."
        return try await assistantService.askQuestion(userText: prompt, contextJSON: contextJSON)
    }
}

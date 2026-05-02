import Foundation
import FirebaseVertexAI

class AssistantService {
    private let prompt = """
    You are Kudi, a business assistant inside KudiFlow.
    You help Nigerian micro-SME owners understand their ledger records.
    Only answer questions about sales, expenses, profit estimate, unpaid customers, customer reminders, restocking hints, or credit summary.
    Use only the ledger context supplied. If not enough info, say so.
    Do not invent transactions, customers, or loan eligibility.
    Tone: concise, practical, friendly, plain English with light Nigerian context.
    Rules: Use ₦ for Naira. Do not promise loan approval.
    """
    
    func askQuestion(userText: String, contextJSON: String) async throws -> String {
        if AppConfig.useMockAI {
            return "Mock Kudi says: Based on the records, your business is doing well! You have outstanding balances to collect."
        }
        
        let vertex = VertexAI.vertexAI()
        let model = vertex.generativeModel(modelName: AppConfig.assistantModelName)
        
        let fullPrompt = "\(prompt)\n\nLedger Context:\n\(contextJSON)\n\nUser: \(userText)"
        let response = try await model.generateContent(fullPrompt)
        
        return response.text ?? "Sorry, I could not understand the records."
    }
}

import Foundation

struct AssistantMessage: Identifiable, Codable {
    var id: String = UUID().uuidString
    var text: String
    var isUser: Bool
    var createdAt: Date = Date()
}

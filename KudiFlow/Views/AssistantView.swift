import SwiftUI

struct AssistantView: View {
    @EnvironmentObject var repository: LedgerRepository
    @State private var messages: [AssistantMessage] = []
    @State private var inputText: String = ""
    @State private var isLoading = false
    
    private let assistantService = AssistantService()
    
    let quickPrompts = [
        "How is my business today?",
        "Who owes me?",
        "Write reminder for Mama Bose",
        "Generate credit summary"
    ]
    
    var body: some View {
        NavigationView {
            VStack {
                ScrollView {
                    VStack(alignment: .leading, spacing: 12) {
                        if messages.isEmpty {
                            Text("I am Kudi, your business assistant. Ask me anything about your records!")
                                .foregroundColor(.gray)
                                .padding()
                        }
                        
                        ForEach(messages) { message in
                            HStack {
                                if message.isUser { Spacer() }
                                Text(message.text)
                                    .padding()
                                    .background(message.isUser ? Color.blue : Color.gray.opacity(0.2))
                                    .foregroundColor(message.isUser ? .white : .primary)
                                    .cornerRadius(12)
                                if !message.isUser { Spacer() }
                            }
                        }
                        
                        if isLoading {
                            ProgressView()
                                .padding()
                        }
                    }
                    .padding()
                }
                
                ScrollView(.horizontal, showsIndicators: false) {
                    HStack {
                        ForEach(quickPrompts, id: \.self) { prompt in
                            Button(action: {
                                inputText = prompt
                                Task { await sendMessage() }
                            }) {
                                Text(prompt)
                                    .font(.caption)
                                    .padding()
                                    .background(Color.blue.opacity(0.1))
                                    .cornerRadius(20)
                            }
                        }
                    }
                    .padding(.horizontal)
                }
                
                HStack {
                    TextField("Ask Kudi...", text: $inputText)
                        .textFieldStyle(.roundedBorder)
                    Button(action: { Task { await sendMessage() } }) {
                        Image(systemName: "paperplane.fill")
                    }
                    .disabled(inputText.isEmpty || isLoading)
                }
                .padding()
            }
            .navigationTitle("Ask Kudi")
        }
    }
    
    private func sendMessage() async {
        let userText = inputText
        inputText = ""
        messages.append(AssistantMessage(text: userText, isUser: true))
        
        isLoading = true
        
        let contextJSON = LedgerContextBuilder.buildContext(from: repository.entries)
        
        do {
            let response = try await assistantService.askQuestion(userText: userText, contextJSON: contextJSON)
            messages.append(AssistantMessage(text: response, isUser: false))
        } catch {
            messages.append(AssistantMessage(text: "Sorry, I ran into an error. Please try again.", isUser: false))
        }
        
        isLoading = false
    }
}

#Preview {
    AssistantView()
        .environmentObject(LedgerRepository())
}

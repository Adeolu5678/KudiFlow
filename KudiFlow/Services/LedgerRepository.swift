import Foundation
import FirebaseFirestore

class LedgerRepository: ObservableObject {
    private let db = Firestore.firestore()
    private var listenerRegistration: ListenerRegistration?
    
    @Published var entries: [LedgerEntry] = []
    
    func save(entry: LedgerEntry, userId: String) async throws {
        let collection = db.collection("users").document(userId).collection("ledgerEntries")
        
        if let id = entry.id {
            try collection.document(id).setData(from: entry)
        } else {
            let ref = collection.document()
            var newEntry = entry
            newEntry.id = ref.documentID
            try ref.setData(from: newEntry)
        }
    }
    
    func listen(userId: String) {
        listenerRegistration?.remove()
        
        let collection = db.collection("users").document(userId).collection("ledgerEntries")
        listenerRegistration = collection.order(by: "date", descending: true)
            .addSnapshotListener { [weak self] querySnapshot, error in
                guard let documents = querySnapshot?.documents else {
                    print("Error fetching documents: \(error?.localizedDescription ?? "Unknown error")")
                    return
                }
                
                self?.entries = documents.compactMap { document in
                    try? document.data(as: LedgerEntry.self)
                }
            }
    }
    
    func fetchRecent(userId: String, limit: Int = 20) async throws -> [LedgerEntry] {
        let collection = db.collection("users").document(userId).collection("ledgerEntries")
        let snapshot = try await collection.order(by: "date", descending: true).limit(to: limit).getDocuments()
        return snapshot.documents.compactMap { try? $0.data(as: LedgerEntry.self) }
    }
    
    deinit {
        listenerRegistration?.remove()
    }
}

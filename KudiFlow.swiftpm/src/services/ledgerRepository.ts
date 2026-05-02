import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  limit,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  Timestamp,
} from 'firebase/firestore';
import { AppConfig } from '../config/AppConfig';
import { seedLedgerEntries } from '../data/seedLedgerEntries';
import { LedgerEntry } from '../models';
import { getFirebaseDb } from './firebaseBootstrap';

function usersCollectionPath(userId: string) {
  return `users/${userId}/ledgerEntries`;
}

function asIso(value: unknown): string {
  if (value instanceof Timestamp) {
    return value.toDate().toISOString();
  }
  if (typeof value === 'string') {
    return value;
  }
  return new Date().toISOString();
}

function mapFirestoreEntry(raw: Record<string, unknown>, id: string): LedgerEntry {
  return {
    id,
    type: (raw.type as LedgerEntry['type']) ?? 'unknown',
    title: String(raw.title ?? 'Untitled transaction'),
    amount: Number(raw.amount ?? 0),
    currency: 'NGN',
    date: asIso(raw.date),
    paymentStatus: (raw.paymentStatus as LedgerEntry['paymentStatus']) ?? 'unknown',
    counterparty: raw.counterparty ? String(raw.counterparty) : null,
    items: Array.isArray(raw.items) ? (raw.items as LedgerEntry['items']) : [],
    sourceType: (raw.sourceType as LedgerEntry['sourceType']) ?? 'manual',
    originalNote: raw.originalNote ? String(raw.originalNote) : null,
    confidence: Number(raw.confidence ?? 1),
    createdAt: asIso(raw.createdAt),
    updatedAt: asIso(raw.updatedAt),
  };
}

export class LedgerRepository {
  private entries: LedgerEntry[] = [...seedLedgerEntries];

  async save(entry: LedgerEntry, userId: string): Promise<void> {
    const db = getFirebaseDb();
    if (!db || !AppConfig.useFirestore) {
      this.entries = [entry, ...this.entries.filter((existing) => existing.id !== entry.id)];
      return;
    }
    const ref = doc(collection(db, usersCollectionPath(userId)), entry.id);
    await setDoc(ref, {
      ...entry,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      date: Timestamp.fromDate(new Date(entry.date)),
    });
  }

  async fetchRecent(userId: string, maxCount: number): Promise<LedgerEntry[]> {
    const db = getFirebaseDb();
    if (!db || !AppConfig.useFirestore) {
      return [...this.entries].sort((a, b) => (a.date < b.date ? 1 : -1)).slice(0, maxCount);
    }
    const q = query(collection(db, usersCollectionPath(userId)), orderBy('date', 'desc'), limit(maxCount));
    const snapshot = await getDocs(q);
    return snapshot.docs.map((item) => mapFirestoreEntry(item.data(), item.id));
  }

  listen(userId: string, onChange: (entries: LedgerEntry[]) => void): () => void {
    const db = getFirebaseDb();
    if (!db || !AppConfig.useFirestore) {
      onChange([...this.entries].sort((a, b) => (a.date < b.date ? 1 : -1)));
      return () => undefined;
    }
    const q = query(collection(db, usersCollectionPath(userId)), orderBy('date', 'desc'));
    return onSnapshot(q, (snapshot) => {
      const mapped = snapshot.docs.map((item) => mapFirestoreEntry(item.data(), item.id));
      onChange(mapped);
    });
  }

  async resetDemoData(userId: string): Promise<void> {
    const db = getFirebaseDb();
    if (!db || !AppConfig.useFirestore) {
      this.entries = [...seedLedgerEntries];
      return;
    }
    const q = query(collection(db, usersCollectionPath(userId)));
    const snapshot = await getDocs(q);
    await Promise.all(snapshot.docs.map((entryDoc) => deleteDoc(entryDoc.ref)));
    await Promise.all(
      seedLedgerEntries.map((entry) => {
        const ref = doc(collection(db, usersCollectionPath(userId)), entry.id);
        return setDoc(ref, {
          ...entry,
          createdAt: Timestamp.fromDate(new Date(entry.createdAt)),
          updatedAt: Timestamp.fromDate(new Date(entry.updatedAt)),
          date: Timestamp.fromDate(new Date(entry.date)),
        });
      })
    );
  }
}

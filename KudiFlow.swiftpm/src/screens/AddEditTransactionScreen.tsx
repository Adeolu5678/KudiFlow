import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput } from 'react-native';
import { ScreenContainer } from '../components/ScreenContainer';
import { LedgerEntry } from '../models';
import { RootStackParamList } from '../navigation/types';
import { useAppState } from '../state/AppState';
import { colors } from '../theme';

type Props = NativeStackScreenProps<RootStackParamList, 'AddEditTransaction'>;

export function AddEditTransactionScreen({ navigation }: Props) {
  const { saveManualEntry, loading } = useAppState();
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [counterparty, setCounterparty] = useState('');

  const save = async () => {
    const now = new Date().toISOString();
    const entry: LedgerEntry = {
      id: `manual-${Date.now()}`,
      type: 'income',
      title: title || 'Manual transaction',
      amount: Number(amount || 0),
      currency: 'NGN',
      date: now,
      paymentStatus: 'paid',
      counterparty: counterparty || null,
      items: [],
      sourceType: 'manual',
      originalNote: null,
      confidence: 1,
      createdAt: now,
      updatedAt: now,
    };
    await saveManualEntry(entry);
    navigation.goBack();
  };

  return (
    <ScreenContainer>
      <Text style={styles.title}>Add / Edit Transaction</Text>
      <TextInput
        value={title}
        onChangeText={setTitle}
        placeholder="Transaction title"
        placeholderTextColor="#6E7AA3"
        style={styles.input}
      />
      <TextInput
        value={amount}
        onChangeText={setAmount}
        placeholder="Amount (NGN)"
        placeholderTextColor="#6E7AA3"
        keyboardType="numeric"
        style={styles.input}
      />
      <TextInput
        value={counterparty}
        onChangeText={setCounterparty}
        placeholder="Counterparty"
        placeholderTextColor="#6E7AA3"
        style={styles.input}
      />
      <Pressable style={styles.primary} onPress={save} disabled={loading}>
        <Text style={styles.primaryText}>{loading ? 'Saving...' : 'Save Manual Entry'}</Text>
      </Pressable>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  title: { color: colors.textPrimary, fontSize: 28, fontWeight: '900' },
  input: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    backgroundColor: colors.surface,
    color: colors.textPrimary,
    paddingHorizontal: 12,
    paddingVertical: 11,
  },
  primary: {
    backgroundColor: colors.accentStrong,
    borderRadius: 14,
    alignItems: 'center',
    paddingVertical: 14,
  },
  primaryText: { color: '#031611', fontWeight: '900' },
});

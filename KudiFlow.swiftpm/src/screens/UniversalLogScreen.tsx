import * as ImagePicker from 'expo-image-picker';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { ErrorBanner } from '../components/ErrorBanner';
import { ScreenContainer } from '../components/ScreenContainer';
import { RootStackParamList, TabParamList } from '../navigation/types';
import { useAppState } from '../state/AppState';
import { colors } from '../theme';

type Props = BottomTabScreenProps<TabParamList, 'Log'> & {
  navigation: BottomTabScreenProps<TabParamList, 'Log'>['navigation'] & {
    navigate: (screen: keyof RootStackParamList | keyof TabParamList) => void;
  };
};

const inputModes = [
  { key: 'text', label: 'Text' },
  { key: 'imageReceipt', label: 'Image' },
  { key: 'bankAlertScreenshot', label: 'Bank Alert' },
  { key: 'manual', label: 'Voice-style' },
] as const;

type InputMode = (typeof inputModes)[number]['key'];

export function UniversalLogScreen({ navigation }: Props) {
  const { extractFromText, extractFromImage, loading, error, clearError, draft } = useAppState();
  const [inputMode, setInputMode] = useState<InputMode>('text');
  const [note, setNote] = useState('');

  const runExtract = async () => {
    if (inputMode === 'text' || inputMode === 'manual') {
      await extractFromText(note, inputMode === 'text' ? 'text' : 'manual');
      navigation.navigate(inputMode === 'manual' ? 'AIReviewVoice' : 'AIReviewReceipt');
      return;
    }
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      return;
    }
    const selection = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      quality: 0.7,
      base64: true,
    });
    if (selection.canceled || !selection.assets[0]?.base64) {
      return;
    }
    await extractFromImage(selection.assets[0].base64, inputMode);
    navigation.navigate('AIReviewReceipt');
  };

  return (
    <ScreenContainer>
      <Text style={styles.title}>Universal Log</Text>
      <Text style={styles.subtitle}>Text, image, transfer alert, or voice-style note.</Text>
      <View style={styles.segmentRow}>
        {inputModes.map((mode) => (
          <Pressable
            key={mode.key}
            style={[styles.segment, inputMode === mode.key && styles.segmentActive]}
            onPress={() => setInputMode(mode.key)}
          >
            <Text style={[styles.segmentLabel, inputMode === mode.key && styles.segmentLabelActive]}>{mode.label}</Text>
          </Pressable>
        ))}
      </View>
      {error ? <ErrorBanner message={error} onDismiss={clearError} /> : null}
      <TextInput
        placeholder="Sold rice to Tunde for 15000, paid transfer..."
        placeholderTextColor="#6E7AA3"
        multiline
        numberOfLines={5}
        style={styles.noteInput}
        value={note}
        onChangeText={setNote}
      />
      <Pressable style={styles.primary} onPress={runExtract} disabled={loading}>
        <Text style={styles.primaryText}>{loading ? 'Extracting...' : 'Extract with AI'}</Text>
      </Pressable>
      <View style={styles.actions}>
        <Pressable style={styles.secondary} onPress={() => navigation.navigate('CapturePhoto')}>
          <Text style={styles.secondaryText}>Capture Photo</Text>
        </Pressable>
        <Pressable style={styles.secondary} onPress={() => navigation.navigate('VoiceNoteRecording')}>
          <Text style={styles.secondaryText}>Voice Note</Text>
        </Pressable>
      </View>
      {draft ? (
        <Pressable style={styles.secondary} onPress={() => navigation.navigate('AIReviewReceipt')}>
          <Text style={styles.secondaryText}>Open Review & Confirm</Text>
        </Pressable>
      ) : null}
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  title: { color: colors.textPrimary, fontSize: 28, fontWeight: '900' },
  subtitle: { color: colors.textSecondary },
  segmentRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  segment: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: colors.surface,
  },
  segmentActive: { borderColor: colors.accent, backgroundColor: '#123B38' },
  segmentLabel: { color: colors.textSecondary, fontSize: 12, fontWeight: '700' },
  segmentLabelActive: { color: colors.accent },
  noteInput: {
    minHeight: 140,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 14,
    backgroundColor: colors.surface,
    padding: 12,
    color: colors.textPrimary,
    textAlignVertical: 'top',
  },
  primary: {
    backgroundColor: colors.accentStrong,
    borderRadius: 14,
    alignItems: 'center',
    paddingVertical: 14,
  },
  primaryText: { color: '#031611', fontWeight: '900' },
  actions: { flexDirection: 'row', gap: 10 },
  secondary: {
    flex: 1,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    alignItems: 'center',
    paddingVertical: 12,
  },
  secondaryText: { color: colors.textPrimary, fontWeight: '700' },
});

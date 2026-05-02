import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput } from 'react-native';
import { ScreenContainer } from '../components/ScreenContainer';
import { RootStackParamList } from '../navigation/types';
import { useAppState } from '../state/AppState';
import { colors } from '../theme';

type Props = NativeStackScreenProps<RootStackParamList, 'VoiceNoteRecording'>;

export function VoiceNoteRecordingScreen({ navigation }: Props) {
  const { extractFromText, loading } = useAppState();
  const [voiceText, setVoiceText] = useState('');

  const submit = async () => {
    await extractFromText(voiceText, 'manual');
    navigation.navigate('AIReviewVoice');
  };

  return (
    <ScreenContainer>
      <Text style={styles.title}>Voice Note Recording</Text>
      <Text style={styles.subtitle}>MVP: voice-style text entry (audio capture can be added later).</Text>
      <TextInput
        value={voiceText}
        onChangeText={setVoiceText}
        multiline
        numberOfLines={6}
        style={styles.noteInput}
        placeholder="Mama Bose collect garri 8k she go pay tomorrow..."
        placeholderTextColor="#6E7AA3"
      />
      <Pressable style={styles.primary} onPress={submit} disabled={loading}>
        <Text style={styles.primaryText}>{loading ? 'Extracting...' : 'Extract from Voice Text'}</Text>
      </Pressable>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  title: { color: colors.textPrimary, fontSize: 28, fontWeight: '900' },
  subtitle: { color: colors.textSecondary },
  noteInput: {
    minHeight: 160,
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
});

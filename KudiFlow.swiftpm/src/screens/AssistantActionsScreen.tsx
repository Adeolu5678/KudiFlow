import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Pressable, StyleSheet, Text } from 'react-native';
import { ScreenContainer } from '../components/ScreenContainer';
import { RootStackParamList } from '../navigation/types';
import { useAppState } from '../state/AppState';
import { colors } from '../theme';

type Props = NativeStackScreenProps<RootStackParamList, 'AssistantActions'>;

export function AssistantActionsScreen({ navigation }: Props) {
  const { sendAssistantMessage, generateCreditSummary, loading } = useAppState();

  return (
    <ScreenContainer>
      <Text style={styles.title}>Assistant Actions</Text>
      <Pressable style={styles.action} onPress={() => sendAssistantMessage('How much did I sell today?')}>
        <Text style={styles.actionText}>How much did I sell today?</Text>
      </Pressable>
      <Pressable style={styles.action} onPress={() => sendAssistantMessage('Who owes me?')}>
        <Text style={styles.actionText}>Who owes me?</Text>
      </Pressable>
      <Pressable style={styles.action} onPress={() => sendAssistantMessage('What should I restock?')}>
        <Text style={styles.actionText}>What should I restock?</Text>
      </Pressable>
      <Pressable
        style={styles.primary}
        onPress={async () => {
          await generateCreditSummary();
          navigation.navigate('Tabs');
        }}
        disabled={loading}
      >
        <Text style={styles.primaryText}>{loading ? 'Generating...' : 'Generate Credit Summary'}</Text>
      </Pressable>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  title: { color: colors.textPrimary, fontSize: 28, fontWeight: '900' },
  action: {
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    padding: 14,
  },
  actionText: { color: colors.textPrimary, fontWeight: '700' },
  primary: {
    marginTop: 4,
    backgroundColor: colors.accentStrong,
    borderRadius: 14,
    alignItems: 'center',
    paddingVertical: 14,
  },
  primaryText: { color: '#031611', fontWeight: '900' },
});

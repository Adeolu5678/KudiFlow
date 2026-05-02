import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Pressable, StyleSheet, Text } from 'react-native';
import { ScreenContainer } from '../components/ScreenContainer';
import { RootStackParamList } from '../navigation/types';
import { useAppState } from '../state/AppState';
import { colors } from '../theme';

type Props = NativeStackScreenProps<RootStackParamList, 'AccountMore'>;

export function AccountMoreScreen({ navigation }: Props) {
  const { resetDemoData, loading, mockAIMode, setMockAIMode } = useAppState();
  return (
    <ScreenContainer>
      <Text style={styles.title}>Account / More</Text>
      <Pressable style={styles.action} onPress={() => setMockAIMode(!mockAIMode)}>
        <Text style={styles.actionText}>Mock AI: {mockAIMode ? 'ON' : 'OFF'}</Text>
      </Pressable>
      <Pressable style={styles.action} onPress={() => navigation.navigate('SpoilSense')}>
        <Text style={styles.actionText}>Spoil Sense</Text>
      </Pressable>
      <Pressable style={styles.action} onPress={() => navigation.navigate('EmptyState')}>
        <Text style={styles.actionText}>Empty State Preview</Text>
      </Pressable>
      <Pressable style={styles.primary} onPress={resetDemoData} disabled={loading}>
        <Text style={styles.primaryText}>{loading ? 'Resetting...' : 'Reset Demo Data'}</Text>
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
    backgroundColor: colors.accentStrong,
    borderRadius: 14,
    alignItems: 'center',
    paddingVertical: 14,
  },
  primaryText: { color: '#031611', fontWeight: '900' },
});

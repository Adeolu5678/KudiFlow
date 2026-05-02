import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors } from '../theme';

type Props = {
  message: string;
  onDismiss: () => void;
};

export function ErrorBanner({ message, onDismiss }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{message}</Text>
      <Pressable onPress={onDismiss}>
        <Text style={styles.action}>Dismiss</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#3A1220',
    borderColor: colors.danger,
    borderWidth: 1,
    borderRadius: 12,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
  },
  text: {
    color: '#FFD8E1',
    flex: 1,
    fontSize: 12,
  },
  action: {
    color: colors.danger,
    fontWeight: '700',
    fontSize: 12,
  },
});

import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { QuickPromptChip } from '../components/QuickPromptChip';
import { ScreenContainer } from '../components/ScreenContainer';
import { RootStackParamList, TabParamList } from '../navigation/types';
import { useAppState } from '../state/AppState';
import { colors } from '../theme';

type Props = BottomTabScreenProps<TabParamList, 'Assistant'> & {
  navigation: BottomTabScreenProps<TabParamList, 'Assistant'>['navigation'] & {
    navigate: (screen: keyof RootStackParamList | keyof TabParamList) => void;
  };
};

const prompts = ['How is my business today?', 'Who owes me?', 'Write reminder', 'Generate credit summary', 'What should I restock?'];

export function AssistantChatScreen({ navigation }: Props) {
  const { messages, sendAssistantMessage, loading } = useAppState();
  const [input, setInput] = useState('');

  const submit = async (message: string) => {
    await sendAssistantMessage(message);
    setInput('');
  };

  return (
    <ScreenContainer>
      <Text style={styles.title}>Assistant Chat</Text>
      <View style={styles.promptWrap}>
        {prompts.map((prompt) => (
          <QuickPromptChip key={prompt} text={prompt} onPress={() => submit(prompt)} />
        ))}
      </View>
      <Pressable style={styles.secondary} onPress={() => navigation.navigate('AssistantActions')}>
        <Text style={styles.secondaryText}>Assistant Actions</Text>
      </Pressable>
      <View style={styles.chatBox}>
        {messages.map((message) => (
          <View key={message.id} style={[styles.bubble, message.role === 'user' ? styles.userBubble : styles.assistantBubble]}>
            <Text style={styles.bubbleRole}>{message.role === 'user' ? 'You' : 'Kudi'}</Text>
            <Text style={styles.bubbleText}>{message.content}</Text>
          </View>
        ))}
      </View>
      <View style={styles.inputRow}>
        <TextInput
          value={input}
          onChangeText={setInput}
          placeholder="Ask Kudi..."
          placeholderTextColor="#6E7AA3"
          style={styles.input}
        />
        <Pressable style={styles.send} onPress={() => submit(input)} disabled={loading}>
          <Text style={styles.sendText}>{loading ? '...' : 'Send'}</Text>
        </Pressable>
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  title: { color: colors.textPrimary, fontSize: 28, fontWeight: '900' },
  promptWrap: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  secondary: {
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    alignItems: 'center',
    paddingVertical: 10,
  },
  secondaryText: { color: colors.textPrimary, fontWeight: '700' },
  chatBox: { gap: 8 },
  bubble: {
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 10,
    gap: 4,
  },
  userBubble: { alignSelf: 'flex-end', backgroundColor: '#0F3142', maxWidth: '90%' },
  assistantBubble: { alignSelf: 'flex-start', backgroundColor: colors.surface, maxWidth: '92%' },
  bubbleRole: { color: colors.textSecondary, fontSize: 11, fontWeight: '700' },
  bubbleText: { color: colors.textPrimary, fontSize: 13, lineHeight: 18 },
  inputRow: { flexDirection: 'row', gap: 8 },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    backgroundColor: colors.surface,
    color: colors.textPrimary,
    paddingHorizontal: 12,
  },
  send: {
    minWidth: 72,
    borderRadius: 12,
    backgroundColor: colors.accentStrong,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 12,
  },
  sendText: { color: '#031611', fontWeight: '900' },
});

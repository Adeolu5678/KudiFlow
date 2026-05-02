import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Text } from 'react-native';
import { colors } from '../theme';
import { AccountMoreScreen } from '../screens/AccountMoreScreen';
import { AddEditTransactionScreen } from '../screens/AddEditTransactionScreen';
import { AssistantActionsScreen } from '../screens/AssistantActionsScreen';
import { AssistantChatScreen } from '../screens/AssistantChatScreen';
import { CapturePhotoScreen } from '../screens/CapturePhotoScreen';
import { CreditSummaryScreen } from '../screens/CreditSummaryScreen';
import { EmptyStateScreen } from '../screens/EmptyStateScreen';
import { FiltersScreen } from '../screens/FiltersScreen';
import { HomeDashboardScreen } from '../screens/HomeDashboardScreen';
import { LedgerListScreen } from '../screens/LedgerListScreen';
import { OnboardingScreen } from '../screens/OnboardingScreen';
import { ReviewEntryScreen } from '../screens/ReviewEntryScreen';
import { SpoilSenseScreen } from '../screens/SpoilSenseScreen';
import { UniversalLogScreen } from '../screens/UniversalLogScreen';
import { VoiceNoteRecordingScreen } from '../screens/VoiceNoteRecordingScreen';
import { RootStackParamList, TabParamList } from './types';

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tabs = createBottomTabNavigator<TabParamList>();

const navTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: colors.background,
    card: colors.surface,
    text: colors.textPrimary,
    border: colors.border,
    primary: colors.accent,
  },
};

function TabLabel({ label, focused }: { label: string; focused: boolean }) {
  return <Text style={{ color: focused ? colors.accent : colors.textSecondary, fontSize: 11, fontWeight: '700' }}>{label}</Text>;
}

function TabNavigator() {
  return (
    <Tabs.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: colors.surface },
        headerTintColor: colors.textPrimary,
        tabBarStyle: { backgroundColor: colors.surface, borderTopColor: colors.border },
      }}
    >
      <Tabs.Screen name="Home" component={HomeDashboardScreen} options={{ tabBarLabel: ({ focused }) => <TabLabel focused={focused} label="Home" /> }} />
      <Tabs.Screen name="Log" component={UniversalLogScreen} options={{ tabBarLabel: ({ focused }) => <TabLabel focused={focused} label="Log" /> }} />
      <Tabs.Screen
        name="Assistant"
        component={AssistantChatScreen}
        options={{ tabBarLabel: ({ focused }) => <TabLabel focused={focused} label="Assistant" /> }}
      />
      <Tabs.Screen name="Ledger" component={LedgerListScreen} options={{ tabBarLabel: ({ focused }) => <TabLabel focused={focused} label="Ledger" /> }} />
      <Tabs.Screen name="Credit" component={CreditSummaryScreen} options={{ tabBarLabel: ({ focused }) => <TabLabel focused={focused} label="Credit" /> }} />
    </Tabs.Navigator>
  );
}

export function RootNavigator() {
  return (
    <NavigationContainer theme={navTheme}>
      <Stack.Navigator
        initialRouteName="Onboarding"
        screenOptions={{
          headerStyle: { backgroundColor: colors.surface },
          headerTintColor: colors.textPrimary,
          contentStyle: { backgroundColor: colors.background },
        }}
      >
        <Stack.Screen name="Onboarding" component={OnboardingScreen} options={{ title: 'Welcome' }} />
        <Stack.Screen name="Tabs" component={TabNavigator} options={{ headerShown: false }} />
        <Stack.Screen name="CapturePhoto" component={CapturePhotoScreen} options={{ title: 'Capture Photo' }} />
        <Stack.Screen name="AIReviewReceipt" component={ReviewEntryScreen} options={{ title: 'AI Review — Receipt' }} />
        <Stack.Screen name="VoiceNoteRecording" component={VoiceNoteRecordingScreen} options={{ title: 'Voice Note Recording' }} />
        <Stack.Screen name="AIReviewVoice" component={ReviewEntryScreen} options={{ title: 'AI Review — Voice' }} />
        <Stack.Screen name="AssistantActions" component={AssistantActionsScreen} options={{ title: 'Assistant Actions' }} />
        <Stack.Screen name="AccountMore" component={AccountMoreScreen} options={{ title: 'Account / More' }} />
        <Stack.Screen name="SpoilSense" component={SpoilSenseScreen} options={{ title: 'Spoil Sense' }} />
        <Stack.Screen name="Filters" component={FiltersScreen} options={{ title: 'Filters' }} />
        <Stack.Screen name="AddEditTransaction" component={AddEditTransactionScreen} options={{ title: 'Add / Edit Transaction' }} />
        <Stack.Screen name="EmptyState" component={EmptyStateScreen} options={{ title: 'Empty State' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

import { Stack } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { HEREConfig } from 'react-native-here-explore';

const result = HEREConfig.initializeHereSDK(
  process.env.EXPO_PUBLIC_HERE_ACCESS_KEY_ID ?? '',
  process.env.EXPO_PUBLIC_HERE_ACCESS_KEY_SECRET ?? ''
);
console.log('Initializing HERE SDK', result);

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Stack screenOptions={{ headerShown: false }} />
    </GestureHandlerRootView>
  );
}

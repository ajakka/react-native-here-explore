---
sidebar_position: 2
---

# Initialization

Before using any map component or routing function, you must initialize the HERE SDK with your credentials. This should be done **once**, as early as possible in your app's lifecycle — before any component mounts.

## Bare React Native

In your `index.ts` (or entry file), call `initializeHereSDK` before registering the app:

```typescript
import { AppRegistry } from 'react-native';
import { HEREConfig } from 'react-native-here-explore';
import App from './App';
import { name as appName } from './app.json';

HEREConfig.initializeHereSDK(
  'YOUR_ACCESS_KEY_ID',
  'YOUR_ACCESS_KEY_SECRET'
);

AppRegistry.registerComponent(appName, () => App);
```

:::caution Security
Never hard-code credentials in source files committed to version control. Use environment variables or a secrets manager instead.
:::

## Expo

With Expo, use `EXPO_PUBLIC_` environment variables. Create a `.env` file at your project root:

```env
EXPO_PUBLIC_HERE_ACCESS_KEY_ID=YOUR_ACCESS_KEY_ID
EXPO_PUBLIC_HERE_ACCESS_KEY_SECRET=YOUR_ACCESS_KEY_SECRET
```

Then initialize in your root layout (e.g. `app/_layout.tsx`):

```typescript
import { HEREConfig } from 'react-native-here-explore';

HEREConfig.initializeHereSDK(
  process.env.EXPO_PUBLIC_HERE_ACCESS_KEY_ID!,
  process.env.EXPO_PUBLIC_HERE_ACCESS_KEY_SECRET!
);
```

## Return value

`initializeHereSDK` returns a `string` describing the initialization result. You can log it to verify success:

```typescript
const result = HEREConfig.initializeHereSDK(keyId, keySecret);
console.log('HERE SDK init:', result);
```

## Next Step

You're ready to render a map. See the [Map component](../components/map).

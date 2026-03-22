---
sidebar_position: 1
---

# HEREConfig

`HEREConfig` is the initialization module for the HERE SDK. It must be called before using any map component or routing function.

## Import

```typescript
import { HEREConfig } from 'react-native-here-explore';
```

---

## `HEREConfig.initializeHereSDK`

Initializes the HERE SDK with your OAuth 2.0 credentials.

### Signature

```typescript
HEREConfig.initializeHereSDK(
  accessKeyID: string,
  accessKeySecret: string
): string
```

### Parameters

| Parameter | Type | Description |
|---|---|---|
| `accessKeyID` | `string` | Your app's Access Key ID from the HERE platform admin portal |
| `accessKeySecret` | `string` | Your app's Access Key Secret |

### Returns

`string` — a message describing the initialization result (e.g., `"SDK initialized successfully"` or an error description).

### Example

```typescript
import { HEREConfig } from 'react-native-here-explore';

const result = HEREConfig.initializeHereSDK(
  'YOUR_ACCESS_KEY_ID',
  'YOUR_ACCESS_KEY_SECRET'
);

console.log(result); // "SDK initialized successfully"
```

---

## When to call it

Call `initializeHereSDK` **once**, before any map component renders. The best place is in your app entry file before `AppRegistry.registerComponent`.

**Bare React Native (`index.ts`):**
```typescript
import { AppRegistry } from 'react-native';
import { HEREConfig } from 'react-native-here-explore';
import App from './App';
import { name as appName } from './app.json';

HEREConfig.initializeHereSDK(
  process.env.HERE_ACCESS_KEY_ID ?? '',
  process.env.HERE_ACCESS_KEY_SECRET ?? ''
);

AppRegistry.registerComponent(appName, () => App);
```

**Expo (`app/_layout.tsx`):**
```typescript
import { HEREConfig } from 'react-native-here-explore';

HEREConfig.initializeHereSDK(
  process.env.EXPO_PUBLIC_HERE_ACCESS_KEY_ID!,
  process.env.EXPO_PUBLIC_HERE_ACCESS_KEY_SECRET!
);
```

---

## Getting credentials

1. Sign up at [platform.here.com](https://platform.here.com/sign-up)
2. Register an application at [platform.here.com/admin/apps](https://platform.here.com/admin/apps)
3. In the **Credentials** tab, select **OAuth 2.0** → **Create credentials**
4. Download the credentials file to get your `ACCESS_KEY_ID` and `ACCESS_KEY_SECRET`

See the [Installation guide](../getting-started/installation) for the full setup walkthrough.

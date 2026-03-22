<h1 align="center">
    <strong>HEREConfig</strong>
</h1>

## Overview

`HEREConfig` is the initialization module for the HERE SDK. It must be called **once**, before any map component renders.

## Methods

### `HEREConfig.initializeHereSDK(accessKeyID, accessKeySecret)`

Initializes the HERE SDK using OAuth 2.0 credentials from the HERE Platform.

```typescript
HEREConfig.initializeHereSDK(
  accessKeyID: string,
  accessKeySecret: string
): string
```

### Parameters

- **`accessKeyID`** (`string`): Your app's Access Key ID
- **`accessKeySecret`** (`string`): Your app's Access Key Secret

### Returns

- **`string`**: A message confirming initialization or describing the error.

---

## When to call it

Call it before `AppRegistry.registerComponent` in your entry file (`index.ts`):

```typescript
import { HEREConfig } from 'react-native-here-explore';
import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';

HEREConfig.initializeHereSDK(
  'YOUR_ACCESS_KEY_ID',
  'YOUR_ACCESS_KEY_SECRET'
);

AppRegistry.registerComponent(appName, () => App);
```

### Expo

Use `EXPO_PUBLIC_` environment variables:

```env
EXPO_PUBLIC_HERE_ACCESS_KEY_ID=YOUR_ACCESS_KEY_ID
EXPO_PUBLIC_HERE_ACCESS_KEY_SECRET=YOUR_ACCESS_KEY_SECRET
```

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
2. Register an app at [platform.here.com/admin/apps](https://platform.here.com/admin/apps)
3. In **Credentials** → **OAuth 2.0** → **Create credentials**
4. Download the credentials file to get your `ACCESS_KEY_ID` and `ACCESS_KEY_SECRET`

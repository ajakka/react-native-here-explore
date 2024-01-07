<h1 align="center">
    <strong>MapsHereConfig</strong>
</h1>

## Overview

The `MapsHereConfig` class is used to initialize the Here SDK in a React Native application. It's crucial for setting up mapping functionalities provided by Here Technologies.

## Methods

### MapsHereConfig.initializeHereSDK()

Initializes the Here SDK using the provided credentials. This is typically the first method you need to call before using any mapping functionalities from the SDK.

```typescript
function initializeHereSDK(
  accessKeyID: string,
  accessKeySecret: string
): string;
```

### Parameters

- **accessKeyID (`string`)**: Your application's Key ID
- **accessKeySecret (`string`)**: Your application's Key Secret

### Returns

- **`string`**: An optional string to either confirm the initialisation or error

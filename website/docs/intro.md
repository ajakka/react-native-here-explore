---
slug: /
sidebar_position: 1
---

# Introduction

**react-native-here-explore** is a React Native library that integrates the [HERE Maps SDK Explore Edition](https://www.here.com/products/mapping-and-location-technology/here-sdk) into your mobile app. Built from scratch with Kotlin and Swift using the latest React Native TurboModules architecture.

## Features

| Feature | Description |
|---|---|
| [Map](./components/map) | Render interactive HERE maps with multiple visual schemes |
| [Marker](./components/marker) | Place custom image markers at any coordinate |
| [Polyline](./components/polyline) | Draw solid or dashed lines between coordinates |
| [Polygon](./components/polygon) | Fill areas using coordinate lists or circles |
| [Arrow](./components/arrow) | Draw directional arrows along a path |
| [useRouting](./hooks/use-routing) | Calculate routes for 10 transport modes |

## Requirements

- React Native >= 0.73 (New Architecture / TurboModules)
- iOS 14+
- Android API 24+
- A [HERE Platform](https://platform.here.com) account with access credentials

## Quick Example

```tsx
import { Map, Marker } from 'react-native-here-explore';

export default function App() {
  return (
    <Map
      mapScheme="NORMAL_DAY"
      zoomValue={14}
      geoCoordinates={{ latitude: 48.8566, longitude: 2.3522 }}
    >
      <Marker
        geoCoordinates={{ latitude: 48.8566, longitude: 2.3522 }}
        image={require('./assets/pin.png')}
      />
    </Map>
  );
}
```

## Next Steps

1. [Install the library and HERE SDKs](./getting-started/installation)
2. [Initialize the HERE SDK](./getting-started/initialization)
3. [Render your first map](./components/map)

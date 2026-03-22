<h1 align="center">
    <strong>Map</strong>
</h1>

## Overview

`<Map />` is the main component for displaying HERE Maps. It accepts either `geoCoordinates` (center + zoom) or `geoBox` (bounding box) — not both. All other map elements (`Marker`, `Polyline`, `Polygon`, `Arrow`) must be rendered as children of this component.

## Properties

> Use either `geoCoordinates` **or** `geoBox` — they are mutually exclusive.

### `geoCoordinates` (GeoCoordinates)

- **Description:** The geographical coordinate used to center the map.
- **Type:** `GeoCoordinates` — `{ latitude: number; longitude: number; altitude?: number }`
- **Example:**
  ```jsx
  geoCoordinates={{ latitude: 48.8566, longitude: 2.3522 }}
  ```

### `zoomValue` (number)

- **Description:** Zoom level of the map. A higher value means a closer view. Only used with `geoCoordinates`.
- **Type:** `number`
- **Default value:** `8.0`
- **Example:**
  ```jsx
  zoomValue={14}
  ```

### `zoomKind` (ZoomKind)

- **Description:** How to interpret `zoomValue`. Leave as default unless you have a specific need.
- **Type:** `ZoomKind`
- **Default value:** `ZOOM_LEVEL`
- **Possible values:** `DISTANCE` | `ZOOM_LEVEL` | `SCALE`
- **Example:**
  ```jsx
  zoomKind="ZOOM_LEVEL"
  ```

### `geoBox` (GeoBox)

- **Description:** Two corners defining the visible map area. The map will fit to show both corners.
- **Type:** `GeoBox` — `{ southWestCorner: GeoCoordinates; northEastCorner: GeoCoordinates }`
- **Example:**
  ```jsx
  geoBox={{
    southWestCorner: { latitude: 33.819096, longitude: -7.320056 },
    northEastCorner: { latitude: 34.460004, longitude: -6.121828 },
  }}
  ```

### `rectangle2D` (Rectangle2D)

- **Description:** Optional pixel rectangle for the rendering area. Only used with `geoBox`.
- **Type:** `Rectangle2D` — `{ origin: { x: number; y: number }; size: { width: number; height: number } }`

### `mapScheme` (MapScheme)

- **Description:** The visual style of the map.
- **Type:** `MapScheme`
- **Default value:** `NORMAL_DAY`
- **Possible values:**
  - `NORMAL_DAY` — Standard street map, light
  - `NORMAL_NIGHT` — Standard street map, dark
  - `SATELLITE` — Satellite imagery
  - `HYBRID_DAY` — Satellite + labels, light
  - `HYBRID_NIGHT` — Satellite + labels, dark
  - `LITE_DAY` — Simplified map, light
  - `LITE_NIGHT` — Simplified map, dark
  - `LITE_HYBRID_DAY` — Simplified hybrid, light
  - `LITE_HYBRID_NIGHT` — Simplified hybrid, dark
  - `LOGISTICS_DAY` — Optimized for logistics/fleet

### `bearing` (number) | [Official Docs](https://www.here.com/docs/bundle/sdk-for-android-explore-developer-guide/page/topics/camera.html#rotate-the-camera)

- **Description:** Rotates the map. `0` = north up.
- **Type:** `number` (0–360)
- **Default value:** `0`

### `tilt` (number) | [Official Docs](https://www.here.com/docs/bundle/sdk-for-android-explore-developer-guide/page/topics/camera.html#tilt-the-camera)

- **Description:** Tilts the camera for a 3D perspective. Some cities show 3D buildings when supported.
- **Type:** `number` (0–70)
- **Default value:** `0`

### `watermarkStyle` (WatermarkStyle)

- **Description:** Color of the HERE watermark logo. Useful for custom map schemes.
- **Type:** `WatermarkStyle`
- **Possible values:** `DARK` | `LIGHT`

### `onMapTap` (Function)

- **Description:** Called when the user taps the map. Receives coordinates of the tapped point.
- **Type:** `(event: NativeSyntheticEvent<{ latitude: number; longitude: number; altitude: number }>) => void`
- **Example:**
  ```jsx
  onMapTap={({ nativeEvent }) => {
    console.log(nativeEvent.latitude, nativeEvent.longitude);
  }}
  ```

### `onMapLongPress` (Function)

- **Description:** Called when the user long-presses the map.
- **Type:** `(event: NativeSyntheticEvent<{ latitude: number; longitude: number; altitude: number }>) => void`
- **Example:**
  ```jsx
  onMapLongPress={({ nativeEvent }) => {
    console.log(nativeEvent.latitude, nativeEvent.longitude);
  }}
  ```

## Example Usage

```jsx
import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Map } from 'react-native-here-explore';

const MapExample = () => {
  const [tappedLocation, setTappedLocation] = useState(null);

  return (
    <View style={styles.container}>
      <Map
        geoCoordinates={{ latitude: 40.7128, longitude: -74.006 }}
        mapScheme="NORMAL_DAY"
        zoomValue={14}
        onMapTap={({ nativeEvent }) => {
          setTappedLocation({
            latitude: nativeEvent.latitude,
            longitude: nativeEvent.longitude,
          });
        }}
        style={styles.map}
      />
      {tappedLocation && (
        <Text style={styles.label}>
          {tappedLocation.latitude.toFixed(5)}, {tappedLocation.longitude.toFixed(5)}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { flex: 1 },
  label: {
    position: 'absolute',
    bottom: 20,
    alignSelf: 'center',
    backgroundColor: 'rgba(0,0,0,0.6)',
    color: 'white',
    padding: 8,
    borderRadius: 6,
  },
});

export default MapExample;
```

---
sidebar_position: 1
---

# Map

The `Map` component is the core of the library. It renders an interactive HERE map and acts as the container for all other map elements (`Marker`, `Polyline`, `Polygon`, `Arrow`).

## Import

```typescript
import { Map } from 'react-native-here-explore';
import type { MapProps } from 'react-native-here-explore';
```

## Usage

`Map` requires either `geoCoordinates` or `geoBox` — not both.

### Center on coordinates

```tsx
<Map
  mapScheme="NORMAL_DAY"
  zoomValue={12}
  geoCoordinates={{ latitude: 48.8566, longitude: 2.3522 }}
/>
```

### Fit a bounding box

```tsx
<Map
  mapScheme="HYBRID_DAY"
  geoBox={{
    southWestCorner: { latitude: 33.819096, longitude: -7.320056 },
    northEastCorner: { latitude: 34.460004, longitude: -6.121828 },
  }}
/>
```

### With children

```tsx
<Map
  mapScheme="NORMAL_NIGHT"
  zoomValue={14}
  geoCoordinates={{ latitude: 48.8566, longitude: 2.3522 }}
>
  <Marker
    geoCoordinates={{ latitude: 48.8566, longitude: 2.3522 }}
    image={require('./assets/pin.png')}
  />
</Map>
```

---

## Props

### Common props (both modes)

| Prop | Type | Required | Default | Description |
|---|---|---|---|---|
| `mapScheme` | [`MapScheme`](#mapscheme) | Yes | — | Visual style of the map |
| `bearing` | `number` | No | `0` | Rotation in degrees (0–360) |
| `tilt` | `number` | No | `0` | 3D tilt angle (0–70). Some cities show 3D buildings when supported |
| `watermarkStyle` | `'DARK' \| 'LIGHT'` | No | — | Color of the HERE watermark logo |
| `onMapTap` | `function` | No | — | Fired on a single tap. Receives `{ latitude, longitude, altitude }` |
| `onMapLongPress` | `function` | No | — | Fired on a long press. Receives `{ latitude, longitude, altitude }` |
| `style` | `StyleProp<ViewStyle>` | No | `{ flex: 1 }` | React Native view style |

### Via `geoCoordinates`

| Prop | Type | Required | Default | Description |
|---|---|---|---|---|
| `geoCoordinates` | [`GeoCoordinates`](../api/types#geocoordinates) | Yes | — | Map center point |
| `zoomValue` | `number` | No | `8.0` | Zoom level. Higher values zoom in closer |
| `zoomKind` | [`ZoomKind`](#zoomkind) | No | `'ZOOM_LEVEL'` | How to interpret `zoomValue` |

### Via `geoBox`

| Prop | Type | Required | Default | Description |
|---|---|---|---|---|
| `geoBox` | [`GeoBox`](../api/types#geobox) | Yes | — | Bounding box with `southWestCorner` and `northEastCorner` |
| `rectangle2D` | [`Rectangle2D`](../api/types#rectangle2d) | No | — | Optional pixel rectangle for rendering area |

---

## Events

### `onMapTap`

```tsx
<Map
  geoCoordinates={{ latitude: 48.8566, longitude: 2.3522 }}
  mapScheme="NORMAL_DAY"
  onMapTap={({ nativeEvent }) => {
    console.log(nativeEvent.latitude, nativeEvent.longitude);
  }}
/>
```

### `onMapLongPress`

```tsx
<Map
  geoCoordinates={{ latitude: 48.8566, longitude: 2.3522 }}
  mapScheme="NORMAL_DAY"
  onMapLongPress={({ nativeEvent }) => {
    console.log('Long pressed at:', nativeEvent.latitude, nativeEvent.longitude);
  }}
/>
```

---

## MapScheme

Controls the visual style of the map.

| Value | Description |
|---|---|
| `'NORMAL_DAY'` | Standard street map, light theme |
| `'NORMAL_NIGHT'` | Standard street map, dark theme |
| `'SATELLITE'` | Satellite imagery only |
| `'HYBRID_DAY'` | Satellite imagery with street labels, light |
| `'HYBRID_NIGHT'` | Satellite imagery with street labels, dark |
| `'LITE_DAY'` | Simplified street map, light |
| `'LITE_NIGHT'` | Simplified street map, dark |
| `'LITE_HYBRID_DAY'` | Simplified hybrid, light |
| `'LITE_HYBRID_NIGHT'` | Simplified hybrid, dark |
| `'LOGISTICS_DAY'` | Optimized for logistics/fleet use cases |

## ZoomKind

Controls how the `zoomValue` is interpreted.

| Value | Description |
|---|---|
| `'ZOOM_LEVEL'` | Standard zoom level (default). Higher = closer |
| `'DISTANCE'` | Distance from camera to target in meters |
| `'SCALE'` | Map scale ratio |

:::tip
Leave `zoomKind` as the default `'ZOOM_LEVEL'` unless you have a specific need for distance- or scale-based zoom.
:::

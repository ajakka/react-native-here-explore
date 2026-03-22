---
sidebar_position: 2
---

# Marker

The `Marker` component places a custom image at a geographic coordinate on the map. Must be rendered as a child of [`<Map>`](./map).

## Import

```typescript
import { Marker } from 'react-native-here-explore';
import type { MarkerProps } from 'react-native-here-explore';
```

## Usage

### Basic marker

```tsx
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
```

### Remote image

```tsx
<Marker
  geoCoordinates={{ latitude: 48.8566, longitude: 2.3522 }}
  image={{ uri: 'https://example.com/marker.png' }}
/>
```

### Scaled marker

```tsx
<Marker
  geoCoordinates={{ latitude: 48.8566, longitude: 2.3522 }}
  image={require('./assets/pin.png')}
  scale={1.5}
/>
```

### Custom size and anchor

```tsx
<Marker
  geoCoordinates={{ latitude: 48.8566, longitude: 2.3522 }}
  image={require('./assets/pin.png')}
  size={{ width: 40, height: 56 }}
  anchor={{ horizontal: 0.5, vertical: 1.0 }}
/>
```

---

## Props

| Prop | Type | Required | Default | Description |
|---|---|---|---|---|
| `geoCoordinates` | [`GeoCoordinates`](../api/types#geocoordinates) | Yes | — | Position of the marker on the map |
| `image` | `ImageURISource` | Yes | — | Marker image. Accepts `require()` for local assets or `{ uri: '...' }` for remote URLs |
| `scale` | `number` | No | — | Scale multiplier. `> 1` enlarges, `< 1` shrinks |
| `size` | `{ width: number; height: number }` | No | — | Explicitly override the rendered image dimensions in pixels |
| `anchor` | `{ horizontal?: number; vertical?: number }` | No | — | Anchor point relative to the image (0–1). `{ horizontal: 0.5, vertical: 0.5 }` = center |

---

## Anchor Point

The anchor determines which part of the image aligns with the `geoCoordinates` on the map.

| Anchor | Meaning |
|---|---|
| `{ horizontal: 0, vertical: 0 }` | Top-left corner |
| `{ horizontal: 0.5, vertical: 0.5 }` | Center of image (default behavior) |
| `{ horizontal: 0.5, vertical: 1.0 }` | Bottom-center (typical for pin icons) |
| `{ horizontal: 1, vertical: 1 }` | Bottom-right corner |

For a typical pin icon that points to the ground, use `{ horizontal: 0.5, vertical: 1.0 }`.

See the [HERE documentation on anchored markers](https://www.here.com/docs/bundle/sdk-for-android-explore-developer-guide/page/topics/map-items.html#anchored-poi-markers) for more detail.

---

## Notes

- If the image cannot be resolved (e.g. the asset doesn't exist), the marker renders nothing.
- `scale` and `size` are independent — `size` overrides the image dimensions directly, while `scale` multiplies them.

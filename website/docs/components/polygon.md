---
sidebar_position: 4
---

# Polygon

The `Polygon` component draws a filled area on the map. You can define the shape either as a list of coordinates or as a circle. Must be rendered as a child of [`<Map>`](./map).

## Import

```typescript
import { Polygon } from 'react-native-here-explore';
import type { PolygonProps } from 'react-native-here-explore';
```

## Usage

### From coordinates

```tsx
<Map mapScheme="NORMAL_DAY" geoCoordinates={{ latitude: 34.0, longitude: -6.8 }} zoomValue={10}>
  <Polygon
    geoPolyline={[
      { latitude: 33.819096, longitude: -7.320056 },
      { latitude: 34.460004, longitude: -7.320056 },
      { latitude: 34.460004, longitude: -6.121828 },
      { latitude: 33.819096, longitude: -6.121828 },
    ]}
    color="rgba(0, 120, 255, 0.3)"
    outlineColor="#0078FF"
    outlineWidth={2}
  />
</Map>
```

### Circle polygon

```tsx
<Polygon
  geoCircle={{
    center: { latitude: 33.819096, longitude: -7.320056 },
    radiusInMeters: 5000,
  }}
  color="rgba(255, 100, 0, 0.25)"
  outlineColor="#FF6400"
  outlineWidth={3}
/>
```

### Highlight a zone

```tsx
<Polygon
  geoPolyline={zoneCoordinates}
  color="rgba(76, 175, 80, 0.4)"
  outlineColor="#388E3C"
  outlineWidth={1}
/>
```

---

## Props

### Common props (both modes)

| Prop | Type | Required | Default | Description |
|---|---|---|---|---|
| `color` | `ColorValue` | No | `black` | Fill color of the polygon |
| `outlineColor` | `ColorValue` | No | — | Border color |
| `outlineWidth` | `number` | No | `0` | Border thickness in pixels |

### Via `geoPolyline`

| Prop | Type | Required | Description |
|---|---|---|---|
| `geoPolyline` | [`GeoPolyline`](../api/types#geopolyline) | Yes | Array of coordinates forming the polygon boundary. The shape is closed automatically |

### Via `geoCircle`

| Prop | Type | Required | Description |
|---|---|---|---|
| `geoCircle` | [`GeoCircle`](../api/types#geocircle) | Yes | Center coordinate and radius in meters |

:::note
Use either `geoPolyline` or `geoCircle` — not both.
:::

---

## Color formats

All color props accept any React Native `ColorValue`:

```
"green"                       // named color
"#4CAF50"                     // hex
"rgba(76, 175, 80, 0.4)"      // rgba with transparency
"#4CAF5066"                   // hex with alpha
```

Using a semi-transparent fill color (`rgba` with alpha < 1) lets the map show through the polygon, which is usually the desired effect.

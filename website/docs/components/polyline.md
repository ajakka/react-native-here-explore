---
sidebar_position: 3
---

# Polyline

The `Polyline` component draws a line connecting a sequence of geographic coordinates. Supports two styles: **solid** and **dashed**. Must be rendered as a child of [`<Map>`](./map).

## Import

```typescript
import { Polyline } from 'react-native-here-explore';
import type { PolylineProps } from 'react-native-here-explore';
```

## Usage

### Solid line

```tsx
<Map mapScheme="NORMAL_DAY" geoCoordinates={{ latitude: 48.85, longitude: 2.35 }} zoomValue={12}>
  <Polyline
    lineType="SOLID"
    geoPolyline={[
      { latitude: 48.85, longitude: 2.30 },
      { latitude: 48.85, longitude: 2.35 },
      { latitude: 48.87, longitude: 2.40 },
    ]}
    lineColor="#1A73E8"
    lineWidth={6}
    outlineColor="#0D47A1"
    outlineWidth={2}
  />
</Map>
```

### Dashed line

```tsx
<Polyline
  lineType="DASH"
  geoPolyline={[
    { latitude: 48.85, longitude: 2.30 },
    { latitude: 48.87, longitude: 2.40 },
  ]}
  lineColor="#FF5722"
  lineWidth={4}
  gapLength={6}
  lineLength={10}
  gapColor="rgba(0,0,0,0)"
/>
```

### Route visualization

```tsx
<Polyline
  lineType="SOLID"
  geoPolyline={route.vertices}
  lineColor="#00BCD4"
  lineWidth={8}
  lineWidthUnit="PIXELS"
  capShape="ROUND"
/>
```

---

## Props

### Base props (both `SOLID` and `DASH`)

| Prop | Type | Required | Default | Description |
|---|---|---|---|---|
| `geoPolyline` | [`GeoPolyline`](../api/types#geopolyline) | Yes | — | Array of coordinates. Minimum 2 points required |
| `lineType` | `'SOLID' \| 'DASH'` | Yes | — | Line style |
| `lineWidth` | `number` | No | `8.0` | Line thickness |
| `lineWidthUnit` | [`LineWidthUnit`](#linewidthunit) | No | `'PIXELS'` | Unit for `lineWidth` |
| `lineColor` | `ColorValue` | No | `'white'` | Line color. Accepts named colors, hex, or rgba |

### Solid line props (`lineType="SOLID"`)

| Prop | Type | Required | Default | Description |
|---|---|---|---|---|
| `outlineWidth` | `number` | No | `8.0` | Width of the border drawn around the line |
| `outlineColor` | `ColorValue` | No | `'white'` | Color of the outline |
| `capShape` | [`LineCap`](#linecap) | No | — | Style of line endpoints |

### Dashed line props (`lineType="DASH"`)

| Prop | Type | Required | Default | Description |
|---|---|---|---|---|
| `gapLength` | `number` | Yes | — | Length of the gap between dashes |
| `lineLength` | `number` | No | — | Length of each dash |
| `gapColor` | `ColorValue` | No | — | Color of the gap between dashes |

---

## LineWidthUnit

| Value | Description |
|---|---|
| `'PIXELS'` | Screen pixels (default) |
| `'DENSITY_INDEPENDENT_PIXELS'` | DIP/DP — scales with screen density |
| `'METERS'` | Physical meters on the ground |

## LineCap

Controls the shape of the line endpoints (solid lines only).

| Value | Description |
|---|---|
| `'ROUND'` | Rounded ends |
| `'SQUARE'` | Square ends extending past the endpoint |
| `'BUTT'` | Flat ends exactly at the endpoint |

---

## Color formats

All color props accept any React Native `ColorValue`:

```
"white"                   // named color
"#FF5722"                 // hex (6-digit)
"#FF5722FF"               // hex with alpha (8-digit)
"rgba(255, 87, 34, 0.8)"  // rgba
```

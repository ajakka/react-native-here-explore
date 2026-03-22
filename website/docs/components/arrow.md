---
sidebar_position: 5
---

# Arrow

The `Arrow` component draws a directional arrow along a path of geographic coordinates. Useful for indicating route directions or movement. Must be rendered as a child of [`<Map>`](./map).

## Import

```typescript
import { Arrow } from 'react-native-here-explore';
import type { ArrowProps } from 'react-native-here-explore';
```

## Usage

### Basic arrow

```tsx
<Map mapScheme="NORMAL_DAY" geoCoordinates={{ latitude: 48.85, longitude: 2.35 }} zoomValue={13}>
  <Arrow
    geoPolyline={[
      { latitude: 48.84, longitude: 2.33 },
      { latitude: 48.85, longitude: 2.35 },
      { latitude: 48.86, longitude: 2.38 },
    ]}
    lineColor="#E91E63"
    lineWidth={10}
  />
</Map>
```

### Route arrow with routing hook

```tsx
import { useRouting, Arrow, Map } from 'react-native-here-explore';

function RouteMap() {
  const { route, calculate } = useRouting({
    waypoints: [
      { latitude: 48.84, longitude: 2.33 },
      { latitude: 48.87, longitude: 2.40 },
    ],
    routeOption: 'CarOptions',
  });

  return (
    <Map mapScheme="NORMAL_DAY" geoCoordinates={{ latitude: 48.85, longitude: 2.35 }} zoomValue={12}>
      {route && (
        <Arrow
          geoPolyline={route.vertices}
          lineColor="#1A73E8"
          lineWidth={8}
        />
      )}
    </Map>
  );
}
```

---

## Props

| Prop | Type | Required | Default | Description |
|---|---|---|---|---|
| `geoPolyline` | [`GeoPolyline`](../api/types#geopolyline) | Yes | — | Array of coordinates defining the arrow path. Minimum 2 points required |
| `lineColor` | `ColorValue` | No | — | Color of the arrow. Accepts named colors, hex, or rgba |
| `lineWidth` | `number` | No | — | Width/thickness of the arrow |

---

## Color formats

```
"blue"                    // named color
"#1A73E8"                 // hex
"rgba(26, 115, 232, 0.9)" // rgba
```

---

## Difference from Polyline

| Feature | Arrow | Polyline |
|---|---|---|
| Arrowhead | Yes | No |
| Line style | Solid only | Solid or Dashed |
| Outline | No | Yes (solid mode) |
| Cap shape | — | Configurable |

Use `Arrow` when you need to visually indicate direction. Use [`Polyline`](./polyline) for general-purpose lines without arrowheads.

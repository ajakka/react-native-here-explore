---
sidebar_position: 3
---

# Types

All types are exported from `react-native-here-explore` and can be imported as named types.

```typescript
import type {
  GeoCoordinates,
  GeoPolyline,
  GeoBox,
  GeoCircle,
  RouteOption,
  RouteResultType,
  OnRouteCalculated,
  MapScheme,
  ZoomKind,
  WatermarkStyle,
  LineCap,
  LineWidthUnit,
  Point2D,
  Size2D,
  Rectangle2D,
} from 'react-native-here-explore';
```

---

## Coordinate Types

### `GeoCoordinates`

A geographic point with latitude, longitude, and optional altitude.

```typescript
interface GeoCoordinates {
  latitude: number;
  longitude: number;
  altitude?: number;
}
```

**Example:**
```typescript
const paris: GeoCoordinates = { latitude: 48.8566, longitude: 2.3522 };
const withAltitude: GeoCoordinates = { latitude: 48.8566, longitude: 2.3522, altitude: 35 };
```

---

### `GeoPolyline`

An ordered array of `GeoCoordinates`. Used to define paths, polygon boundaries, and waypoints.

```typescript
type GeoPolyline = GeoCoordinates[];
```

**Example:**
```typescript
const path: GeoPolyline = [
  { latitude: 48.8566, longitude: 2.3522 },
  { latitude: 49.0, longitude: 2.5 },
  { latitude: 51.5074, longitude: -0.1278 },
];
```

---

### `GeoBox`

A rectangular area defined by two corners.

```typescript
interface GeoBox {
  southWestCorner: GeoCoordinates;
  northEastCorner: GeoCoordinates;
}
```

**Example:**
```typescript
const morocco: GeoBox = {
  southWestCorner: { latitude: 27.66, longitude: -13.17 },
  northEastCorner: { latitude: 35.92, longitude: -0.99 },
};
```

---

### `GeoCircle`

A circular area defined by a center point and a radius.

```typescript
interface GeoCircle {
  center: GeoCoordinates;
  radiusInMeters: number;
}
```

**Example:**
```typescript
const area: GeoCircle = {
  center: { latitude: 48.8566, longitude: 2.3522 },
  radiusInMeters: 1000,  // 1 km radius
};
```

---

## 2D Geometry Types

### `Point2D`

A 2D point in screen coordinates.

```typescript
interface Point2D {
  x: number;
  y: number;
}
```

---

### `Size2D`

Width and height dimensions.

```typescript
interface Size2D {
  width: number;
  height: number;
}
```

---

### `Rectangle2D`

A rectangle defined by an origin point and a size.

```typescript
interface Rectangle2D {
  origin: Point2D;
  size: Size2D;
}
```

---

## Map Types

### `MapScheme`

Visual theme for the map.

```typescript
type MapScheme =
  | 'NORMAL_DAY'
  | 'NORMAL_NIGHT'
  | 'SATELLITE'
  | 'HYBRID_DAY'
  | 'HYBRID_NIGHT'
  | 'LITE_DAY'
  | 'LITE_NIGHT'
  | 'LITE_HYBRID_DAY'
  | 'LITE_HYBRID_NIGHT'
  | 'LOGISTICS_DAY';
```

---

### `ZoomKind`

How to interpret the zoom value on a `Map` component.

```typescript
type ZoomKind = 'DISTANCE' | 'ZOOM_LEVEL' | 'SCALE';
```

---

### `WatermarkStyle`

Color of the HERE watermark logo.

```typescript
type WatermarkStyle = 'DARK' | 'LIGHT';
```

---

## Drawing Types

### `LineCap`

Shape of line endpoints for solid polylines.

```typescript
type LineCap = 'ROUND' | 'SQUARE' | 'BUTT';
```

---

### `LineWidthUnit`

Unit used for `lineWidth` on polylines.

```typescript
type LineWidthUnit = 'PIXELS' | 'DENSITY_INDEPENDENT_PIXELS' | 'METERS';
```

---

## Routing Types

### `RouteOption`

Transport mode for route calculation.

```typescript
type RouteOption =
  | 'CarOptions'
  | 'PedestrianOptions'
  | 'TruckOptions'
  | 'ScooterOptions'
  | 'BicycleOptions'
  | 'TaxiOptions'
  | 'EVCarOptions'
  | 'EVTruckOptions'
  | 'BusOptions'
  | 'PrivateBusOptions';
```

---

### `RouteResultType`

A single calculated route.

```typescript
interface RouteResultType {
  vertices: GeoPolyline;           // coordinates forming the route path
  routeHandle?: string;            // optional internal reference handle
  durationInSeconds: number;       // estimated travel time
  trafficDelayInSeconds: number;   // additional delay due to traffic
  lengthInMeters: number;          // total route distance
}
```

**Example usage:**
```typescript
const durationMin = Math.round(route.durationInSeconds / 60);
const delayMin = Math.round(route.trafficDelayInSeconds / 60);
const distanceKm = (route.lengthInMeters / 1000).toFixed(1);

console.log(`${distanceKm} km · ${durationMin} min (${delayMin} min delay)`);
```

---

### `OnRouteCalculated`

The result returned by [`calculateRoute`](./calculate-route).

```typescript
interface OnRouteCalculated {
  routingError?: number;      // defined if the calculation failed
  routes: RouteResultType[];  // array of route alternatives
}
```

If `routingError` is `undefined`, the calculation succeeded and `routes` contains at least one result.

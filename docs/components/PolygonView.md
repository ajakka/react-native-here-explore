<h1 align="center">
    <strong>Polygon</strong>
</h1>

## Overview

`<Polygon />` draws a filled area on the map. You can define the shape as a list of coordinates or as a circle. Must be rendered as a child of `<Map />`.

> Use either `geoPolyline` **or** `geoCircle` — they are mutually exclusive.

## Properties

### Common Properties

### `color` (ColorValue)

- **Description:** Fill color of the polygon.
- **Type:** `ColorValue`
- **Possible values:** Named colors, hex, rgba

### `outlineColor` (ColorValue)

- **Description:** Color of the polygon's border.
- **Type:** `ColorValue`

### `outlineWidth` (number)

- **Description:** Thickness of the border.
- **Type:** `number`
- **Default value:** `0`

---

### For polygons defined by coordinates

### `geoPolyline` (GeoPolyline) - REQUIRED

- **Description:** List of coordinates forming the polygon boundary. The shape is closed automatically.
- **Type:** `GeoPolyline` — `Array<{ latitude: number; longitude: number; altitude?: number }>`
- **Example:**
  ```jsx
  geoPolyline={[
    { latitude: 33.819096, longitude: -7.320056 },
    { latitude: 34.460004, longitude: -7.320056 },
    { latitude: 34.460004, longitude: -6.121828 },
    { latitude: 33.819096, longitude: -6.121828 },
  ]}
  ```

---

### For circular polygons

### `geoCircle` (GeoCircle) - REQUIRED

- **Description:** Defines a circular area by center coordinate and radius.
- **Type:** `GeoCircle` — `{ center: GeoCoordinates; radiusInMeters: number }`
- **Example:**
  ```jsx
  geoCircle={{
    center: { latitude: 33.819096, longitude: -7.320056 },
    radiusInMeters: 5000,
  }}
  ```

---

## Example Usage

```jsx
import React from 'react';
import { Map, Polygon } from 'react-native-here-explore';

const App = () => {
  return (
    <Map
      geoCoordinates={{ latitude: 40.7128, longitude: -74.006 }}
      mapScheme="NORMAL_DAY"
      zoomValue={12}
    >
      {/* Polygon from coordinates */}
      <Polygon
        geoPolyline={[
          { latitude: 40.70, longitude: -74.02 },
          { latitude: 40.72, longitude: -74.02 },
          { latitude: 40.72, longitude: -73.99 },
          { latitude: 40.70, longitude: -73.99 },
        ]}
        color="rgba(255, 0, 0, 0.3)"
        outlineColor="red"
        outlineWidth={2}
      />

      {/* Circle polygon */}
      <Polygon
        geoCircle={{
          center: { latitude: 40.7128, longitude: -74.006 },
          radiusInMeters: 500,
        }}
        color="rgba(0, 120, 255, 0.25)"
        outlineColor="#0078FF"
        outlineWidth={2}
      />
    </Map>
  );
};

export default App;
```

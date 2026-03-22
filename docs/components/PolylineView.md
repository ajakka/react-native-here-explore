<h1 align="center">
    <strong>Polyline</strong>
</h1>

## Overview

`<Polyline />` draws a line connecting a series of geographical coordinates on the map. Supports two styles: **solid** and **dashed**. Must be rendered as a child of `<Map />`.

## Properties

### `geoPolyline` (GeoPolyline) - REQUIRED

- **Description:** The coordinates used to draw the polyline. At least two coordinates are required before a line is displayed.
- **Type:** `GeoPolyline` — `Array<{ latitude: number; longitude: number; altitude?: number }>`
- **Example:**
  ```jsx
  geoPolyline={[
    { latitude: 48.85, longitude: 2.30 },
    { latitude: 48.87, longitude: 2.40 },
  ]}
  ```

### `lineType` (LineType) - REQUIRED

- **Description:** Controls the line style.
- **Type:** `'SOLID' | 'DASH'`
- **Example:**
  ```jsx
  lineType="SOLID"
  ```

### `lineColor` (ColorValue)

- **Description:** Color of the line.
- **Type:** `ColorValue`
- **Default value:** `white`
- **Possible values:** Named colors (`'red'`), hex (`'#FF0000'`), rgba (`'rgba(255,0,0,0.8)'`)

### `lineWidth` (number)

- **Description:** Thickness of the line.
- **Type:** `number`
- **Default value:** `8.0`

### `lineWidthUnit` (LineWidthUnit)

- **Description:** Unit used for `lineWidth`.
- **Type:** `LineWidthUnit`
- **Default value:** `PIXELS`
- **Possible values:** `PIXELS` | `DENSITY_INDEPENDENT_PIXELS` | `METERS`

---

### Additional props for `lineType="SOLID"`

### `outlineWidth` (number)

- **Description:** Width of the border drawn around the line.
- **Default value:** `8.0`

### `outlineColor` (ColorValue)

- **Description:** Color of the line outline.
- **Default value:** `white`

### `capShape` (LineCap)

- **Description:** Shape of the line endpoints.
- **Possible values:** `ROUND` | `SQUARE` | `BUTT`

---

### Additional props for `lineType="DASH"`

### `gapLength` (number) - REQUIRED for DASH

- **Description:** Length of the gap between dashes.

### `lineLength` (number)

- **Description:** Length of each dash segment.

### `gapColor` (ColorValue)

- **Description:** Color of the gaps between dashes.

---

## Example Usage

```jsx
import React from 'react';
import { Map, Polyline } from 'react-native-here-explore';

const App = () => {
  return (
    <Map
      geoCoordinates={{ latitude: 48.85, longitude: 2.35 }}
      mapScheme="NORMAL_DAY"
      zoomValue={13}
    >
      {/* Solid line */}
      <Polyline
        geoPolyline={[
          { latitude: 48.84, longitude: 2.33 },
          { latitude: 48.86, longitude: 2.38 },
        ]}
        lineType="SOLID"
        lineColor="#1A73E8"
        lineWidth={6}
        outlineColor="#0D47A1"
        outlineWidth={2}
        capShape="ROUND"
      />

      {/* Dashed line */}
      <Polyline
        geoPolyline={[
          { latitude: 48.84, longitude: 2.38 },
          { latitude: 48.86, longitude: 2.43 },
        ]}
        lineType="DASH"
        lineColor="#FF5722"
        lineWidth={4}
        gapLength={6}
        lineLength={10}
      />
    </Map>
  );
};

export default App;
```

<h1 align="center">
    <strong>Arrow</strong>
</h1>

## Overview

`<Arrow />` draws a directional arrow along a path of geographic coordinates on the map. Useful for indicating routes or movement direction. Must be rendered as a child of `<Map />`.

## Properties

### `geoPolyline` (GeoPolyline) - REQUIRED

- **Description:** List of coordinates defining the arrow path. At least two coordinates are required.
- **Type:** `GeoPolyline` — `Array<{ latitude: number; longitude: number; altitude?: number }>`
- **Example:**
  ```jsx
  geoPolyline={[
    { latitude: 33.819096, longitude: -7.320056 },
    { latitude: 34.460004, longitude: -6.121828 },
  ]}
  ```

### `lineColor` (ColorValue)

- **Description:** Color of the arrow.
- **Type:** `ColorValue`
- **Possible values:** Named colors (`'green'`), hex (`'#00FF00'`), rgba (`'rgba(0,255,0,0.8)'`)

### `lineWidth` (number)

- **Description:** Width/thickness of the arrow.
- **Type:** `number`

## Example Usage

```jsx
import React from 'react';
import { Map, Arrow } from 'react-native-here-explore';

const App = () => {
  return (
    <Map
      geoCoordinates={{ latitude: 40.7128, longitude: -74.006 }}
      mapScheme="NORMAL_DAY"
      zoomValue={13}
    >
      <Arrow
        geoPolyline={[
          { latitude: 40.7128, longitude: -74.006 },
          { latitude: 40.7158, longitude: -74.016 },
        ]}
        lineColor="green"
        lineWidth={8}
      />
    </Map>
  );
};

export default App;
```

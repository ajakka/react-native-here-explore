<h1 align="center">
    <strong>Polygon</strong>
</h1>

## Overview

`<Polygon />` is a React Native component designed for drawing polygons on the `<Map />` map component. This component allows for the visualization of areas by connecting a series of geographical coordinates to form a closed shape or by defining a circular area. The `Polygon` component is used as a child of the `Map` component to add area information over the map, such as zones, regions, or circles.

## Properties

### Common Properties

- **`color` (ColorValue):** Specifies the fill color of the polygon.
- **`outlineColor` (ColorValue):** Specifies the color of the polygon's outline.
- **`outlineWidth` (number):** Sets the thickness of the polygon's outline.

### For Polygons Defined by Coordinates

#### `geoPolyline` (GeoPolyline) - REQUIRED

- **Description:** List of coordinates used to draw the polygon. The coordinates should form a closed loop.
- **Type:** `GeoPolyline` (Array of Objects with `latitude` and `longitude` properties)
- **Example:**
  ```jsx
  geoPolyline={[
       { latitude: 33.819096, longitude: -7.320056 },
       { latitude: 34.460004, longitude: -6.121828 },
  ]}
  ```

### For Circular Polygons

#### `geoCircle` (GeoCircle) - REQUIRED

- **Description:** Defines a circular area to be drawn as a polygon, specified by a center point and radius.
- **Type:** `GeoCircle` (Object with `center` and `radiusInMeters` properties)
- **Example:**
  ```jsx
  geoCircle={{
       center: { latitude: 33.819096, longitude: -7.320056 },
       radiusInMeters: 40
  }}
  ```

## Example Usage

Here's how you might use the `Polygon` to draw a polygon:

```jsx
import React from 'react';
import { Map, Polygon } from 'react-native-maps-here';

const App = () => {
  return (
    <Map
      coordinates={{ lat: 40.7128, lon: -74.006 }} // Coordinates for New York City
      mapScheme="NORMAL_DAY"
      zoomValue={10}
    >
      <Polygon
        geoPolyline={[
          { latitude: 40.7128, longitude: -74.006 },
          { latitude: 40.7158, longitude: -74.016 },
          // More points to form a closed shape
        ]}
        color="rgba(255, 0, 0, 0.5)"
        outlineColor="blue"
        outlineWidth={2}
      />
    </Map>
  );
};

export default App;
```

This example demonstrates drawing a polygon with a semi-transparent red fill and a blue outline. Adjust the `geoPolyline` or `geoCircle`, `color`, `outlineColor`, and `outlineWidth` props as needed to customize the polygon's appearance.

Remember to review the prop values and defaults to ensure the polygon appears as expected on your map. Happy mapping!

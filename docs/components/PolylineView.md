<h1 align="center">
    <strong>Polyline</strong>
</h1>

## Overview

`<Polyline />` is a React Native component designed for drawing polylines within the `<Maps />` map component. It provides a way to visualize paths or routes by connecting a series of geographical coordinates with a line. The `Polyline` component is used as a child of the `Maps` component to add path information over the map, such as routes or boundaries.

## Properties

### `geoPolyline` (GeoPolyline) - REQUIRED

- **Description:** The coordinates used to draw the polyline. At least two coordinates are required before a line is displayed, otherwise nothing will show up.
- **Type:** `GeoPolyline` (Array of Objects with `latitude`, `longitude`, and optionally `altitude` properties)
- **Example:**
  ```jsx
  geoPolyline={[
       { latitude: 99.00990, longitude: 9.00990, altitude: 1.3 },
       { latitude: 99.00990, longitude: 9.00990, altitude: 1.3 },
  ]}
  ```

### `lineColor` (ColorValue)

- **Description:** Specifies the color of the polyline. You can use color names, hex codes, or rgba values.
- **Type:** `ColorValue`
- **Default value:** `white`
- **Possible values:** Color names like `white`, `black`, `red`, etc., RGBA values like `rgba(255, 255, 255, 1)`, or hex codes like `#FFFFFFFF`.
- **Example:**
  ```jsx
  lineColor = '#0F0F0F';
  ```

### `lineWidth` (number)

- **Description:** Sets the thickness of the polyline. The value represents the width of the line.
- **Type:** `number`
- **Default value:** `8.0`
- **Example:**
  ```jsx
  lineWidth={8.0}
  ```

### `lineType` (LineType)

- **Description:** Controls the line type, allowing for solid or dashed lines.
- **Type:** `LineType`
- **Possible values:**
  - `SOLID`
  - `DASH`
- **Example:**
  ```jsx
  lineType = 'DASH';
  ```

For dashed lines, additional properties include `lineLength`, `gapLength`, and `gapColor`.

### Additional Properties for Dashed Lines

- **`lineLength` (number):** Controls how tall is the line.
- **`gapLength` (number):** Controls how tall is the gap.
- **`gapColor` (ColorValue):** Changes the gap color.

## Example Usage

Here's how you might use the `Polyline` to draw a simple line:

```jsx
import React from 'react';
import { Map, Polyline } from 'react-native-maps-here';

const App = () => {
  return (
    <Map
      coordinates={{ lat: 40.7128, lon: -74.006 }} // Coordinates for New York City
      mapScheme="NORMAL_DAY"
      zoomValue={10}
    >
      <Polyline
        geoPolyline={[
          { latitude: 40.7128, longitude: -74.006, altitude: 1.3 },
          { latitude: 40.7158, longitude: -74.016, altitude: 1.3 },
        ]}
        lineColor="red"
        lineWidth={5}
        lineType="SOLID"
      />
    </Map>
  );
};

export default App;
```

In this example, `Polyline` is used to draw a red solid line between two points in New York City on the map. You can modify the `geoPolyline`, `lineColor`, `lineWidth`, and `lineType` props to customize the polyline's appearance and path.

Remember to review the prop values and defaults to ensure the polyline appears as expected on your map. Happy mapping!

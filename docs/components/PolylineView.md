<h1 align="center">
    <strong>PolylineView</strong>
</h1>

## Overview

`<PolylineView />` is a React Native component designed for drawing polylines within the `<MapsHereView />` map component. It provides a way to visualize paths or routes by connecting a series of geographical coordinates with a line. The `PolylineView` component is used as a child of the `MapsHereView` component to add path information over the map, such as routes or boundaries.

## Properties

### `coordinates` (Coordinates[]) - REQUIRED

- **Description:** The array of geographical coordinates used to draw the polyline. At least two coordinates are required to display a line.
- **Type:** `Coordinates[]` (Array of Objects with `lat` and `lon` properties)
- **Example:**
  ```jsx
  coordinates={[
       { lat: 99.00990, lon: 9.00990 },
       { lat: 99.00990, lon: 9.00990 },
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

### `lineWidthUnit` (LineWidthUnit)

- **Description:** Determines the unit used for the line thickness. However, due to a current issue, this property is fixed to `PIXELS`.
- **Type:** `LineWidthUnit`
- **Default value:** `PIXELS`
- **Possible values:**
  - `PIXELS`
  - `DENSITY_INDEPENDENT_PIXELS`
  - `METERS`
- **Example:**
  ```jsx
  lineWidthUnit = 'PIXELS';
  ```
- **Note:** Currently, due to a known issue, this property is restricted to `PIXELS` and cannot be changed.

## Example Usage

Here's how you might use the `PolylineView` to draw a simple line:

```jsx
import React from 'react';
import { MapsHereView, PolylineView } from 'react-native-maps-here';

const App = () => {
  return (
    <MapsHereView
      coordinates={{ lat: 40.7128, lon: -74.006 }} // Coordinates for New York City
      mapScheme="NORMAL_DAY"
      zoomValue={10}
    >
      <PolylineView
        coordinates={[
          { lat: 40.7128, lon: -74.006 },
          { lat: 40.7158, lon: -74.016 },
        ]}
        lineColor="red"
        lineWidth={5}
      />
    </MapsHereView>
  );
};

export default App;
```

In this example, `PolylineView` is used to draw a red line between two points in New York City on the map. You can modify the `coordinates`, `lineColor`, and `lineWidth` props to customize the polyline's appearance and path.

---

Remember to review the prop values and defaults to ensure the polyline appears as expected on your map. Happy mapping!

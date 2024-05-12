<h1 align="center">
    <strong>RoutingView</strong>
</h1>

## Overview

`<Routing />` is a React Native component designed for drawing paths within the `<Maps />` map component. It provides a way to visualize paths or routes by connecting a series of geographical coordinates with a line from Point-A to Point-B. The `Routing` component is used as a child of the `Maps` component to add path information over the map, such as routes or boundaries.

## Properties

### `originCoordinates` (GeoPolyline) - REQUIRED

- **Description:** The coordinates used to draw the path. At least two coordinates are required before a line is displayed, otherwise nothing will show up.
- **Type:** `GeoPolyline` (Array of Objects with `latitude`, `longitude`, and optionally `altitude` properties)
- **Example:**
  ```jsx
  originCoordinates= {latitude: 33.757043, longitude: -7.270303,, altitude: 1.3 },
  ```

### `destinationCoordinates` (GeoPolyline) - REQUIRED

- **Description:** The coordinates used to draw the path. At least two coordinates are required before a line is displayed, otherwise nothing will show up.
- **Type:** `GeoPolyline` (Array of Objects with `latitude`, `longitude`, and optionally `altitude` properties)
- **Example:**
  ```jsx
  destinationCoordinates= {latitude: 33.865833, longitude: -7.021998,, altitude: 1.3 },
  ```

### `wayPoints` (GeoPolyline)

- **Description:** Additional coordinates along the path, if needed.
- **Type:** `GeoPolyline` (Array of Objects with `latitude`, `longitude`, and optionally `altitude` properties)
- **Example:**
  ```jsx
  wayPoints= [{latitude: 33.766877, longitude: -7.058795}, latitude: 33.828499, longitude: -6.959031]
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
    <Routing
        originCoordinates={latitude: 33.757043, longitude: -7.270303,}
        destinationCoordinates={latitude: 33.865833,longitude: -7.021998}
        lineType={'SOLID'}
        lineColor={'yellow'}
        lineWidth={12.0}
        wayPoints={[
                {
                latitude: 33.766877,
                longitude: -7.058795,
                },
                {
                latitude: 33.828499,
                longitude: -6.959031,
                }
        ]}
        onSendMessageRoutingDetails={(data) =>
          console.log('routing details', data)
        }
      />
    </MapsHereView>
  );
};

export default App;
```

In this example, `Routing` is used to draw a yellow solid line between two points on the map. You can modify the `originCoordinates`, `destinationCoordinates`, `wayPoints`, `lineColor`, `lineWidth`, and `lineType` props to customize the polyline's appearance and path.

Remember to review the prop values and defaults to ensure the paths appears as expected on your map. Happy mapping!
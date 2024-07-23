<h1 align="center">
    <strong>Arrow</strong>
</h1>

## Overview

`<Arrow />` is a React Native component designed for drawing arrows on the `<Map />` map component. It allows for the visualization of directional paths or routes by connecting a series of geographical coordinates with an arrow. The `Arrow` component is used as a child of the `Map` component to add directional information over the map, such as navigation routes.

## Properties

### `geoPolyline` (GeoPolyline) - REQUIRED

- **Description:** List of coordinates used to draw the arrow. At least two coordinates are required to display an arrow.
- **Type:** `GeoPolyline` (Array of Objects with `latitude` and `longitude` properties)
- **Example:**
  ```jsx
  geoPolyline={[
       { latitude: 33.819096, longitude: -7.320056 },
       { latitude: 34.460004, longitude: -6.121828 },
  ]}
  ```

### `lineColor` (ColorValue)

- **Description:** Specifies the color of the arrow. You can use color names, hex codes, or rgba values.
- **Type:** `ColorValue`
- **Possible values:** Color names like `white`, `black`, `red`, etc., RGBA values like `rgba(255, 255, 255, 1)`, or hex codes like `#FFFFFFFF`.
- **Example:**
  ```jsx
  lineColor = 'green';
  ```

### `lineWidth` (number)

- **Description:** Sets the thickness of the arrow. The value represents the width of the arrow.
- **Type:** `number`
- **Example:**
  ```jsx
  lineWidth={8}
  ```

## Example Usage

Here's how you might use the `Arrow` to draw an arrow:

```jsx
import React from 'react';
import { Map, Arrow } from 'react-native-here-explore';

const App = () => {
  return (
    <Map
      geoCoordinates={{ lat: 40.7128, lon: -74.006 }} // Coordinates for New York City
      mapScheme="NORMAL_DAY"
      zoomValue={10}
    >
      <Arrow
        geoPolyline={[
          { latitude: 40.7128, longitude: -74.006 },
          { latitude: 40.7158, longitude: -74.016 },
        ]}
        lineColor="green"
        lineWidth={5}
      />
    </Map>
  );
};

export default App;
```

In this example, `Arrow` is used to draw a green arrow between two points in New York City on the map. You can modify the `geoPolyline`, `lineColor`, and `lineWidth` props to customize the arrow's appearance and direction.

Remember to review the prop values and defaults to ensure the arrow appears as expected on your map. Happy mapping!

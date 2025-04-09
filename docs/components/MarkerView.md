<h1 align="center">
    <strong>Marker</strong>
</h1>

## Overview

`<Marker />` is a React Native component designed for placing custom markers on the `<Map />` map component. It enables the visualization of points of interest, locations, or any specific points on the map using custom images. The `Marker` component is used as a child of the `Map` component to add marker information over the map.

## Properties

### `geoCoordinates` (GeoCoordinates) - REQUIRED

- **Description:** Specifies the position of the marker on the map.
- **Type:** `GeoCoordinates` (Object with `latitude`, `longitude`, and optionally `altitude` properties)
- **Example:**
  ```jsx
  geoCoordinates={{ latitude: 99.00990, longitude: 9.00990, altitude: 1.07 }}
  ```

### `image` (ImageURISource) - REQUIRED

- **Description:** Defines the image used as the marker.
- **Type:** `ImageURISource` (Object with `uri` string or local asset `require`)
- **Example:**
  ```jsx
  image={require("../assets/marker_image.png")}
  // or
  image={{ uri: "https://example.com/marker_image.png" }}
  ```

### `scale` (number)

- **Description:** Used to scale the image up (above 1) or down (below 1).
- **Type:** `number`
- **Example:**
  ```jsx
  scale={1.5}
  ```

### `size` (Object)

- **Description:** Manually overwrites the width and height of the image.
- **Type:** `Object` with `width` and `height` properties
- **Example:**
  ```jsx
  size={{ width: 40, height: 40 }}
  ```

### `anchor` (Object) | [Official Docs](https://www.here.com/docs/bundle/sdk-for-android-explore-developer-guide/page/topics/map-items.html#anchored-poi-markers)

- **Description:** Defines the anchor point used to place the image relative to the coordinates.
- **Type:** `Object` with optional `horizontal` and `vertical` properties
- **Example:**
  ```jsx
  anchor={{ horizontal: 0.5, vertical: 0.5 }}
  ```

## Example Usage

Here's how you might use the `Marker` to place a custom marker:

```jsx
import React from 'react';
import { Map, Marker } from 'react-native-here-navigate';

const App = () => {
  return (
    <Map
      geoCoordinates={{ latitude: 40.7128, longitude: -74.006 }} // Coordinates for New York City
      mapScheme="NORMAL_DAY"
      zoomValue={10}
    >
      <Marker
        geoCoordinates={{ latitude: 40.7128, longitude: -74.006 }}
        image={require('../assets/marker_image.png')}
        scale={1.0}
        size={{ width: 50, height: 50 }}
        anchor={{ horizontal: 0.5, vertical: 1.0 }}
      />
    </Map>
  );
};

export default App;
```

In this example, `Marker` is used to place a custom image marker on New York City on the map. Adjust the `geoCoordinates`, `image`, `scale`, `size`, and `anchor` props as needed to customize the marker's appearance and placement.

Remember to review the prop values and defaults to ensure the marker appears as expected on your map. Happy mapping!

<h1 align="center">
    <strong>MapsHereView</strong>
</h1>

## Overview

`<MapsHereView />` is used to display the maps within your application. The component allows you to specify the location, appearance, and behavior of the map through a series of props.

## Properties

### `coordinates` (Coordinates) - REQUIRED

- **Description:** The geographical coordinates used to center the map. This prop is essential for defining the initial position of the map.
- **Type:** `Coordinates` (Object with `lat` and `lon` properties)
- **Example:**
  ```jsx
  coordinates={{ lat: 99.00990, lon: 9.00990 }}
  ```

### `mapScheme` (MapScheme)

- **Description:** Determines the visual style of the map. This can range from standard day or night modes to more specialized schemes like satellite or hybrid views.
- **Type:** `MapScheme` (Enum)
- **Default value:** `NORMAL_DAY`
- **Possible values:**
  - `NORMAL_DAY`
  - `NORMAL_NIGHT`
  - `SATELLITE`
  - `HYBRID_DAY`
  - `HYBRID_NIGHT`
  - `LITE_DAY`
  - `LITE_NIGHT`
  - `LITE_HYBRID_DAY`
  - `LITE_HYBRID_NIGHT`
  - `LOGISTICS_DAY`
- **Example:**
  ```jsx
  mapScheme = 'NORMAL_DAY';
  ```

### `zoomValue` (number)

- **Description:** Defines the zoom level of the map. A higher number indicates a closer view. Adjust this to control how much of the map is visible.
- **Type:** `number`
- **Default value:** `8.0`
- **Example:**
  ```jsx
  zoomValue={8.0}
  ```

### `zoomKind` (ZoomKind)

- **Description:** Specifies the method used to interpret the zoom value. Depending on your application's needs, you might prefer a specific type of zoom control.
- **Type:** `ZoomKind` (Enum)
- **Default value:** `ZOOM_LEVEL`
- **Possible values:**
  - `DISTANCE`
  - `ZOOM_LEVEL`
  - `SCALE`
- **Example:**
  ```jsx
  zoomKind = 'ZOOM_LEVEL';
  ```
- **Note:** Unless you have a specific requirement, it's usually best to stick with the default `ZOOM_LEVEL`.

## Example Usage

Here's a simple example of how to use the `MapsHereView` component within your React Native application. This example demonstrates a basic setup with specified coordinates, map scheme, and zoom value.

```jsx
import React from 'react';
import { MapsHereView } from 'react-native-maps-here';

const App = () => {
  return (
    <MapsHereView
      coordinates={{ lat: 40.7128, lon: -74.006 }} // Coordinates for New York City
      mapScheme="NORMAL_DAY"
      zoomValue={10}
    />
  );
};

export default App;
```

This code will render a map centered on New York City with a standard daytime scheme and a zoom level that provides a city-wide view. You can adjust the `coordinates`, `mapScheme`, and `zoomValue` props to fit your specific needs.

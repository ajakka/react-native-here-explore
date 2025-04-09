<h1 align="center">
    <strong>Map</strong>
</h1>

## Overview

`<Map />` is used to display the maps within your application. The component allows you to specify the location, appearance, and behavior of the map through a series of props.

## Properties

### `geoCoordinates` (GeoCoordinates) - REQUIRED

- **Description:** The geographical coordinates used to center the map. This prop is essential for defining the initial position of the map.
- **Type:** `GeoCoordinates` (Object with `latitude`, `longitude`, and optionally `altitude` properties)
- **Example:**
  ```jsx
  geoCoordinates={{ latitude: 99.00990, longitude: 9.00990, altitude: 1.07 }}
  ```

### `geoBox` (GeoBox) - REQUIRED

- **Description:** Two coordinate values used to describe the south west and north east corners of the map view.
- **Type:** `GeoBox` (Object with `southWestCorner` and `northEastCorner` which are of type `GeoCoordinates`)
- **Example:**
  ```jsx
  geoCoordinates={{
    southWestCorner: { latitude: 52.5561936, longitude: 13.3432207 },
    northEastCorner: { latitude: 52.4841669, longitude: 13.3957046 },
  }}
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

### `bearing` (number) | [Official Docs](https://www.here.com/docs/bundle/sdk-for-android-explore-developer-guide/page/topics/camera.html#rotate-the-camera)

- **Description:** Takes a value from 0 to 360 that's used to rotate the map.
- **Type:** `number`
- **Default value:** `0`
- **Example:**
  ```jsx
  bearing={90}
  ```

### `tilt` (number) | [Official Docs](https://www.here.com/docs/bundle/sdk-for-android-explore-developer-guide/page/topics/camera.html#tilt-the-camera)

- **Description:** Takes a value from 0 to 70 that's used to give a tilted view with some 3D Objects when the city is supported.
- **Type:** `number`
- **Default value:** `0`
- **Example:**
  ```jsx
  tilt={30}
  ```

### `watermarkStyle` (WatermarkStyle)

- **Description:** Controls the color of the HERE watermark. Useful for custom map schemes.
- **Type:** `WatermarkStyle` (Enum)
- **Possible values:**
  - `DARK`
  - `LIGHT`
- **Example:**
  ```jsx
  watermarkStyle = 'DARK';
  ```

### `onMapTap` (Function)

- **Description:** Event handler that is called when the user taps on the map.
- **Type:** `(event: { nativeEvent: { latitude: number; longitude: number } }) => void`
- **Example:**
  ```jsx
  onMapTap={({ nativeEvent }) => {
    console.log(`Map clicked at: ${nativeEvent.latitude}, ${nativeEvent.longitude}`);
  }}
  ```

### `onMapLongPress` (Function)

- **Description:** Event handler that is called when the user long presses on the map.
- **Type:** `(event: { nativeEvent: { latitude: number; longitude: number } }) => void`
- **Example:**
  ```jsx
  onMapLongPress={({ nativeEvent }) => {
    console.log(`Map long-pressed at: ${nativeEvent.latitude}, ${nativeEvent.longitude}`);
  }}
  ```

## Example Usage

Here's a simple example of how to use the `MapsHereView` component within your React Native application. This example demonstrates a basic setup with specified coordinates, map scheme, and zoom value.

```jsx
import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Map } from 'react-native-here-navigate';

const MapExample = () => {
  const [clickedLocation, setClickedLocation] = useState(null);

  return (
    <View style={styles.container}>
      <Map
        geoCoordinates={{ latitude: 40.7128, longitude: -74.006 }}
        mapScheme="NORMAL_DAY"
        zoomValue={14}
        onMapTap={({ nativeEvent }) => {
          setClickedLocation({
            latitude: nativeEvent.latitude,
            longitude: nativeEvent.longitude,
          });
        }}
        onMapLongPress={({ nativeEvent }) => {
          console.log(
            `Long press at: ${nativeEvent.latitude}, ${nativeEvent.longitude}`
          );
        }}
        style={styles.map}
      />

      {clickedLocation && (
        <View style={styles.coordinatesContainer}>
          <Text style={styles.coordinatesText}>
            Clicked at: {clickedLocation.latitude.toFixed(6)},{' '}
            {clickedLocation.longitude.toFixed(6)}
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  coordinatesContainer: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    padding: 10,
    alignItems: 'center',
  },
  coordinatesText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default MapExample;
```

In this example, the Map component is configured to respond to both click and long press events. When the user clicks on the map, the location coordinates are displayed at the bottom of the screen. Long press events are logged to the console.

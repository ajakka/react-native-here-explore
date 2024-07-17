<h1 align="center">
    <strong>useRouting</strong>
</h1>

## Overview

`useRouting` is a React Native hook used for calculating the shortest paths from a point A to point B.
It accepts many route options such as `RouteOption.car()`, `RouteOption.bicycle()`, `RouteOption.pedestrian()`, etc... that can tell help otimize the best route.

## Functions

### `calculateRoute(waypoints: GeoPolyline, routeOption: RouteOption)`

- **Description:** This function takes a list of waypoints and calculates the route to reach them, the resulting route is determined by the option selected.

### `cancel()`

- **Description:** A function used to cancel current route calculation process, best used in the useEffect cleanup function.

## Example Usage

Here's how you might use the `useRouting`:

```jsx
import React from 'react';
import { Map, useRouting } from 'react-native-here-explore';

const wayPoints: GeoPolyline = [
  { latitude: 52.5561936, longitude: 13.3432207 },
  { latitude: 52.4831559, longitude: 13.3946936 },
];

const App = () => {
  const [vertices, setVertices] = React.useState < GeoPolyline > [];

  const { cancel, calculateRoute } = useRouting();

  React.useEffect(() => {
    async function runCalculateRoute() {
      const data = await calculateRoute(wayPoints, RouteOption.bicycle());
      if (!data.routingError && data.routes[0]) {
        setVertices(data.routes[0].vertices);
      }
    }

    runCalculateRoute();

    return () => void cancel();
  }, []);

  return (
    <Map
      style={styles.box}
      mapScheme="NORMAL_NIGHT"
      geoCoordinates={{ latitude: 52.51967475, longitude: 13.36895715 }}
      zoomValue={13}
    >
      <Polyline
        lineType="SOLID"
        lineColor="#6cabae"
        lineWidth={12}
        geoPolyline={vertices}
      />
    </Map>
  );
};

export default App;
```

In this example, `Routing` is used to draw a yellow solid line between two points on the map. You can modify the `originCoordinates`, `destinationCoordinates`, `wayPoints`, `lineColor`, `lineWidth`, and `lineType` props to customize the polyline's appearance and path.

Remember to review the prop values and defaults to ensure the paths appears as expected on your map. Happy mapping!

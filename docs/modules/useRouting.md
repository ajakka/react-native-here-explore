<h1 align="center">
    <strong>useRouting</strong>
</h1>

## Overview

`useRouting` is a React hook for calculating routes between waypoints. It manages the async lifecycle (pending, result, error) and exposes `calculate` and `cancel` functions. For lower-level access, use [`calculateRoute`](#calculateroute) and [`cancel`](#cancel) directly.

## `useRouting({ waypoints, routeOption })`

```typescript
import { useRouting } from 'react-native-here-explore';

const { route, error, isPending, calculate, cancel } = useRouting({
  waypoints: GeoPolyline,
  routeOption: RouteOption,
});
```

### Parameters

| Parameter | Type | Description |
|---|---|---|
| `waypoints` | `GeoPolyline` | Ordered list of coordinates. First = origin, last = destination |
| `routeOption` | `RouteOption` | Transport mode |

### Return values

| Field | Type | Description |
|---|---|---|
| `route` | `RouteResultType \| null` | The calculated route, or `null` |
| `error` | `Error \| null` | Error from the last attempt, or `null` |
| `isPending` | `boolean` | `true` while a calculation is in progress |
| `calculate` | `() => void` | Trigger a route calculation |
| `cancel` | `() => void` | Cancel the ongoing calculation |

### RouteResultType

```typescript
{
  vertices: GeoPolyline;         // route path coordinates
  routeHandle?: string;
  durationInSeconds: number;
  trafficDelayInSeconds: number;
  lengthInMeters: number;
}
```

---

## RouteOption values

| Value | Transport Mode |
|---|---|
| `'CarOptions'` | Private car |
| `'PedestrianOptions'` | Walking |
| `'TruckOptions'` | Truck |
| `'ScooterOptions'` | Scooter / moped |
| `'BicycleOptions'` | Bicycle |
| `'TaxiOptions'` | Taxi |
| `'EVCarOptions'` | Electric car |
| `'EVTruckOptions'` | Electric truck |
| `'BusOptions'` | Public bus |
| `'PrivateBusOptions'` | Private bus / coach |

---

## Example Usage

```jsx
import React from 'react';
import { Map, Polyline, useRouting } from 'react-native-here-explore';
import { Button, Text, ActivityIndicator } from 'react-native';

const App = () => {
  const { route, error, isPending, calculate } = useRouting({
    waypoints: [
      { latitude: 52.5561936, longitude: 13.3432207 },
      { latitude: 52.4831559, longitude: 13.3946936 },
    ],
    routeOption: 'BicycleOptions',
  });

  return (
    <>
      <Map
        geoCoordinates={{ latitude: 52.5197, longitude: 13.3690 }}
        mapScheme="NORMAL_NIGHT"
        zoomValue={13}
      >
        {route && (
          <Polyline
            lineType="SOLID"
            lineColor="#6cabae"
            lineWidth={12}
            geoPolyline={route.vertices}
          />
        )}
      </Map>

      <Button title="Calculate" onPress={calculate} disabled={isPending} />
      {isPending && <ActivityIndicator />}
      {error && <Text>Error: {error.message}</Text>}
      {route && (
        <Text>
          {(route.lengthInMeters / 1000).toFixed(1)} km ·{' '}
          {Math.round(route.durationInSeconds / 60)} min
        </Text>
      )}
    </>
  );
};

export default App;
```

---

## `calculateRoute` (standalone function)

For cases where you need all route alternatives or want to manage state yourself:

```typescript
import { calculateRoute } from 'react-native-here-explore';

const result = await calculateRoute(waypoints, 'CarOptions');

if (result.routingError == null) {
  console.log(result.routes); // RouteResultType[]
}
```

### Returns `Promise<OnRouteCalculated>`

```typescript
{
  routingError?: number;      // defined if the calculation failed
  routes: RouteResultType[];  // all route alternatives
}
```

## `cancel` (standalone function)

```typescript
import { cancel } from 'react-native-here-explore';

await cancel(); // returns Promise<boolean>
```

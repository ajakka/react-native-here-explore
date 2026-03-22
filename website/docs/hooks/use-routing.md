---
sidebar_position: 1
---

# useRouting

`useRouting` is a React hook that calculates a route between a list of waypoints for a given transport mode. It manages the async lifecycle (pending, result, error) and exposes `calculate` and `cancel` functions.

## Import

```typescript
import { useRouting } from 'react-native-here-explore';
```

## Parameters

```typescript
useRouting({
  waypoints: GeoPolyline,
  routeOption: RouteOption,
})
```

| Parameter | Type | Required | Description |
|---|---|---|---|
| `waypoints` | [`GeoPolyline`](../api/types#geopolyline) | Yes | Ordered list of coordinates. First = origin, last = destination, any in between = waypoints |
| `routeOption` | [`RouteOption`](../api/types#routeoption) | Yes | Transport mode |

## Return value

```typescript
{
  route: RouteResultType | null,
  error: Error | null,
  isPending: boolean,
  calculate: () => void,
  cancel: () => void,
}
```

| Field | Type | Description |
|---|---|---|
| `route` | [`RouteResultType`](../api/types#routeresulttype) \| `null` | The calculated route, or `null` if not yet calculated or if an error occurred |
| `error` | `Error \| null` | Error from the last calculation attempt, or `null` |
| `isPending` | `boolean` | `true` while a route calculation is in progress |
| `calculate` | `() => void` | Trigger a route calculation. Clears any previous error |
| `cancel` | `() => void` | Cancel the in-progress calculation and reset `isPending` |

---

## Usage

### Basic route

```tsx
import { useRouting, Arrow, Map } from 'react-native-here-explore';

function RouteMap() {
  const { route, error, isPending, calculate } = useRouting({
    waypoints: [
      { latitude: 48.8566, longitude: 2.3522 },  // Paris
      { latitude: 51.5074, longitude: -0.1278 },  // London
    ],
    routeOption: 'CarOptions',
  });

  return (
    <>
      <Map
        mapScheme="NORMAL_DAY"
        geoCoordinates={{ latitude: 50.0, longitude: 1.0 }}
        zoomValue={6}
      >
        {route && <Arrow geoPolyline={route.vertices} lineColor="#1A73E8" lineWidth={6} />}
      </Map>

      <Button title="Calculate Route" onPress={calculate} disabled={isPending} />

      {isPending && <ActivityIndicator />}
      {error && <Text>Error: {error.message}</Text>}
    </>
  );
}
```

### Show route info

```tsx
{route && (
  <View>
    <Text>Distance: {(route.lengthInMeters / 1000).toFixed(1)} km</Text>
    <Text>Duration: {Math.round(route.durationInSeconds / 60)} min</Text>
    <Text>Traffic delay: {Math.round(route.trafficDelayInSeconds / 60)} min</Text>
  </View>
)}
```

### Dynamic waypoints

```tsx
const { route, calculate } = useRouting({
  waypoints: userSelectedPoints,  // re-calculated when this changes and calculate() is called
  routeOption: 'PedestrianOptions',
});
```

### Cancel a long-running calculation

```tsx
const { isPending, calculate, cancel } = useRouting({
  waypoints,
  routeOption: 'TruckOptions',
});

return (
  <>
    {!isPending ? (
      <Button title="Calculate" onPress={calculate} />
    ) : (
      <Button title="Cancel" onPress={cancel} />
    )}
  </>
);
```

---

## RouteOption values

| Value | Transport Mode |
|---|---|
| `'CarOptions'` | Private car |
| `'PedestrianOptions'` | Walking |
| `'TruckOptions'` | Truck / heavy vehicle |
| `'ScooterOptions'` | Scooter / moped |
| `'BicycleOptions'` | Bicycle |
| `'TaxiOptions'` | Taxi |
| `'EVCarOptions'` | Electric car |
| `'EVTruckOptions'` | Electric truck |
| `'BusOptions'` | Public bus |
| `'PrivateBusOptions'` | Private bus / coach |

---

## Notes

- `calculate` must be called explicitly — the hook does not auto-calculate on mount or when `waypoints`/`routeOption` change.
- The hook returns the **first** route from the result set.
- If you need access to all route alternatives or lower-level control, use the [`calculateRoute`](../api/calculate-route) function directly.

---
sidebar_position: 2
---

# calculateRoute / cancel

Low-level async functions for route calculation. These are the primitives that [`useRouting`](../hooks/use-routing) is built on. Use them directly when you need full control over multiple route alternatives or want to manage state yourself.

## Import

```typescript
import { calculateRoute, cancel } from 'react-native-here-explore';
```

---

## `calculateRoute`

Calculates one or more routes between the given waypoints.

### Signature

```typescript
calculateRoute(
  waypoints: GeoPolyline,
  routeOption: RouteOption
): Promise<OnRouteCalculated>
```

### Parameters

| Parameter | Type | Description |
|---|---|---|
| `waypoints` | [`GeoPolyline`](./types#geopolyline) | Ordered list of coordinates. First = origin, last = destination |
| `routeOption` | [`RouteOption`](./types#routeoption) | Transport mode |

### Returns

`Promise<OnRouteCalculated>`

```typescript
type OnRouteCalculated = {
  routingError?: number;  // undefined if success
  routes: RouteResultType[];
};
```

If `routingError` is defined, the calculation failed and `routes` will be empty.

### Example

```typescript
import { calculateRoute } from 'react-native-here-explore';

async function getRoute() {
  const result = await calculateRoute(
    [
      { latitude: 48.8566, longitude: 2.3522 },
      { latitude: 51.5074, longitude: -0.1278 },
    ],
    'CarOptions'
  );

  if (result.routingError != null) {
    console.error('Routing failed with code:', result.routingError);
    return;
  }

  const route = result.routes[0];
  console.log('Distance:', route.lengthInMeters, 'm');
  console.log('Duration:', route.durationInSeconds, 's');
  console.log('Traffic delay:', route.trafficDelayInSeconds, 's');
  console.log('Vertices:', route.vertices.length, 'points');
}
```

### All route alternatives

```typescript
const result = await calculateRoute(waypoints, 'CarOptions');

result.routes.forEach((route, index) => {
  console.log(`Route ${index + 1}:`, route.lengthInMeters, 'm');
});
```

---

## `cancel`

Cancels any ongoing route calculation.

### Signature

```typescript
cancel(): Promise<boolean>
```

### Returns

`Promise<boolean>` — `true` if cancellation was successful.

### Example

```typescript
import { calculateRoute, cancel } from 'react-native-here-explore';

// Start a calculation
const promise = calculateRoute(waypoints, 'TruckOptions');

// Cancel it
await cancel();
```

---

## vs. useRouting

| Feature | `calculateRoute` | `useRouting` |
|---|---|---|
| State management | Manual | Automatic |
| Pending state | Manual | `isPending` |
| Error state | Manual | `error` |
| Multiple routes | All alternatives | First only |
| Use in components | Anywhere | React components only |

Use `calculateRoute` when you need multiple alternatives or are working outside React components. Use [`useRouting`](../hooks/use-routing) for the typical single-route React use case.

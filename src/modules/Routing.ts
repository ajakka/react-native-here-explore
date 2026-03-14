import type { GeoPolyline, OnRouteCalculated, RouteOption } from '../types';
import NativeRouting from './specs/NativeRouting';

export async function calculateRoute(
  waypoints: GeoPolyline,
  routeOption: RouteOption
): Promise<OnRouteCalculated> {
  const result = await NativeRouting.calculateRoute(
    waypoints,
    routeOption.type
  );
  return result as unknown as OnRouteCalculated;
}

export async function cancel(): Promise<boolean> {
  return await NativeRouting.cancel();
}

type UseRoutingParams = {
  waypoints: GeoPolyline;
  routeOption: RouteOption;
};

export function useRouting({ waypoints, routeOption }: UseRoutingParams) {
  return {
    calculateRoute: () => calculateRoute(waypoints, routeOption),
    cancel,
  };
}

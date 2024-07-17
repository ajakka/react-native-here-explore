import type { GeoPolyline } from '../../../types';

export type RouteResultType = {
  vertices: GeoPolyline;
  routeHandle?: string;
  durationInSeconds: number;
  trafficDelayInSeconds: number;
  lengthInMeters: number;
};

export type OnRouteCalculated = {
  routingError?: number;
  routes: RouteResultType[];
};

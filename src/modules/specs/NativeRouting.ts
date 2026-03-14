import { type TurboModule, TurboModuleRegistry } from 'react-native';

type GeoCoord = Readonly<{
  latitude: number;
  longitude: number;
  altitude?: number;
}>;

type RouteResult = Readonly<{
  vertices: ReadonlyArray<GeoCoord>;
  routeHandle?: string;
  durationInSeconds: number;
  trafficDelayInSeconds: number;
  lengthInMeters: number;
}>;

type RouteCalculated = Readonly<{
  routingError?: number;
  routes: ReadonlyArray<RouteResult>;
}>;

export interface Spec extends TurboModule {
  calculateRoute(
    waypoints: ReadonlyArray<GeoCoord>,
    routeOption: string
  ): Promise<RouteCalculated>;
  cancel(): Promise<boolean>;
}

export default TurboModuleRegistry.getEnforcing<Spec>('Routing');

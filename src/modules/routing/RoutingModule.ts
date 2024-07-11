import { type GeoPolyline } from '../../types';
import { type RouteOption } from './RoutingOptionBuilder';
import { NativeModules } from 'react-native';
import { LINKING_ERROR } from '../../Constant';

const NAME = 'RoutingModule';

export type RouteType = {
  vertices: GeoPolyline;
  routeHandle?: string;
  durationInSeconds: number;
  trafficDelayInSeconds: number;
  lengthInMeters: number;
};

export type OnRouteCalculated = {
  routingError?: number;
  routes: RouteType[];
};

type RoutingType = {
  calculateRoute: (
    waypoints: GeoPolyline,
    routeOption: string
  ) => Promise<OnRouteCalculated>;

  cancel: () => Promise<void>;
};

/// @ts-expect-error
const isTurboModuleEnabled = global.__turboModuleProxy != null;
const Module = isTurboModuleEnabled
  ? require('./spec/NativeRouting').default
  : NativeModules[NAME];

const RCTRouting: RoutingType = Module
  ? Module
  : new Proxy(
      {},
      {
        get() {
          throw new Error(LINKING_ERROR);
        },
      }
    );

export function useRouting() {
  async function calculateRoute(
    waypoints: GeoPolyline,
    routeOption: RouteOption
  ) {
    return await RCTRouting.calculateRoute(waypoints, routeOption.type);
  }

  async function cancel() {
    return await RCTRouting.cancel();
  }

  return { calculateRoute, cancel };
}

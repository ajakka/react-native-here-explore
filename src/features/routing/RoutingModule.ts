import { type GeoPolyline } from '../../types';
import { type RouteOption } from './types/RouteOption';
import { NativeModules } from 'react-native';
import { LINKING_ERROR } from '../../constants';
import type { OnRouteCalculated } from './types/RouteResult';

const NAME = 'RoutingModule';

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
  ? require('./specs/NativeRouting').default
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

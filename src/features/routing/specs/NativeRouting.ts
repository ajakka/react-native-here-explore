import { type TurboModule, TurboModuleRegistry } from 'react-native';
import type { GeoPolyline } from '../../../types';
import type { OnRouteCalculated } from '../RoutingModule';

export interface Spec extends TurboModule {
  calculateRoute: (
    waypoints: GeoPolyline,
    routeOption: string
  ) => Promise<OnRouteCalculated>;
}

export default TurboModuleRegistry.getEnforcing<Spec>('RoutingModule');

export { ConfigModule as HEREConfig } from './features/config/ConfigModule';

export {
  useRouting,
  RouteOption,
  type RouteOptionType,
  type RouteResultType,
  type OnRouteCalculated,
} from './features/routing';

export {
  Map, //
  type MapProps,
} from './features/map/MapView';

export {
  Arrow, //
  type ArrowProps,
} from './features/arrow/ArrowView';

export {
  Polyline, //
  type PolylineProps,
} from './features/polyline/PolylineView';

export {
  Polygon, //
  type PolygonProps,
} from './features/polygon/PolygonView';

export {
  Marker, //
  type MarkerProps,
} from './features/marker/MarkerView';

export {
  Pin, //
  type PinProps,
} from './features/pin/PinView';

export { Navigation, type NavigationProps, type NavigationHandle } from './features/Navigation';

export * from './types';

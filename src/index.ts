export { ConfigModule as HEREConfig } from './features/config/ConfigModule';

export { useRouting, RouteOption } from './features/routing';
export type {
  RouteOptionType,
  RouteResultType,
  OnRouteCalculated,
} from './features/routing';

export { Map, type MapProps } from './features/map/MapView';

export { Arrow, type ArrowProps } from './features/arrow/ArrowView';

export { Polyline, type PolylineProps } from './features/polyline/PolylineView';

export { Polygon, type PolygonProps } from './features/polygon/PolygonView';

export { Marker, type MarkerProps } from './features/marker/MarkerView';

export * from './types';

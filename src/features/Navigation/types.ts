import type { GeoPolyline } from '../../types';
import type { MapProps } from '../map/MapView';

export interface Route {
  geoPolyline: GeoPolyline;
}

export interface NavigationHandle {
  startNavigation: (route: Route) => void;
  stopNavigation: () => void;
}

interface BaseNavigationProps {
  isSimulated?: boolean;
  isCameraTrackingEnabled?: boolean;
  isVoiceGuidanceEnabled?: boolean;
}

export type NavigationProps = BaseNavigationProps & MapProps;

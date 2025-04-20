import type { NativeSyntheticEvent } from 'react-native';
import type { GeoCoordinates, GeoPolyline } from '../../types';
import type { MapProps } from '../map/MapView';

export interface Route {
  geoPolyline: GeoPolyline;
}

export interface NavigationHandle {
  prefetchUserLocation: () => void;

  startNavigation: (route: Route) => void;
  stopNavigation: () => void;
}

interface BaseNavigationProps {
  isSimulated?: boolean;
  isCameraTrackingEnabled?: boolean;
  isVoiceGuidanceEnabled?: boolean;

  onUserLocationNotFound?: (event: NativeSyntheticEvent<{ message: string }>) => void;
  onUserLocationResolved?: (event: NativeSyntheticEvent<GeoCoordinates>) => void;
}

export type NavigationProps = BaseNavigationProps & MapProps;

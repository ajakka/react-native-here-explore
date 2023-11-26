import codegenNativeComponent from 'react-native/Libraries/Utilities/codegenNativeComponent';
import type { ViewProps } from 'react-native';
import type {
  Double,
  WithDefault,
} from 'react-native/Libraries/Types/CodegenTypes';

export type ZoomKind = 'DISTANCE' | 'ZOOM_LEVEL' | 'SCALE';

export type MapScheme =
  | 'NORMAL_DAY'
  | 'NORMAL_NIGHT'
  | 'SATELLITE'
  | 'HYBRID_DAY'
  | 'HYBRID_NIGHT'
  | 'LITE_DAY'
  | 'LITE_NIGHT'
  | 'LITE_HYBRID_DAY'
  | 'LITE_HYBRID_NIGHT'
  | 'LOGISTICS_DAY';

export interface Coordinates {
  lat: Double;
  lon: Double;
}

interface NativeProps extends ViewProps {
  mapScheme?: WithDefault<MapScheme, 'NORMAL_DAY'>;
  zoomKind?: WithDefault<ZoomKind, 'ZOOM_LEVEL'>;
  zoomValue: Double;
  coordinates: Coordinates;
}

export default codegenNativeComponent<NativeProps>('MapsHereView');

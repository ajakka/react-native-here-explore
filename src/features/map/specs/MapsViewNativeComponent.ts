import codegenNativeComponent from 'react-native/Libraries/Utilities/codegenNativeComponent';
import type { ViewProps } from 'react-native';
import type {
  Double,
  WithDefault,
} from 'react-native/Libraries/Types/CodegenTypes';
import type { GeoCoordinates } from '../../../types/Coordinates';
import type { MapScheme } from '../../../types/MapScheme';
import type { ZoomKind } from '../../../types/ZoomKind';

const COMPONENT_NAME = 'MapsView';

interface NativeProps extends ViewProps {
  mapScheme?: WithDefault<MapScheme, 'NORMAL_DAY'>;
  zoomKind?: WithDefault<ZoomKind, 'ZOOM_LEVEL'>;
  zoomValue: Double;
  coordinates: GeoCoordinates;
}

export default codegenNativeComponent<NativeProps>(COMPONENT_NAME);

import { codegenNativeComponent } from 'react-native';
import type { ViewProps, CodegenTypes } from 'react-native';

type GeoCoord = Readonly<{
  latitude: CodegenTypes.Double;
  longitude: CodegenTypes.Double;
  altitude?: CodegenTypes.Double;
}>;

type GeoBox = Readonly<{
  southWestCorner: GeoCoord;
  northEastCorner: GeoCoord;
}>;

type MapTapEvent = Readonly<{
  latitude: CodegenTypes.Double;
  longitude: CodegenTypes.Double;
  altitude: CodegenTypes.Double;
}>;

export interface NativeProps extends ViewProps {
  mapScheme?: CodegenTypes.WithDefault<string, 'NORMAL_DAY'>;
  watermarkStyle?: string;
  bearing?: CodegenTypes.WithDefault<CodegenTypes.Double, 0>;
  tilt?: CodegenTypes.WithDefault<CodegenTypes.Double, 0>;
  zoomValue?: CodegenTypes.WithDefault<CodegenTypes.Double, 8>;
  zoomKind?: CodegenTypes.WithDefault<string, 'ZOOM_LEVEL'>;
  hasGeoCoordinates?: CodegenTypes.WithDefault<boolean, false>;
  geoCoordinates?: GeoCoord;
  geoBox?: GeoBox;
  onMapTap?: CodegenTypes.DirectEventHandler<MapTapEvent>;
  onMapLongPress?: CodegenTypes.DirectEventHandler<MapTapEvent>;
}

export default codegenNativeComponent<NativeProps>('MapView');

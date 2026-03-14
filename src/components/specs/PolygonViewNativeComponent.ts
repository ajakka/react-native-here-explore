import { codegenNativeComponent } from 'react-native';
import type { ViewProps, CodegenTypes } from 'react-native';

type GeoCoord = Readonly<{
  latitude: CodegenTypes.Double;
  longitude: CodegenTypes.Double;
  altitude?: CodegenTypes.Double;
}>;

export interface NativeProps extends ViewProps {
  // GeoPolyline variant
  geoPolyline?: ReadonlyArray<GeoCoord>;
  // GeoCircle variant
  geoCircle?: Readonly<{
    center: GeoCoord;
    radiusInMeters: CodegenTypes.Double;
  }>;
  color?: CodegenTypes.WithDefault<CodegenTypes.Int32, 0>;
  outlineColor?: CodegenTypes.WithDefault<CodegenTypes.Int32, 0>;
  outlineWidth?: CodegenTypes.WithDefault<CodegenTypes.Double, 0>;
}

export default codegenNativeComponent<NativeProps>('PolygonView');

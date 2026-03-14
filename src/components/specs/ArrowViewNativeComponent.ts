import { codegenNativeComponent } from 'react-native';
import type { CodegenTypes, ViewProps } from 'react-native';

type GeoCoord = Readonly<{
  latitude: CodegenTypes.Double;
  longitude: CodegenTypes.Double;
  altitude?: CodegenTypes.Double;
}>;

export interface NativeProps extends ViewProps {
  geoPolyline: ReadonlyArray<GeoCoord>;
  lineColor?: CodegenTypes.WithDefault<CodegenTypes.Int32, 0>;
  lineWidth?: CodegenTypes.WithDefault<CodegenTypes.Double, 8>;
}

export default codegenNativeComponent<NativeProps>('ArrowView');

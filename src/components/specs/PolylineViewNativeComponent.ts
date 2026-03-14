import { codegenNativeComponent } from 'react-native';
import type { ViewProps, CodegenTypes } from 'react-native';

type GeoCoord = Readonly<{
  latitude: CodegenTypes.Double;
  longitude: CodegenTypes.Double;
  altitude?: CodegenTypes.Double;
}>;

export interface NativeProps extends ViewProps {
  geoPolyline: ReadonlyArray<GeoCoord>;
  lineWidth?: CodegenTypes.WithDefault<CodegenTypes.Double, 8>;
  lineColor?: CodegenTypes.WithDefault<CodegenTypes.Int32, 0>;
  lineType?: CodegenTypes.WithDefault<string, 'SOLID'>;
  lineWidthUnit?: CodegenTypes.WithDefault<string, 'PIXELS'>;
  // SOLID line props
  outlineWidth?: CodegenTypes.WithDefault<CodegenTypes.Double, 0>;
  outlineColor?: CodegenTypes.WithDefault<CodegenTypes.Int32, 0>;
  capShape?: CodegenTypes.WithDefault<string, 'ROUND'>;
  // DASH line props
  lineLength?: CodegenTypes.WithDefault<CodegenTypes.Double, 4>;
  gapLength?: CodegenTypes.WithDefault<CodegenTypes.Double, 2>;
  gapColor?: CodegenTypes.WithDefault<CodegenTypes.Int32, 0>;
}

export default codegenNativeComponent<NativeProps>('PolylineView');

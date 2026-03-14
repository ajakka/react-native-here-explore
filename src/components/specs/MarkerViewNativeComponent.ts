import { codegenNativeComponent } from 'react-native';
import type { ViewProps, CodegenTypes } from 'react-native';

type GeoCoord = Readonly<{
  latitude: CodegenTypes.Double;
  longitude: CodegenTypes.Double;
  altitude?: CodegenTypes.Double;
}>;

// Shape of Image.resolveAssetSource() output
type ImageSource = Readonly<{
  uri?: string;
  width?: CodegenTypes.Double;
  height?: CodegenTypes.Double;
  scale?: CodegenTypes.Double;
}>;

export interface NativeProps extends ViewProps {
  geoCoordinates: GeoCoord;
  image: ImageSource;
  size: Readonly<{ width: CodegenTypes.Double; height: CodegenTypes.Double }>;
  scale?: CodegenTypes.WithDefault<CodegenTypes.Double, 1>;
  anchor?: Readonly<{
    horizontal?: CodegenTypes.Double;
    vertical?: CodegenTypes.Double;
  }>;
}

export default codegenNativeComponent<NativeProps>('MarkerView');

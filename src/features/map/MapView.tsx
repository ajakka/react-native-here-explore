import {
  requireNativeComponent,
  UIManager,
  type ViewProps,
} from 'react-native';
import { LINKING_ERROR } from '../../constants';
import type {
  GeoBox,
  GeoCoordinates,
  Rectangle2D,
} from '../../types/Coordinates';
import type { MapScheme } from '../../types/MapScheme';
import type { ZoomKind } from '../../types/ZoomKind';
import type { WatermarkStyle } from '../../types/WatermarkStyle';

const COMPONENT_NAME = 'MapsView';

interface BaseMapProps extends ViewProps {
  /**
   * ### The map's default schemes used to change the look and feel of the map.
   *
   * **Default value:** `NORMAL_DAY`
   *
   * **Possible values:**
   * - `NORMAL_DAY`
   * - `NORMAL_NIGHT`
   * - `SATELLITE`
   * - `HYBRID_DAY`
   * - `HYBRID_NIGHT`
   * - `LITE_DAY`
   * - `LITE_NIGHT`
   * - `LITE_HYBRID_DAY`
   * - `LITE_HYBRID_NIGHT`
   * - `LOGISTICS_DAY`
   *
   * **Example:**
   * ```
   * mapScheme="NORMAL_DAY"
   * ```
   */
  mapScheme: MapScheme;

  /**
   * ### Controles the color of the HERE watermark.
   *
   * It's only usefull for custom map schemes, which are not supported at the moment.
   *
   * **Possible values:**
   * - `DARK`
   * - `LIGHT`
   *
   * **Example:**
   * ```
   * watermarkStyle="DARK"
   * ```
   */
  watermarkStyle?: WatermarkStyle;

  /**
   * ### Takes a value from 0 to 360 that's used to rotate the map.
   *
   * **Default value:** `0`
   *
   * **Example:**
   * ```
   * bearing={90}
   * ```
   */
  bearing?: number;

  /**
   * ### Takes a value from 0 to 70 that's used to give a tilted view with some 3D Objects when the city is supported.
   *
   * **Default value:** `0`
   *
   * **Example:**
   * ```
   * tilt={30}
   * ```
   */
  tilt?: number;
}

interface GeoCoordinatesProps extends BaseMapProps {
  /**
   * ### **(REQUIRED)** The coordinates used to position the map.
   *
   * **Example:**
   * ```
   * geoCoordinates={{ latitude: 99.00990, longitude: 9.00990, altitude: 1.07 }}
   * ```
   */
  geoCoordinates: GeoCoordinates;

  /**
   * ### The zoom value, bigger means closer to the coordinates.
   *
   * **Default value:** `8.0`
   *
   * **Example:**
   * ```
   * zoomValue={8.0}
   * ```
   */
  zoomValue?: number;

  /**
   * ### The zoom methode used to calculate the zoom value.
   *
   * **Default value:** `ZOOM_LEVEL`
   *
   * **Possible values:**
   * - `DISTANCE`
   * - `ZOOM_LEVEL`
   * - `SCALE`
   *
   * **Example:**
   * ```
   * zoomKind="ZOOM_LEVEL"
   * ```
   *
   * **Note:** If you don't have a specific need for this value,
   * it's usually best to leave it to the default value: `ZOOM_LEVEL`
   */
  zoomKind?: ZoomKind;
}

interface GeoBoxProps extends BaseMapProps {
  /**
   * ### **(REQUIRED)** Two coordinate values used to describe the ends of the map view.
   *
   * **Example:**
   * ```
   * geoBox={{
   *   southWestCorner: { latitude: 33.819096, longitude: -7.320056 },
   *   northEastCorner: { latitude: 34.460004, longitude: -6.121828 },
   * }}
   * ```
   */
  geoBox: GeoBox;

  /**
   *
   */
  rectangle2D?: Rectangle2D;
}

export type MapProps = GeoCoordinatesProps | GeoBoxProps;

const RCTMapsHereView =
  UIManager.getViewManagerConfig(COMPONENT_NAME) != null
    ? requireNativeComponent<MapProps>(COMPONENT_NAME)
    : () => {
        throw new Error(LINKING_ERROR);
      };

/**
 * MapsHereView is the main view responsible for displaying the Map
 */
export function Map(props: MapProps) {
  return <RCTMapsHereView {...props} style={[{ flex: 1 }, props.style]} />;
}

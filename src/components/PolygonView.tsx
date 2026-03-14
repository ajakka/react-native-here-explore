import type { ColorValue } from 'react-native';
import { processColor } from 'react-native';

import PolygonViewNativeComponent from './specs/PolygonViewNativeComponent';

import type { GeoCircle, GeoPolyline } from '../types/Coordinates';

interface BasePolygonProps {
  /**
   * ### Color of the polygon
   *
   * **Possible values:**
   * - `white`, `black`, `red`, `green`, `blue`...
   * - `rgba(255, 255, 255, 255)`
   * - `#FFFFFFFF`
   *
   * **Example:**
   * ```
   * color="green"
   * ```
   */
  color?: ColorValue;

  /**
   * ### Outline color of the polygon
   *
   * **Possible values:**
   * - `white`, `black`, `red`, `green`, `blue`...
   * - `rgba(255, 255, 255, 255)`
   * - `#FFFFFFFF`
   *
   * **Example:**
   * ```
   * outlineColor="blue"
   * ```
   */
  outlineColor?: ColorValue;

  /**
   * ### Outline width of the polygon
   *
   * **Example:**
   * ```
   * outlineWidth={8}
   * ```
   */
  outlineWidth?: number;
}

interface GeoCoordinatesProps extends BasePolygonProps {
  /**
   * ### **(REQUIRED)** List of coordinates used to draw the polygon
   *
   * **Example:**
   * ```
   * geoPolyline={[
   *   { latitude: 33.819096, longitude: -7.320056 },
   *   { latitude: 34.460004, longitude: -6.121828 },
   * ]}
   * ```
   */
  geoPolyline: GeoPolyline;
}

interface GeoCircleProps extends BasePolygonProps {
  /**
   * ### **(REQUIRED)** Draws a polygon in the form of a circle
   *
   * **Example:**
   * ```
   * geoCircle={{
   *   center: { latitude: 33.819096, longitude: -7.320056 },
   *   radiusInMeters: 40
   * }}
   * ```
   */
  geoCircle: GeoCircle;
}

export type PolygonProps = GeoCoordinatesProps | GeoCircleProps;

/**
 * Draws a polygon over the given coordinates
 */
export function Polygon(props: PolygonProps) {
  const { color, outlineColor, outlineWidth = 0 } = props;

  return (
    <PolygonViewNativeComponent
      {...(props as any)}
      color={(processColor(color) as number) || 0}
      outlineColor={(processColor(outlineColor) as number) || 0}
      outlineWidth={outlineWidth}
    />
  );
}

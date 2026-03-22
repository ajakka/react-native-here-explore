import { processColor } from 'react-native';
import type { ColorValue } from 'react-native';

import ArrowViewNativeComponent from './specs/ArrowViewNativeComponent';

import type { GeoPolyline } from '../types/Coordinates';

export interface ArrowProps {
  /**
   * ### **(REQUIRED)** List of coordinates used to draw the arrow
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

  /**
   * ### Color of the arrow
   *
   * **Possible values:**
   * - `white`, `black`, `red`, `green`, `blue`...
   * - `rgba(255, 255, 255, 255)`
   * - `#FFFFFFFF`
   *
   * **Example:**
   * ```
   * lineColor="green"
   * ```
   */
  lineColor?: ColorValue;

  /**
   * ### Width of the arrow
   *
   * **Example:**
   * ```
   * lineWidth={8}
   * ```
   */
  lineWidth?: number;
}

export function Arrow(props: ArrowProps) {
  return (
    <ArrowViewNativeComponent
      geoPolyline={props.geoPolyline}
      lineWidth={props.lineWidth}
      lineColor={(processColor(props.lineColor) as number) || 0}
    />
  );
}

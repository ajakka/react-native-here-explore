import React from 'react';
import type { ColorValue, ProcessedColorValue } from 'react-native';
import { UIManager, processColor, requireNativeComponent } from 'react-native';

import { LINKING_ERROR } from '../Constant';
import type { GeoCircle, GeoPolyline } from '../types/Coordinates';

const COMPONENT_NAME = 'PolygonView';

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

interface RCTPolygonProps extends Omit<PolygonProps, 'color' | 'outlineColor'> {
  color: ProcessedColorValue;
  outlineColor: ProcessedColorValue;
}

const RCTPolygon =
  UIManager.getViewManagerConfig(COMPONENT_NAME) != null
    ? requireNativeComponent<RCTPolygonProps>(COMPONENT_NAME)
    : () => {
        throw new Error(LINKING_ERROR);
      };

/**
 * Draws a polygon over the given coordinates
 */
export function Polygon(props: PolygonProps) {
  const { color, outlineColor, outlineWidth = 0 } = props;

  return (
    <RCTPolygon
      {...props}
      color={processColor(color) || 0}
      outlineColor={processColor(outlineColor) || 0}
      outlineWidth={outlineWidth}
    />
  );
}

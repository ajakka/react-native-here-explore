import React from 'react';

import { requireNativeComponent, UIManager } from 'react-native';
import { LINKING_ERROR } from '../Constant';
import type { ColorValue } from 'react-native';
import type { Coordinates } from '../types/Coordinates';

const COMPONENT_NAME = 'PolylineView';

/**
 * PolylineView is responsible of drawing a polyline on the map
 * given a list of coordinates
 */
export interface PolylineViewProps {
  /**
   * ### **(REQUIRED)** The coordinates used to draw the polyline.
   *
   * At least two coordinates are required before a line is displayed,
   * otherwise nothing will show up.
   *
   * **Example:**
   * ```
   * coordinates={[
   *      { lat: 99.00990, lon: 9.00990 },
   *      { lat: 99.00990, lon: 9.00990 },
   *     ]}
   * ```
   */
  coordinates: Coordinates[];

  /**
   * ### A color value used to color the polyline.
   *
   * basic color names like: `red`, `blue`, `green`, `black`, `white`, etc...
   * are accepted but it's recomended to use hexadecimal values instead.
   *
   * **Default value:** `white`
   *
   * **Example:**
   * ```
   * lineColor="#0F0F0F"
   * ```
   */
  lineColor?: ColorValue;

  /**
   * ### Controls the line thickness
   *
   * **Default value:** `8.0`
   *
   * **Example:**
   * ```
   * lineWidth={8.0}
   * ```
   */
  lineWidth?: number;

  /**
   * ### The unit used to calculate the line thickness
   *
   * **Default value:** `PIXELS`
   *
   * **Possible values:**
   * - `PIXELS`
   * - `DENSITY_INDEPENDENT_PIXELS`
   * - `METERS`
   *
   * **Example:**
   *
   * ```
   * lineWidthUnit="PIXELS"
   * ```
   *
   * **Note:** (FIXME) This property is currently fixated on the value `PIXELS`
   * and cannot be changed due to an issue that causes the library to
   * crash when using other units
   */
  lineWidthUnit?: 'PIXELS' | 'DENSITY_INDEPENDENT_PIXELS' | 'METERS';
}

const RCTPolylineView =
  UIManager.getViewManagerConfig(COMPONENT_NAME) != null
    ? requireNativeComponent<PolylineViewProps>(COMPONENT_NAME)
    : () => {
        throw new Error(LINKING_ERROR);
      };

export function PolylineView(props: PolylineViewProps) {
  const {
    coordinates = [],
    lineColor = 'white',
    lineWidth = 8,
    // lineWidthUnit = 'PIXELS',
  } = props;

  return (
    <RCTPolylineView
      coordinates={coordinates}
      lineColor={lineColor}
      lineWidth={lineWidth}
      // lineWidthUnit={lineWidthUnite}
      lineWidthUnit={'PIXELS'}
    />
  );
}

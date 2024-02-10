import React from 'react';
import { UIManager, processColor, requireNativeComponent } from 'react-native';
import type { ColorValue, ProcessedColorValue } from 'react-native';

import { LINKING_ERROR } from '../Constant';
import type { GeoPolyline } from '../types/Coordinates';

const COMPONENT_NAME = 'ArrowView';

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

interface RCTArrowProps extends Omit<ArrowProps, 'lineColor'> {
  lineColor: ProcessedColorValue;
}

const RCTArrow =
  UIManager.getViewManagerConfig(COMPONENT_NAME) != null
    ? requireNativeComponent<RCTArrowProps>(COMPONENT_NAME)
    : () => {
        throw new Error(LINKING_ERROR);
      };

export function Arrow(props: ArrowProps) {
  return (
    <RCTArrow
      geoPolyline={props.geoPolyline}
      lineWidth={props.lineWidth}
      lineColor={processColor(props.lineColor) || 0}
    />
  );
}

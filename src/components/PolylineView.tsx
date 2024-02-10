import React from 'react';
import { UIManager, processColor, requireNativeComponent } from 'react-native';
import type { ColorValue, ProcessedColorValue } from 'react-native';

import { LINKING_ERROR } from '../Constant';
import type { GeoPolyline } from '../types/Coordinates';
import type { LineCap } from '../types/LineCap';

const COMPONENT_NAME = 'PolylineView';

interface BasePolylineProps {
  /**
   * ### **(REQUIRED)** The coordinates used to draw the polyline.
   *
   * At least two coordinates are required before a line is displayed,
   * otherwise nothing will show up.
   *
   * **Example:**
   * ```
   * geoPolyline={[
   *   { latitude: 99.00990, longitude: 9.00990, altitude: 1.3 },
   *   { latitude: 99.00990, longitude: 9.00990, altitude: 1.3 },
   * ]}
   * ```
   */
  geoPolyline: GeoPolyline;

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
   * ### A color value used to color the polyline.
   *
   * **Default value:** `white`
   *
   * **Possible values:**
   * - `white`, `black`, `red`, `green`, `blue`...
   * - `rgba(255, 255, 255, 255)`
   * - `#FFFFFFFF`
   *
   * **Example:**
   * ```
   * lineColor="#0F0F0F"
   * ```
   */
  lineColor?: ColorValue;
}

interface RCTBasePolylineProps extends Omit<BasePolylineProps, 'lineColor'> {
  lineColor: ProcessedColorValue;
}

interface SolidLineProps {
  /**
   * ### Controls the line type
   *
   * **Possible values:**
   * - `SOLID`
   * - `DASH`
   *
   * **Example:**
   * ```
   * lineType="SOLID"
   * ```
   */
  lineType: 'SOLID';

  /**
   * ### Controls the line thickness
   *
   * **Default value:** `8.0`
   *
   * **Example:**
   * ```
   * outlineWidth={8.0}
   * ```
   */
  outlineWidth?: number;

  /**
   * ### A color value used to color the polyline.
   *
   * **Default value:** `white`
   *
   * **Possible values:**
   * - `white`, `black`, `red`, `green`, `blue`...
   * - `rgba(255, 255, 255, 255)`
   * - `#FFFFFFFF`
   *
   * **Example:**
   * ```
   * outlineColor="#0F0F0F"
   * ```
   */
  outlineColor?: ColorValue;

  /**
   * ### Changes the end of the line
   *
   * **Possible values:**
   * - `ROUND`
   * - `SQUARE`
   * - `BUTT`
   *
   * **Example:**
   * ```
   * capShape="#0F0F0F"
   * ```
   */
  capShape?: LineCap;
}

interface RCTSolidLineProps extends Omit<SolidLineProps, 'outlineColor'> {
  outlineColor: ProcessedColorValue;
}

interface DashLineProps {
  /**
   * ### Controls the line type
   *
   * **Possible values:**
   * - `SOLID`
   * - `DASH`
   *
   * **Example:**
   * ```
   * lineType="DASH"
   * ```
   */
  lineType: 'DASH';

  /**
   * ### Controls how tall is the line
   *
   * **Example:**
   * ```
   * lineLength={8}
   * ```
   */
  lineLength?: number;

  /**
   * ### Controls how tall is the gap
   *
   * **Example:**
   * ```
   * gapLength={8}
   * ```
   */
  gapLength: number;

  /**
   * ### Changes the gap color
   *
   * **Possible values:**
   * - `white`, `black`, `red`, `green`, `blue`...
   * - `rgba(255, 255, 255, 255)`
   * - `#FFFFFFFF`
   *
   * **Example:**
   * ```
   * gapColor={8}
   * ```
   */
  gapColor?: ColorValue;
}

interface RCTDashLineProps extends Omit<DashLineProps, 'gapColor'> {
  gapColor: ProcessedColorValue;
}

export type PolylineProps = BasePolylineProps &
  (DashLineProps | SolidLineProps);

type RCTPolylineProps = RCTBasePolylineProps &
  (RCTDashLineProps | RCTSolidLineProps);

const RCTPolyline =
  UIManager.getViewManagerConfig(COMPONENT_NAME) != null
    ? requireNativeComponent<RCTPolylineProps>(COMPONENT_NAME)
    : () => {
        throw new Error(LINKING_ERROR);
      };

/**
 * Polyline is responsible of drawing a polyline on the map
 * given a list of coordinates
 */
export function Polyline(props: PolylineProps) {
  const { lineType, geoPolyline = [] } = props;

  if (lineType === 'DASH') {
    return (
      <RCTPolyline
        geoPolyline={geoPolyline}
        lineType={lineType}
        lineWidth={props.lineWidth}
        lineColor={processColor(props.lineColor) || 0}
        lineLength={props.lineLength}
        gapColor={processColor(props.gapColor) || 0}
        gapLength={props.gapLength || 2}
      />
    );
  } else {
    return (
      <RCTPolyline
        geoPolyline={geoPolyline}
        lineType={lineType}
        lineWidth={props.lineWidth}
        lineColor={processColor(props.lineColor) || 0}
        outlineWidth={props.outlineWidth}
        outlineColor={processColor(props.outlineColor) || 0}
        capShape={props.capShape}
      />
    );
  }
}

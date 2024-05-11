import React from 'react';
import { UIManager, processColor, requireNativeComponent } from 'react-native';
import type { ColorValue, ProcessedColorValue } from 'react-native';

import { LINKING_ERROR } from '../Constant';
import type { GeoCoordinates, GeoPolyline } from '../types/Coordinates';
import type { LineCap } from '../types/LineCap';

const COMPONENT_NAME = 'RoutingView';


interface RoutingDetailsInterface {
  estimatedTravelTimeInSeconds: number,
  estimatedTrafficDelayInSeconds: number,
  lengthInMeters: number
}

interface BaseRoutingProps {

    /**
   * ### **(REQUIRED)** The coordinates used to draw the polyline for the destination.
   *
   * This specifies the destination point for the routing.
   *
   * **Example:**
   * ```
   * destinationCoordinates={{ latitude: 99.00990, longitude: 9.00990, altitude: 1.3 }}
   * ```
   */
    destinationCoordinates: GeoCoordinates;

    /**
     * ### **(REQUIRED)** The coordinates used to draw the polyline for the origin.
     *
     * This specifies the origin point for the routing.
     *
     * **Example:**
     * ```
     * originCoordinates={{ latitude: 99.00990, longitude: 9.00990, altitude: 1.3 }}
     * ```
     */
    originCoordinates: GeoCoordinates;

  
  /** The Coordinates used to add waypoints on the map.

  * **Example:**
     * ```
     * wayPoints={[
     *  { latitude: 99.00990, longitude: 9.00990, altitude: 1.3 },
     *  { latitude: 99.00990, longitude: 9.00990, altitude: 1.3 },
     * ]}
     * ```
     */
  wayPoints?: GeoPolyline;

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
   * A function to handle sending routing details.
   * 
   * @param data - An object containing routing details such as estimated travel time,
   * estimated traffic delay, and length of the route.
   * 
   * Example:
   * ```
   * {
   *    estimatedTravelTimeInSeconds: 3600,
   *    estimatedTrafficDelayInSeconds: 300,
   *    lengthInMeters: 15000
   * }
   * ```
   */
  onSendMessageRoutingDetails? : (data: RoutingDetailsInterface) => void;

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

interface RCTBasePolylineProps extends Omit<BaseRoutingProps, 'lineColor'> {
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

export type RoutingProps = BaseRoutingProps &
  (DashLineProps | SolidLineProps);

type RCTRoutingProps = RCTBasePolylineProps &
  (RCTDashLineProps | RCTSolidLineProps);

const RCTRouting =
  UIManager.getViewManagerConfig(COMPONENT_NAME) != null
    ? requireNativeComponent<RCTRoutingProps>(COMPONENT_NAME)
    : () => {
        throw new Error(LINKING_ERROR);
      };

/**
 * Polyline is responsible of drawing a polyline on the map
 * given a list of coordinates
 */
export function Routing(props: RoutingProps) {
  const { 
    lineType, 
    wayPoints = [], 
   } = props;

  if (lineType === 'DASH') {
    return (
      <RCTRouting
        originCoordinates={props.originCoordinates}
        destinationCoordinates={props.destinationCoordinates}
        wayPoints={wayPoints}
        lineType={lineType}
        lineWidth={props.lineWidth}
        lineColor={processColor(props.lineColor) || 0}
        lineLength={props.lineLength}
        gapColor={processColor(props.gapColor) || 0}
        gapLength={props.gapLength || 2}
        onSendMessageRoutingDetails={props.onSendMessageRoutingDetails}
      />
    );
  } else {
    return (
      <RCTRouting
        originCoordinates={props.originCoordinates}
        destinationCoordinates={props.destinationCoordinates}
        wayPoints={wayPoints}
        lineType={lineType}
        lineWidth={props.lineWidth}
        lineColor={processColor(props.lineColor) || 0}
        outlineWidth={props.outlineWidth}
        outlineColor={processColor(props.outlineColor) || 0}
        capShape={props.capShape}
        onSendMessageRoutingDetails={props.onSendMessageRoutingDetails}
      />
    );
  }
}

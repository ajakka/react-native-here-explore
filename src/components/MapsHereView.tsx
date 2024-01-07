import React from 'react';

import {
  requireNativeComponent,
  UIManager,
  type ViewProps,
} from 'react-native';
import { LINKING_ERROR } from '../Constant';
import type { Coordinates } from '../types/Coordinates';
import type { MapScheme } from '../types/MapScheme';
import type { ZoomKind } from '../types/ZoomKind';

const COMPONENT_NAME = 'MapsHereView';

export interface MapsHereViewProps extends ViewProps {
  /**
   * ### **(REQUIRED)** The coordinates used to position the map.
   *
   *
   * **Example:**
   * ```
   * coordinates={{ lat: 99.00990, lon: 9.00990 }}
   * ```
   */
  coordinates: Coordinates;

  /**
   * ### The map scheme used by the map
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
   *
   * ```
   * mapScheme="NORMAL_DAY"
   * ```
   */
  mapScheme?: MapScheme;

  /**
   * ### The zoom value, bigger means closer to the coordinates
   *
   * **Default value:** `8.0`
   *
   * **Example:**
   *
   * ```
   * zoomValue={8.0}
   * ```
   */
  zoomValue?: number;

  /**
   * ### The zoom methode used to calculate the zoom value
   *
   * **Default value:** `ZOOM_LEVEL`
   *
   * **Possible values:**
   * - `DISTANCE`
   * - `ZOOM_LEVEL`
   * - `SCALE`
   *
   * **Example:**
   *
   * ```
   * zoomKind="ZOOM_LEVEL"
   * ```
   *
   * **Note:** If you don't have a specific need for this value,
   * it's usually best to leave it to the default value: `ZOOM_LEVEL`
   */
  zoomKind?: ZoomKind;
}

const RCTMapsHereView =
  UIManager.getViewManagerConfig(COMPONENT_NAME) != null
    ? requireNativeComponent<MapsHereViewProps>(COMPONENT_NAME)
    : () => {
        throw new Error(LINKING_ERROR);
      };

/**
 * MapsHereView is the main view responsible for displaying the Map
 */
export function MapsHereView(props: MapsHereViewProps) {
  const {
    mapScheme = 'NORMAL_DAY',
    zoomValue = 8,
    zoomKind = 'ZOOM_LEVEL',
  } = props;

  return (
    <RCTMapsHereView
      {...props}
      mapScheme={mapScheme}
      zoomValue={zoomValue}
      zoomKind={zoomKind}
      style={[{ width: '100%', height: '100%' }, props.style]}
    />
  );
}

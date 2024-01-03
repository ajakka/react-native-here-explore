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
  coordinates: Coordinates;

  mapScheme?: MapScheme;

  zoomValue?: number;

  zoomKind?: ZoomKind;
}

const RCTMapsHereView =
  UIManager.getViewManagerConfig(COMPONENT_NAME) != null
    ? requireNativeComponent<MapsHereViewProps>(COMPONENT_NAME)
    : () => {
        throw new Error(LINKING_ERROR);
      };

export function MapsHereView(props: MapsHereViewProps) {
  const { mapScheme = 'NORMAL_DAY', zoomKind = 'ZOOM_LEVEL' } = props;
  return (
    <RCTMapsHereView mapScheme={mapScheme} zoomKind={zoomKind} {...props} />
  );
}

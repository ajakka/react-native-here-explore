import React from 'react';

import {
  requireNativeComponent,
  UIManager,
  type ViewProps,
} from 'react-native';
import { LINKING_ERROR } from '../constants';

export type ZoomKind = 'DISTANCE' | 'ZOOM_LEVEL' | 'SCALE';

export type MapScheme =
  | 'NORMAL_DAY'
  | 'NORMAL_NIGHT'
  | 'SATELLITE'
  | 'HYBRID_DAY'
  | 'HYBRID_NIGHT'
  | 'LITE_DAY'
  | 'LITE_NIGHT'
  | 'LITE_HYBRID_DAY'
  | 'LITE_HYBRID_NIGHT'
  | 'LOGISTICS_DAY';

export interface Coordinates {
  lat: number;
  lon: number;
}

export interface MapsHereViewProps extends ViewProps {
  mapScheme?: MapScheme;
  zoomKind?: ZoomKind;
  zoomValue?: number;
  coordinates?: Coordinates;
}

const COMPONENT_NAME = 'MapsHereView';

const RCTMapsHereView =
  UIManager.getViewManagerConfig(COMPONENT_NAME) != null
    ? requireNativeComponent<MapsHereViewProps>(COMPONENT_NAME)
    : () => {
        throw new Error(LINKING_ERROR);
      };

const MapsHereView: React.FC<MapsHereViewProps> = function (props) {
  return <RCTMapsHereView {...props} />;
};

MapsHereView.defaultProps = {
  mapScheme: 'NORMAL_DAY',
  zoomKind: 'ZOOM_LEVEL',
};

export default MapsHereView;

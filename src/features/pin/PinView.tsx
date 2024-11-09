import { UIManager, requireNativeComponent } from 'react-native';

import { LINKING_ERROR } from '../../constants';
import type { GeoCoordinates } from '../../types/Coordinates';
import type { ReactNode } from 'react';
import { PinContent } from './PinContentView';

const COMPONENT_NAME = 'PinView';

export interface PinProps {
  /**
   * ### **(REQUIRED)** Position of the pin on the map
   *
   * **Example:**
   * ```
   * geoCoordinates={{ latitude: 99.00990, longitude: 9.00990, altitude: 1.07 }}
   * ```
   */
  geoCoordinates: GeoCoordinates;

  /**
   * ### Define the anchor point used to define where the image should be placed relative to the coordinates
   *
   * More info on the official [documentation](https://www.here.com/docs/bundle/sdk-for-android-explore-developer-guide/page/topics/map-items.html#anchored-poi-markers)
   *
   * **Example:**
   * ```
   * anchor={{ horizontal: 0.5, vertical: 0.5 }}
   * ```
   */
  anchor?: { horizontal?: number; vertical?: number };

  /**
   * ### **(REQUIRED)** Child components to be rendered inside the Pin
   */
  children: ReactNode;
}

const RCTPin =
  UIManager.getViewManagerConfig(COMPONENT_NAME) != null
    ? requireNativeComponent<PinProps>(COMPONENT_NAME)
    : () => {
        throw new Error(LINKING_ERROR);
      };

/**
 * Draws a Pin over the given coordinates
 */
export function Pin(props: PinProps) {
  const { children, ...pinProps } = props;

  return (
    <RCTPin {...pinProps}>
      <PinContent>{children}</PinContent>
    </RCTPin>
  );
}

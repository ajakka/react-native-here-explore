import { requireNativeComponent, UIManager } from 'react-native';
import { LINKING_ERROR } from '../../constants';
import type { MapProps } from '../map/MapView';

const COMPONENT_NAME = 'NavigationView';

const RCTNavigationView =
  UIManager.getViewManagerConfig(COMPONENT_NAME) != null
    ? requireNativeComponent<MapProps>(COMPONENT_NAME)
    : () => {
        throw new Error(LINKING_ERROR);
      };

export type NavigationProps = MapProps;

/**
 * Navigation is the main view responsible for displaying the Map with Navigation
 */
export function Navigation({ style, ...otherProps }: NavigationProps) {
  return <RCTNavigationView style={[{ flex: 1 }, style]} {...otherProps} />;
}

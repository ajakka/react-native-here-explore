import { createRef, forwardRef, useImperativeHandle } from 'react';
import { findNodeHandle, requireNativeComponent, UIManager } from 'react-native';
import { linkingError } from '../../constants';
import { COMMAND_START_NAVIGATION, COMMAND_STOP_NAVIGATION, COMPONENT_NAME } from './constants';
import type { NavigationHandle, NavigationProps, Route } from './types';

const RCTNavigationView =
  UIManager.getViewManagerConfig(COMPONENT_NAME) != null
    ? requireNativeComponent<NavigationProps>(COMPONENT_NAME)
    : linkingError();

/**
 * Navigation is the main view responsible for displaying the Map with Navigation
 */
export const Navigation = forwardRef<NavigationHandle, NavigationProps>(({ style, ...otherProps }, ref) => {
  const nativeViewRef = createRef<any>();

  useImperativeHandle(ref, () => ({
    startNavigation: (route: Route) => {
      const viewTag = findNodeHandle(nativeViewRef.current);
      if (viewTag) {
        UIManager.dispatchViewManagerCommand(viewTag, COMMAND_START_NAVIGATION, [route]);
      } else {
        console.error('Failed to find native view handle for navigation');
      }
    },
    stopNavigation: () => {
      const viewTag = findNodeHandle(nativeViewRef.current);
      if (viewTag) {
        UIManager.dispatchViewManagerCommand(viewTag, COMMAND_STOP_NAVIGATION, []);
      } else {
        console.error('Failed to find native view handle for stopping navigation');
      }
    },
  }));

  return <RCTNavigationView ref={nativeViewRef} style={[{ flex: 1 }, style]} {...otherProps} />;
});

export * from './types';

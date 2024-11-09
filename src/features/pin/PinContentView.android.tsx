import {
  UIManager,
  StyleSheet,
  requireNativeComponent,
  View,
  type ViewStyle,
} from 'react-native';

import { LINKING_ERROR } from '../../constants';
import type { ReactNode } from 'react';

const COMPONENT_NAME = 'PinViewContent';

export interface PinProps {
  children: ReactNode;
  style?: ViewStyle;
}

const RCTPinContent =
  UIManager.getViewManagerConfig(COMPONENT_NAME) != null
    ? requireNativeComponent<PinProps>(COMPONENT_NAME)
    : () => {
        throw new Error(LINKING_ERROR);
      };

/**
 * Draws a Pin over the given coordinates
 */
export function PinContent(props: PinProps) {
  return (
    <RCTPinContent style={styles.pin}>
      <View style={styles.content}>{props.children}</View>
    </RCTPinContent>
  );
}

// Styles required to render Pin at correct position
const styles = StyleSheet.create({
  pin: {
    position: 'absolute',
  },
  content: {
    // some Pins may not render at correct position if this is omitted
    backgroundColor: 'transparent',
    alignItems: 'center',
    alignSelf: 'center',
  },
});

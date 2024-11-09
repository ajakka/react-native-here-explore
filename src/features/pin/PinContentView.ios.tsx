import { View, StyleSheet, type ViewStyle } from 'react-native';

import type { ReactNode } from 'react';

export interface PinProps {
  children: ReactNode;
  style?: ViewStyle;
}

/**
 * Draws a Pin over the given coordinates
 */
export function PinContent(props: PinProps) {
  // ensure single child
  return <View style={styles.content}>{props.children}</View>;
}

const styles = StyleSheet.create({
  content: {
    alignItems: 'center',
    alignSelf: 'center',
  },
});

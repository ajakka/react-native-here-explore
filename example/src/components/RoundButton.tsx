import React, { useRef } from 'react';
import {
  Animated,
  Pressable,
  StyleSheet,
  Text,
  View,
  type ColorValue,
  type PressableProps,
} from 'react-native';

export type RoundButtonProps = PressableProps & {
  image: JSX.Element;
  title: string;
  borderColor?: ColorValue;
  backgroundColor?: ColorValue;
  selected?: boolean;
};

export default function RoundButton(props: RoundButtonProps) {
  const {
    borderColor = '#535964',
    backgroundColor = '#292F3A',
    selected,
  } = props;
  const scale = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scale, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scale, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Pressable {...props} onPressIn={handlePressIn} onPressOut={handlePressOut}>
      <Animated.View
        style={[
          {
            borderColor,
            backgroundColor: selected
              ? darkenColor(backgroundColor)
              : backgroundColor,
          },
          styles.roundButton,
          { transform: [{ scale }] },
        ]}
      >
        {props.image}
      </Animated.View>
      <Text style={styles.roundButtonText}>{props.title}</Text>
    </Pressable>
  );
}

const darkenColor = (color: ColorValue) => {
  // Simple function to darken the color
  let colorString = color as string;
  const colorInt = parseInt(colorString.replace('#', ''), 16);
  const r = (colorInt >> 16) - 20;
  const g = ((colorInt >> 8) & 0x00ff) - 20;
  const b = (colorInt & 0x0000ff) - 20;
  return `#${(r < 0 ? 0 : r).toString(16)}${(g < 0 ? 0 : g).toString(16)}${(b <
  0
    ? 0
    : b
  ).toString(16)}`;
};

const styles = StyleSheet.create({
  roundButton: {
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderRadius: 32,
    width: 64,
    height: 64,
    marginHorizontal: 8,
  },
  roundButtonText: {
    color: 'white',
    fontSize: 14,
    alignSelf: 'center',
    marginTop: 4,
  },
});

import type { NativeStackScreenProps } from '@react-navigation/native-stack';

export type ScreenParams = {
  Home: undefined;
  Routes: undefined;
  Polyline: undefined;
  Navigation: undefined;
};

export type ScreenNames = keyof ScreenParams;

export type ScreenProps<T extends ScreenNames> = NativeStackScreenProps<ScreenParams, T>;

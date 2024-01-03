import { Platform } from 'react-native';

export const LINKING_ERROR =
  `The package 'react-native-maps-here' doesn't seem to be linked. Make sure: \n\n` +
  Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
  '- You rebuilt the app after installing the package\n' +
  '- You are not using Expo Go\n';

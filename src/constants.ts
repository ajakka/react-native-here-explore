import { Platform } from 'react-native';

export const LINKING_ERROR =
  `The package 'react-native-here-navigate' doesn't seem to be linked. Make sure: \n\n` +
  Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
  '- You rebuilt the app after installing the package\n';

export const linkingError = () => {
  throw new Error(LINKING_ERROR);
};

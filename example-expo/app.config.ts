import { type ExpoConfig, type ConfigContext } from 'expo/config';

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: 'HereExploreExpoExample',
  slug: 'here-explore-expo-example',
  version: '1.0.0',
  orientation: 'portrait',
  icon: './assets/icon.png',
  userInterfaceStyle: 'dark',
  scheme: 'here-explore-expo-example',
  splash: {
    image: './assets/splash-icon.png',
    resizeMode: 'contain',
    backgroundColor: '#292F3A',
  },
  ios: {
    supportsTablet: true,
    bundleIdentifier: 'com.hereexplore.expoexample',
  },
  android: {
    adaptiveIcon: {
      backgroundColor: '#292F3A',
      foregroundImage: './assets/android-icon-foreground.png',
    },
    package: 'com.hereexplore.expoexample',
  },
  plugins: [
    [
      'react-native-here-explore',
      {
        sdkPath: './here-sdk',
      },
    ],
    'expo-router',
  ],
});

import { type ConfigPlugin, createRunOncePlugin } from '@expo/config-plugins';
import { withHereExploreAndroid } from './withHereExploreAndroid';
import { withHereExploreIOS } from './withHereExploreIOS';

export interface HereExplorePluginProps {
  /**
   * Path to the directory containing the HERE SDK files.
   * Should contain heresdk.xcframework (iOS) and/or *.aar (Android).
   * Resolved relative to the project root.
   *
   * @example './here-sdk'
   */
  sdkPath: string;
}

const withHereExplore: ConfigPlugin<HereExplorePluginProps> = (
  config,
  props
) => {
  if (!props?.sdkPath) {
    throw new Error(
      '[react-native-here-explore] Config plugin requires "sdkPath" — the directory containing the HERE SDK files (heresdk.xcframework and/or *.aar).'
    );
  }

  config = withHereExploreIOS(config, props);
  config = withHereExploreAndroid(config, props);

  return config;
};

export default createRunOncePlugin(
  withHereExplore,
  'react-native-here-explore'
);

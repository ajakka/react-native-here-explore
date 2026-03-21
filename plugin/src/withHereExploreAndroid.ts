import {
  type ConfigPlugin,
  withAppBuildGradle,
  withDangerousMod,
} from '@expo/config-plugins';
import fs from 'fs';
import path from 'path';
import type { HereExplorePluginProps } from './index';

export const withHereExploreAndroid: ConfigPlugin<HereExplorePluginProps> = (
  config,
  props
) => {
  // Step 1: Copy the AAR into android/heresdk/
  config = withDangerousMod(config, [
    'android',
    async (config) => {
      const { projectRoot, platformProjectRoot } = config.modRequest;
      const resolvedSdkPath = path.resolve(projectRoot, props.sdkPath);

      if (!fs.existsSync(resolvedSdkPath)) {
        console.warn(
          `[react-native-here-explore] SDK path "${resolvedSdkPath}" does not exist. Skipping Android setup.`
        );
        return config;
      }

      const entries = fs.readdirSync(resolvedSdkPath);
      const aarFile = entries.find((f) => f.endsWith('.aar'));

      if (!aarFile) {
        console.warn(
          `[react-native-here-explore] No .aar found in "${resolvedSdkPath}". Skipping Android setup.`
        );
        return config;
      }

      const heresdkDir = path.join(platformProjectRoot, 'heresdk');
      fs.mkdirSync(heresdkDir, { recursive: true });

      const src = path.join(resolvedSdkPath, aarFile);
      const dest = path.join(heresdkDir, aarFile);
      fs.copyFileSync(src, dest);

      return config;
    },
  ]);

  // Step 2: Add the AAR as an implementation dependency in app/build.gradle
  config = withAppBuildGradle(config, (config) => {
    const depLine =
      'implementation fileTree(dir: file("$rootDir/heresdk"), include: [\'*.aar\'])';

    if (!config.modResults.contents.includes(depLine)) {
      config.modResults.contents = config.modResults.contents.replace(
        /dependencies\s*\{/,
        `dependencies {\n    ${depLine}`
      );
    }

    return config;
  });

  return config;
};

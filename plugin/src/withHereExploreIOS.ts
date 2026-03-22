import { type ConfigPlugin, withDangerousMod } from '@expo/config-plugins';
import fs from 'fs';
import path from 'path';
import type { HereExplorePluginProps } from './index';

export const withHereExploreIOS: ConfigPlugin<HereExplorePluginProps> = (
  config,
  { sdkPath }
) => {
  return withDangerousMod(config, [
    'ios',
    async (config) => {
      const { projectRoot, platformProjectRoot } = config.modRequest;
      const resolvedSdkPath = path.resolve(projectRoot, sdkPath);

      // Find the .xcframework in the SDK directory
      if (!fs.existsSync(resolvedSdkPath)) {
        console.warn(
          `[react-native-here-explore] SDK path "${resolvedSdkPath}" does not exist. Skipping iOS setup.`
        );
        return config;
      }

      const entries = fs.readdirSync(resolvedSdkPath);
      const xcframeworkName = entries.find((f) => f.endsWith('.xcframework'));

      if (!xcframeworkName) {
        console.warn(
          `[react-native-here-explore] No .xcframework found in "${resolvedSdkPath}". Skipping iOS setup.`
        );
        return config;
      }

      const frameworksDir = path.join(platformProjectRoot, 'Frameworks');
      fs.mkdirSync(frameworksDir, { recursive: true });

      // Copy the xcframework into ios/Frameworks/
      const src = path.join(resolvedSdkPath, xcframeworkName);
      const dest = path.join(frameworksDir, xcframeworkName);
      fs.cpSync(src, dest, { recursive: true });

      // Write a local podspec so CocoaPods can resolve the dependency
      const podspec = [
        'Pod::Spec.new do |s|',
        '  s.name         = "heresdk"',
        '  s.version      = "1.0.0"',
        '  s.summary      = "HERE SDK for iOS"',
        '  s.homepage     = "https://platform.here.com/portal/sdk"',
        '  s.license      = { :type => "Commercial" }',
        '  s.author       = "HERE Technologies"',
        '  s.source       = { :http => "https://platform.here.com" }',
        '  s.platform     = :ios',
        `  s.ios.vendored_frameworks = "${xcframeworkName}"`,
        'end',
        '',
      ].join('\n');
      fs.writeFileSync(path.join(frameworksDir, 'heresdk.podspec'), podspec);

      // Add the heresdk pod to the Podfile
      const podfilePath = path.join(platformProjectRoot, 'Podfile');
      let podfile = fs.readFileSync(podfilePath, 'utf-8');

      const podLine = "pod 'heresdk', :path => 'Frameworks'";
      if (!podfile.includes(podLine)) {
        // Insert after use_native_modules! line (handles both bare and Expo Podfiles)
        podfile = podfile.replace(
          /(use_native_modules!.*\n)/,
          `$1\n  ${podLine}\n`
        );
        fs.writeFileSync(podfilePath, podfile);
      }

      return config;
    },
  ]);
};

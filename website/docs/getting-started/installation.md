---
sidebar_position: 1
---

# Installation

This guide covers installing `react-native-here-explore` and the native HERE SDKs for both **Expo** and **bare React Native** projects.

- **Expo projects**: Follow steps 1–3, then jump to [Expo Setup](#expo-setup-config-plugin).
- **Bare React Native**: Follow all steps in order.

---

## Install the npm package

```sh
# npm
npm install react-native-here-explore

# yarn
yarn add react-native-here-explore
```

---

## Step 1 — Sign up to HERE Platform

Go to [platform.here.com/sign-up](https://platform.here.com/sign-up) and create a free account.

:::important
You must add billing information to unlock both the iOS and Android SDKs. The free tier is generous and no charge is made without exceeding limits.
:::

## Step 2 — Create OAuth 2.0 credentials

1. Open the [Apps](https://platform.here.com/admin/apps?action=new-registration) page and register a new application.
2. In the **Credentials** tab, select **OAuth 2.0** and click **Create credentials**.
3. Download the credentials file. It will look like:

```env
here.access.key.id = YOUR_ACCESS_KEY_ID
here.access.key.secret = YOUR_ACCESS_KEY_SECRET
```

Keep these values — you will need them to [initialize the SDK](./initialization).

## Step 3 — Download the HERE SDK Explore Edition

Go to [platform.here.com/portal/sdk](https://platform.here.com/portal/sdk) and download:

- **HERE SDK Explore Edition for Android** — produces a `.aar` file
- **HERE SDK Explore Edition for iOS** — produces a `.xcframework` folder

---

## Expo Setup (Config Plugin)

If you use Expo, the config plugin handles all native setup automatically during `expo prebuild`.

### 1. Place SDK files in your project

```
your-project/
├── here-sdk/
│   ├── heresdk.xcframework        ← iOS
│   └── heresdk-explore-android-xxx.aar  ← Android
├── app.config.ts
└── ...
```

### 2. Add the config plugin

In `app.config.ts` (or `app.config.js`):

```typescript
export default {
  plugins: [
    [
      'react-native-here-explore',
      {
        sdkPath: './here-sdk',
      },
    ],
  ],
};
```

### 3. Run prebuild

```sh
npx expo prebuild
```

The plugin will automatically:
- **iOS**: Copy the `.xcframework` into `ios/Frameworks/`, generate `heresdk.podspec`, and add the pod to the Podfile.
- **Android**: Copy the `.aar` into `android/heresdk/` and add the `implementation` dependency to `app/build.gradle`.

You can re-run `expo prebuild --clean` at any time to reset the native setup.

---

## Bare React Native Setup

### Android

1. Copy the `.aar` file from the downloaded SDK into `your-project/android/heresdk/`.

2. In `android/app/build.gradle`, add to the `dependencies` block:

```groovy
dependencies {
    // ... other dependencies

    // HERE SDK
    implementation fileTree(dir: file("../heresdk"), include: ['*.aar'])
}
```

### iOS

1. Copy the `heresdk.xcframework` folder into `your-project/ios/Frameworks/`.

2. In the same `ios/Frameworks/` directory, create `heresdk.podspec`:

```ruby
Pod::Spec.new do |s|
  s.name         = "heresdk"
  s.version      = "1.0.0"
  s.summary      = "HERE SDK Explore Edition"
  s.homepage     = "https://platform.here.com/portal/sdk"
  s.author       = { "HERE" => "support@here.com" }
  s.source       = { :http => 'http://example.com/heresdk.zip' }
  s.platform     = :ios
  s.ios.vendored_frameworks = 'heresdk.xcframework'
end
```

3. In your `ios/Podfile`, reference the SDK and add the target membership hook:

```ruby
target 'YourApp' do
  # ... other pods

  pod 'heresdk', :path => 'Frameworks'
end

post_install do |installer|
  # ... other post_install hooks

  installer.pods_project.targets.each do |target|
    if target.name == "react-native-here-explore"
      all_filerefs = installer.pods_project.files
      all_filerefs.each do |fileref|
        if fileref.path.end_with?("heresdk.xcframework")
          build_phase = target.frameworks_build_phase
          unless build_phase.files_references.include?(fileref)
            build_phase.add_file_reference(fileref)
          end
        end
      end
    end
  end
end
```

4. Run `pod install` from the `ios/` directory.

---

## Next Step

[Initialize the HERE SDK](./initialization) with your credentials.

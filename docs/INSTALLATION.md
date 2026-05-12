<h1 align="center">
    <strong>Installation</strong>
</h1>

Before we can use the HERE SDKs properly, we have to do some setup to get it to work.

- **Expo projects**: Follow steps 1-3, then skip to [Expo Setup](#expo-setup-config-plugin).
- **Bare React Native projects**: Follow all steps in order.

## Installing the library

```sh
# using npm
npm install react-native-here-explore

# using yarn
yarn add react-native-here-explore
```

## 1. Sign up to [HERE Platform](https://platform.here.com/sign-up)

First, you need to get the access keys from the official HERE web portal.

Keep in mind that providing the billing info is important to unlock the SDKs for both iOS and Android.

## 2. Register a new app

Go to this [link](https://platform.here.com/admin/apps?action=new-registration) and register a new application.

After that, it should bring you to a menu with the tab `Credentials` selected by default.

On the left menu, select **OAuth 2.0** and click **Create credentials**.

A popup menu will show up saying: **Your access key ID and secret were created** with a Download button to get the credentials.

The content of your downloaded file should be like this:

```env
here.user.id = YOUR_USER_ID
here.client.id = YOUR_APP_ID
here.access.key.id = ACCESS_KEY_ID
here.access.key.secret = ACCESS_KEY_SECRET
here.token.endpoint.url = https://account.api.here.com/oauth2/token
```

This step is important to get the access keys that you will then use to initialize the SDKs later on.

## 3. Download the [HERE SDK Explore Edition](https://platform.here.com/portal/sdk)

On the page above, you will see a list of SDKs. The ones you need are:

- **HERE SDK Explore Edition for Android**
- **HERE SDK Explore Edition for iOS**

If you signed in and added billing info, you should see a **Get now** button to download each SDK.

## 4. Extract and move the SDKs to your project (Bare React Native)

- ### Android

After you download and extract the zip file, you should see a `.aar` file amongst many others.

Copy that file and place it in `your-project/android/heresdk` folder.

Then go to your `your-project/android/app/build.gradle` file and edit the dependencies block like below:

```gradle
dependencies {
    // ... other react dependencies

    // Import HERE SDK
    implementation fileTree(dir: file("../heresdk"), include: ['*.aar'])
}
```

- ### iOS

After you download and extract the zip file, you should see a `.xcframework` folder (`heresdk.xcframework`).

Copy that folder and place it in `your-project/ios/Frameworks`.

In the same folder (`your-project/ios/Frameworks`), create a podspec file named `heresdk.podspec` and paste in the following:

```ruby
Pod::Spec.new do |s|
  s.name         = "heresdk"
  s.version      = "1.0.0"
  s.summary      = "HERE SDK Explore Edition"
  s.homepage     = "https://platform.here.com/portal/sdk"
  s.author       = { "HERE Team" => "author@example.com" }
  s.source       = { :http => 'http://example.com/heresdk.zip' }
  s.platform     = :ios
  s.ios.vendored_frameworks = 'heresdk.xcframework'
end
```

> The information in this podspec doesn't have to be exact — CocoaPods only needs it to recognize the xcframework.

After that, open `your-project/ios/Podfile` and add the pod and the `post_install` hook:

```ruby
target 'YourApp' do
  # ... other pods

  # Import HERE SDK
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

Finally, in your terminal, run `pod install`.

## Expo Setup (Config Plugin)

If you're using Expo, you can skip the manual native setup above. The library includes an Expo config plugin that handles everything automatically during `expo prebuild`.

> Note: this library is only tested on Expo SDK 55.

### 1. Place the SDK files in your project

Create a directory (e.g., `here-sdk/`) in your project root and place both platform SDK files inside:

```
your-project/
├── here-sdk/
│   ├── heresdk.xcframework   (iOS)
│   └── heresdk-explore-android-xxx.aar   (Android)
├── app.config.ts
└── ...
```

### 2. Add the config plugin

In your `app.config.ts` (or `app.config.js`), add the plugin with the path to your SDK directory:

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

The config plugin will automatically:

- **iOS**: Copy the `.xcframework` into `ios/Frameworks/`, generate the `heresdk.podspec`, and add the pod to the Podfile.
- **Android**: Copy the `.aar` into `android/heresdk/` and add the `implementation` dependency to `app/build.gradle`.

You can re-run `expo prebuild --clean` at any time and the SDK will be set up again automatically.

### 4. Initialize the SDK

With Expo, you can use `EXPO_PUBLIC_` environment variables. Create a `.env` file in your project root:

```env
EXPO_PUBLIC_HERE_ACCESS_KEY_ID=YOUR_ACCESS_KEY_ID
EXPO_PUBLIC_HERE_ACCESS_KEY_SECRET=YOUR_ACCESS_KEY_SECRET
```

Then initialize the SDK in your root layout or entry file:

```typescript
import { HEREConfig } from 'react-native-here-explore';

HEREConfig.initializeHereSDK(
  process.env.EXPO_PUBLIC_HERE_ACCESS_KEY_ID!,
  process.env.EXPO_PUBLIC_HERE_ACCESS_KEY_SECRET!
);
```

---

## Authenticate using credentials (Bare React Native)

After setting up the SDKs on both platforms, initialize them using the `ACCESS_KEY_ID` and `ACCESS_KEY_SECRET` retrieved previously.

In your `index.ts`, add this before `AppRegistry.registerComponent`:

```typescript
import { HEREConfig } from 'react-native-here-explore';
import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';

HEREConfig.initializeHereSDK('YOUR_ACCESS_KEY_ID', 'YOUR_ACCESS_KEY_SECRET');

AppRegistry.registerComponent(appName, () => App);
```

If all done correctly, you should have HERE Maps working.

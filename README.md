# react-native-maps-here

react-native-maps-here library aims to bring HERE Maps SDKs into React Native

## Installation

```sh
npm install react-native-maps-here

or

yarn add react-native-maps-here
```

## Initial setup

Before we can use the HERE SDKs properlly, we have to do some manual setup to get it to work.

### 1. Sign-up to [HERE Platform](https://platform.here.com/sign-up)

First you need to get the access keys from the official HERE web portal.

Keep in mind that providing the billing info is important to unlock the SDKs for both iOS and Android

### 2. Regiter a new app

Go to this [link](https://platform.here.com/admin/apps?action=new-registration) and regiter a new application.

After that it should bring you to a menu with the tab `Credentials` selected by default.

On the left menu select **OAuth 2.0** and click **Create credentials**

A popup menu will showup saying: **Your access key ID and secret were created** with a Download button to get the credentials

The content of your downloaded file should be like this:

```env
here.user.id = YOUR_USER_ID
here.client.id = YOUR_APP_ID
here.access.key.id = ACCESS_KEY_ID
here.access.key.secret = ACCESS_KEY_SECRET
here.token.endpoint.url = https://account.api.here.com/oauth2/token
```

This step is important to get the access keys that you will then use to initialize the SDKs later on.

### 3. Download the [HERE SDK Explore Edition](https://platform.here.com/portal/sdk)

On the Page above you will see a list of SDKs. The ones you need are:

- **HERE SDK Explore Edition for Android**
- **HERE SDK Explore Edition for iOS**

If you signed in and added billing info, you should see a **Get now** button to download each SDK

### 4. Extract and move the SDKs to your project

- Android

After you download and extract the zip file you should see a .aar file amongst many others

Copy that file and place it on `your-project/android/app/libs` folder

Then go to your `your-project/android/app/build.gradle` file and edit the dependencies block like bellow

```gradle
dependencies {
    // ... other react dependencies

    // Import HERE SDK
    implementation fileTree(dir: 'libs', include: ['*.aar', '*.jar'])
}
```

- iOS

After you download and extract the zip file you should see a .xcframework folder (heresdk.xcframework)

Copy that file and place it on `your-project/ios/Frameworks` folder.

On the same folder (ie `your-project/ios/Frameworks`) create a podspec file with the name `heresdk.podspec`

and past in the following:

```podspec
Pod::Spec.new do |s|
  s.name         = "heresdk"
  s.version      = "1.0.0"
  s.summary      = "Description of HERE SDK"
  s.homepage     = "https://platform.here.com/portal/sdk"
  s.author       = { "HERE Team" => "author@example.com" }
  s.source       = { :http => 'http://example.com/heresdk.zip' }
  s.platform     = :ios
  s.ios.vendored_frameworks = 'heresdk.xcframework'
end
```

Note that: The information in this podspec doesn't have to be exact since we only want Cocoapods to recognise the xcframework

After that open `your-project/ios/Podfile` and add the library you just moved:

```podspec
target 'MapsHereExample' do
  # ... some stuff

  use_react_native!(
    # ...some other stuff
  )

  # Import HERE SDK
  pod 'heresdk', :path => 'Frameworks'
end
```

Finaly in your terminal run `pod install`

## Athenticate using credentials

After setting up the SDKs on both platforms, we should do one last step that is to authenticate.

### - Android

open your `MainActivity.java` file located in `your-project/android/app/src/java/com/your_project/MainActivity.java`

and edit the following:

```diff
package com.your_project;

+import android.os.Bundle;

import com.facebook.react.ReactActivity;
import com.facebook.react.ReactActivityDelegate;
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint;
import com.facebook.react.defaults.DefaultReactActivityDelegate;
+import com.here.sdk.core.engine.SDKNativeEngine;
+import com.here.sdk.core.engine.SDKOptions;
+import com.here.sdk.core.errors.InstantiationErrorException;

public class MainActivity extends ReactActivity {

+  @Override
+  protected void onCreate(Bundle savedInstanceState) {
+    super.onCreate(savedInstanceState);
+    initializeHERESDK();
+  }

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  @Override
  protected String getMainComponentName() {
    return "MapsHereExample";
  }

  /**
   * Returns the instance of the {@link ReactActivityDelegate}. Here we use a util class {@link
   * DefaultReactActivityDelegate} which allows you to easily enable Fabric and Concurrent React
   * (aka React 18) with two boolean flags.
   */
  @Override
  protected ReactActivityDelegate createReactActivityDelegate() {
    return new DefaultReactActivityDelegate(
        this,
        getMainComponentName(),
        // If you opted-in for the New Architecture, we enable the Fabric Renderer.
        DefaultNewArchitectureEntryPoint.getFabricEnabled());
  }

+  private void initializeHERESDK() {
+    // TODO: YOUR_ACCESS_KEY_ID
+    String accessKeyID = "YOUR_ACCESS_KEY_ID";
+
+    // TODO: YOUR_ACCESS_KEY_SECRET
+    String accessKeySecret = "YOUR_ACCESS_KEY_SECRET";
+
+    SDKOptions options = new SDKOptions(accessKeyID, accessKeySecret);
+    try {
+      SDKNativeEngine.makeSharedInstance(this, options);
+    } catch (InstantiationErrorException e) {
+      throw new RuntimeException("Initialization of HERE SDK failed: " + e.error.name());
+    }
+  }
}
```

Replace YOUR_ACCESS_KEY_ID with your `here.access.key.id` that you got earlier

Replace YOUR_ACCESS_KEY_SECRET with your `here.access.key.secret` that you got earlier

### - iOS

Open up your .xcworkspace in XCode and create a Swift file named `HERESDKManager.swift`.

When prompted to create a bridging header, hit yes.

Copy the following onto your swift file:

```swift
import Foundation
import heresdk

@objc class HERESDKManager: NSObject {

  @objc static let shared = HERESDKManager()

  private override init() {
    // Private initialization to ensure singleton instance
    super.init()
  }

  @objc func initializeHERESDK() {
    // TODO: YOUR_ACCESS_KEY_ID
    let accessKeyID = "YOUR_ACCESS_KEY_ID"

    // TODO: YOUR_ACCESS_KEY_SECRET
    let accessKeySecret = "YOUR_ACCESS_KEY_SECRET"

    let options = SDKOptions(accessKeyId: accessKeyID, accessKeySecret: accessKeySecret)

    print("SDKOptions created successfully")
    do {
      try SDKNativeEngine.makeSharedInstance(options: options)
      print("SDKOptions engine started")
    } catch let error {
      fatalError("Failed to initialize the HERE SDK. Cause: \(error)")
    }
  }

  @objc func disposeHERESDK() {
    SDKNativeEngine.sharedInstance = nil
    MapView.deinitialize()
  }
}
```

Again, replace YOUR_ACCESS_KEY_ID and YOUR_ACCESS_KEY_SECRET with values you got from the begining

Then modify AppDelegate.h by adding and import that starts with `YourProject-Swift.h`

the word **YourProject** should be the folder name of where your AppDelegate.h exists

The result should look like this:

```diff
#import <RCTAppDelegate.h>
#import <UIKit/UIKit.h>
+#import "MapsHereExample-Swift.h"

@interface AppDelegate : RCTAppDelegate

@end
```

Finally edit the following on your `AppDelegate.mm`:

```diff
#import "AppDelegate.h"

#import <React/RCTBundleURLProvider.h>

@implementation AppDelegate

 - (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  self.moduleName = @"MapsHereExample";
  // You can add your custom initial props in the dictionary below.
  // They will be passed down to the ViewController used by React Native.
  self.initialProps = @{};

+  [[HERESDKManager shared] initializeHERESDK];
  return [super application:application didFinishLaunchingWithOptions:launchOptions];
}

 - (NSURL *)sourceURLForBridge:(RCTBridge *)bridge
{
#if DEBUG
  return [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index"];
#else
  return [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
#endif
}

+- (void)applicationWillTerminate:(UIApplication *)application {
+    // Dispose HERE SDK
+    [[HERESDKManager shared] disposeHERESDK];
+}

@end
```

And that is it. If all done correctly, you should have HERE Maps working

## Usage

This is an example snippet Using `MapsHereView` to show the Map

```tsx
import * as React from 'react';
import { StyleSheet } from 'react-native';
import { MapsHereView } from 'react-native-maps-here';

export default function App() {
  return (
    <MapsHereView
      style={styles.box}
      mapScheme="NORMAL_NIGHT"
      zoomValue={5}
      coordinates={{ lat: 31.6913827, lon: -8.4413898 }}
    />
  );
}

const styles = StyleSheet.create({
  box: {
    width: '100%',
    height: '100%',
  },
});
```

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

```
MIT License

Copyright (c) 2023 Abderrahim Ajakka

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

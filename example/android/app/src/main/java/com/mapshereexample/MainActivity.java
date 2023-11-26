package com.mapshereexample;

import android.os.Bundle;

import com.facebook.react.ReactActivity;
import com.facebook.react.ReactActivityDelegate;
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint;
import com.facebook.react.defaults.DefaultReactActivityDelegate;
import com.here.sdk.core.engine.SDKNativeEngine;
import com.here.sdk.core.engine.SDKOptions;
import com.here.sdk.core.errors.InstantiationErrorException;

public class MainActivity extends ReactActivity {

  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    initializeHERESDK();
  }

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

  private void initializeHERESDK() {
    // TODO: YOUR_ACCESS_KEY_ID
    String accessKeyID = "YOUR_ACCESS_KEY_ID";

    // TODO: YOUR_ACCESS_KEY_SECRET
    String accessKeySecret = "YOUR_ACCESS_KEY_ID";

    SDKOptions options = new SDKOptions(accessKeyID, accessKeySecret);
    try {
      SDKNativeEngine.makeSharedInstance(this, options);
    } catch (InstantiationErrorException e) {
      throw new RuntimeException("Initialization of HERE SDK failed: " + e.error.name());
    }
  }
}

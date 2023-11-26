package com.mapshere.modules

import android.util.Log
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactMethod
import com.here.sdk.core.engine.SDKNativeEngine
import com.here.sdk.core.engine.SDKOptions
import com.here.sdk.core.errors.InstantiationErrorException


class MapsHereConfigModule internal constructor(context: ReactApplicationContext) :
  MapsHereConfigSpec(context) {

  override fun getName() = NAME

  /**
   * FIXME: Initializing Here SDK from a module doesn't seem to work
   */
  @ReactMethod(isBlockingSynchronousMethod = true)
  override fun initializeHereSDK(accessKeyID: String, accessKeySecret: String, promise: Promise) {
    Log.d(TAG, "initializeHERESDK: started")
    val options = SDKOptions(accessKeyID, accessKeySecret)
    try {
      SDKNativeEngine.makeSharedInstance(reactApplicationContext, options)
      Log.d(TAG, "initializeHERESDK: initialized")
      promise.resolve("Here SDK initialized")
    } catch (e: InstantiationErrorException) {
      Log.e(TAG, "initializeHERESDK: failed", e)
      promise.reject(e)
    }
  }

  companion object {
    const val NAME = "MapsHereConfig"
    private const val TAG = "MapsHereConfigModule"
  }
}

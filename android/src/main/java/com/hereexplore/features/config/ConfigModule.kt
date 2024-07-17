package com.hereexplore.features.config

import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactMethod
import com.here.sdk.core.engine.SDKNativeEngine
import com.here.sdk.core.engine.SDKOptions
import com.here.sdk.core.errors.InstantiationErrorException

class ConfigModule internal constructor(context: ReactApplicationContext) :
    ConfigSpec(context) {

  override fun getName() = NAME

  @ReactMethod(isBlockingSynchronousMethod = true)
  override fun initializeHereSDK(accessKeyID: String, accessKeySecret: String): String {
    val options = SDKOptions(accessKeyID, accessKeySecret)
    try {
      SDKNativeEngine.makeSharedInstance(reactApplicationContext, options)
      return "SDKNativeEngine started"
    } catch (e: InstantiationErrorException) {
      return "SDKNativeEngine errored"
    }
  }

  companion object {
    const val NAME = "ConfigModule"
  }
}

package com.hereexplore

import android.util.Log
import com.facebook.react.bridge.ReactApplicationContext
import com.here.sdk.core.engine.AuthenticationMode
import com.here.sdk.core.engine.SDKNativeEngine
import com.here.sdk.core.engine.SDKOptions
import com.here.sdk.core.errors.InstantiationErrorException

class ConfigModule(context: ReactApplicationContext) :
    NativeHEREConfigSpec(context) {

  override fun initializeHereSDK(accessKeyID: String, accessKeySecret: String): String {
    val authenticationMode = AuthenticationMode.withKeySecret(
      accessKeyID,
      accessKeySecret
    )

    val options = SDKOptions(authenticationMode)
    try {
      SDKNativeEngine.makeSharedInstance(reactApplicationContext, options)
      return "started"
    } catch (e: InstantiationErrorException) {
      return "errored"
    }
  }

  companion object {
    const val NAME = NativeHEREConfigSpec.NAME
  }
}

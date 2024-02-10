package com.mapshere.modules

import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule

abstract class MapsHereConfigSpec internal constructor(context: ReactApplicationContext) :
  ReactContextBaseJavaModule(context) {

  abstract fun initializeHereSDK(accessKeyID: String, accessKeySecret: String): String
}

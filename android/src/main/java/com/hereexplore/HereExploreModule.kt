package com.hereexplore

import com.facebook.react.bridge.ReactApplicationContext

class HereExploreModule(reactContext: ReactApplicationContext) :
  NativeHereExploreSpec(reactContext) {

  override fun multiply(a: Double, b: Double): Double {
    return a * b
  }

  companion object {
    const val NAME = NativeHereExploreSpec.NAME
  }
}

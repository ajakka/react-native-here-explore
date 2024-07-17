package com.hereexplore.features.routing

import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReadableArray

abstract class RoutingSpec(context: ReactApplicationContext) :
  ReactContextBaseJavaModule(context) {

  abstract fun calculateRoute(waypoints: ReadableArray, routeOption: String, promise: Promise)

  abstract fun cancel(promise: Promise)
}

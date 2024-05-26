package com.mapshere.modules.routing

import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.ReadableArray
import com.here.sdk.routing.RoutingEngine
import com.here.sdk.routing.Waypoint
import com.mapshere.utils.CoordinatesUtils

class RoutingModule(context: ReactApplicationContext) : RoutingSpec(context) {

  private val routingEngine: RoutingEngine by lazy { RoutingEngine() }

  @ReactMethod
  override fun calculateRoute(waypoints: ReadableArray, routeOption: String, promise: Promise) {

    routingEngine.calculateRoute(
      CoordinatesUtils.toCoordinatesList(waypoints).map { Waypoint(it) },
      routeOption
    ) { routingError, routes ->
      val result = Arguments.createMap()
      if (routingError != null) {
        result.putInt("routingError", routingError.value)
        result.putArray("routes", Arguments.createArray())
      } else if (routes != null) {
        result.putArray("routes", routesToWritableArray(routes))
      }
      promise.resolve(result)
    }
  }

  override fun getName() = NAME

  companion object {
    const val NAME = "RoutingModule"
  }
}

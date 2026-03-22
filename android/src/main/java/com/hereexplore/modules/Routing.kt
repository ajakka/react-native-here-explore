package com.hereexplore.modules

import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReadableArray
import com.here.sdk.core.threading.TaskHandle
import com.here.sdk.routing.RoutingEngine
import com.here.sdk.routing.Waypoint
import com.hereexplore.NativeRoutingSpec
import com.hereexplore.helpers.calculateRoute
import com.hereexplore.helpers.CoordinatesUtils
import com.hereexplore.helpers.routesToWritableArray

class Routing(context: ReactApplicationContext) : NativeRoutingSpec(context) {
  private var taskHandle: TaskHandle? = null

  private val routingEngine: RoutingEngine by lazy { RoutingEngine() }

  override fun calculateRoute(waypoints: ReadableArray, routeOption: String, promise: Promise) {
    taskHandle = routingEngine.calculateRoute(
      CoordinatesUtils.Companion.toCoordinatesList(waypoints).map { Waypoint(it) },
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

  override fun cancel(promise: Promise) {
    taskHandle?.let { gTaskHandle ->
      if (gTaskHandle.isCancelled) {
        promise.resolve(true)
        return
      }

      gTaskHandle.cancel()
      taskHandle = null
      promise.resolve(true)
    } ?: run {
      promise.resolve(false)
    }
  }

  companion object {
    const val NAME = NativeRoutingSpec.NAME
  }
}

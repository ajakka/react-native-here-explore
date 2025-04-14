package com.hereexplore.features.navigation.engines

import android.util.Log
import com.here.sdk.core.errors.InstantiationErrorException
import com.here.sdk.routing.Route
import com.here.sdk.routing.RoutingError
import com.here.sdk.trafficawarenavigation.DynamicRoutingEngine
import com.here.sdk.trafficawarenavigation.DynamicRoutingEngineOptions
import com.here.sdk.trafficawarenavigation.DynamicRoutingListener
import com.here.time.Duration
import com.hereexplore.features.navigation.NavigationView.Companion.TAG

class DynamicRoutingHelper {

  private var dynamicRoutingEngine: DynamicRoutingEngine? = null

  // This feature will be bypassed as it appears to be expensive
  fun setupDynamicRouting(route: Route, bypass: Boolean) {
    if (bypass) return // FIXME: bypass to be lifted

    val options = DynamicRoutingEngineOptions()
    options.minTimeDifference = Duration.ofSeconds(1)
    options.minTimeDifferencePercentage = 0.1
    options.pollInterval = Duration.ofMinutes(10)

    try {
      dynamicRoutingEngine = DynamicRoutingEngine(options)
      dynamicRoutingEngine?.start(route, object : DynamicRoutingListener {
        override fun onBetterRouteFound(
          newRoute: Route,
          etaDifferenceInSeconds: Int,
          distanceDifferenceInMeters: Int
        ) {
          Log.d(TAG, "Better route found. ETA difference: $etaDifferenceInSeconds seconds")
          // Here you could decide to automatically switch to the new route
        }

        override fun onRoutingError(routingError: RoutingError) {
          Log.e(TAG, "Routing error: ${routingError.name}")
        }
      })
    } catch (e: InstantiationErrorException) {
      Log.e(TAG, "Failed to initialize DynamicRoutingEngine: ${e.error.name}")
    }
  }

  fun dismantleDynamicRouting() {
    dynamicRoutingEngine?.stop()
  }
}

package com.hereexplore.features.navigation.engines

import android.util.Log
import com.facebook.react.bridge.ReadableMap
import com.here.sdk.core.Location
import com.here.sdk.core.errors.InstantiationErrorException
import com.here.sdk.routing.CarOptions
import com.here.sdk.routing.Route
import com.here.sdk.routing.RoutingEngine
import com.here.sdk.routing.Waypoint
import com.hereexplore.features.navigation.NavigationView.Companion.TAG
import com.hereexplore.helpers.CoordinatesUtils

class RoutingHelper {

  private val routingEngine: RoutingEngine by lazy {
    try {
      RoutingEngine()
    } catch (e: InstantiationErrorException) {
      throw RuntimeException("Initialization of RoutingEngine failed: ${e.error.name}")
    }
  }

  fun calculateRoute( geoPolyline: ArrayList<Waypoint>, onRouteFound: (Route) -> Unit) {

    val carOptions = CarOptions()
    // FIXME: required for the DynamicRoutingEngine
    // carOptions.routeOptions.enableRouteHandle = true

    routingEngine.calculateRoute(geoPolyline, carOptions) { routingError, routes ->
      if (routingError == null && !routes.isNullOrEmpty()) {
        Log.d(TAG, "Route calculated successfully, starting navigation")
        onRouteFound(routes[0])
      } else {
        Log.e(TAG, "Error calculating route: ${routingError?.name}")
      }
    }
  }

}

package com.hereexplore.features.routing

import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.WritableArray
import com.here.sdk.core.threading.TaskHandle
import com.here.sdk.routing.BicycleOptions
import com.here.sdk.routing.BusOptions
import com.here.sdk.routing.CalculateRouteCallback
import com.here.sdk.routing.CarOptions
import com.here.sdk.routing.EVCarOptions
import com.here.sdk.routing.EVTruckOptions
import com.here.sdk.routing.PedestrianOptions
import com.here.sdk.routing.PrivateBusOptions
import com.here.sdk.routing.Route
import com.here.sdk.routing.RoutingEngine
import com.here.sdk.routing.ScooterOptions
import com.here.sdk.routing.TaxiOptions
import com.here.sdk.routing.TruckOptions
import com.here.sdk.routing.Waypoint
import com.hereexplore.helpers.CoordinatesUtils


fun RoutingEngine.calculateRoute(
  waypoints: List<Waypoint>,
  routingOption: String,
  callback: CalculateRouteCallback
): TaskHandle {
  return when (routingOption) {
    "CarOptions" -> this.calculateRoute(waypoints, CarOptions(), callback)
    "PedestrianOptions" -> this.calculateRoute(waypoints, PedestrianOptions(), callback)
    "TruckOptions" -> this.calculateRoute(waypoints, TruckOptions(), callback)
    "ScooterOptions" -> this.calculateRoute(waypoints, ScooterOptions(), callback)
    "BicycleOptions" -> this.calculateRoute(waypoints, BicycleOptions(), callback)
    "TaxiOptions" -> this.calculateRoute(waypoints, TaxiOptions(), callback)
    "EVCarOptions" -> this.calculateRoute(waypoints, EVCarOptions(), callback)
    "EVTruckOptions" -> this.calculateRoute(waypoints, EVTruckOptions(), callback)
    "BusOptions" -> this.calculateRoute(waypoints, BusOptions(), callback)
    "PrivateBusOptions" -> this.calculateRoute(waypoints, PrivateBusOptions(), callback)
    else -> this.calculateRoute(waypoints, CarOptions(), callback)
  }
}

fun routesToWritableArray(routes: List<Route>): WritableArray {
  val waRoutes = Arguments.createArray()
  routes.map {
    val wmRoute = Arguments.createMap()
    wmRoute.putArray("vertices", CoordinatesUtils.fromGeoCoordinatesList(it.geometry.vertices))
    wmRoute.putString("routeHandle", it.routeHandle?.handle)
    wmRoute.putInt("durationInSeconds", it.duration.seconds.toInt())
    wmRoute.putInt("trafficDelayInSeconds", it.trafficDelay.seconds.toInt())
    wmRoute.putInt("lengthInMeters", it.lengthInMeters)
    waRoutes.pushMap(wmRoute)
  }
  return waRoutes
}

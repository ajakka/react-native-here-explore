package com.hereexplore.features.navigation.engines

import android.util.Log
import com.here.sdk.core.Location
import com.here.sdk.core.LocationListener
import com.here.sdk.core.errors.InstantiationErrorException
import com.here.sdk.location.LocationAccuracy
import com.here.sdk.location.LocationEngine
import com.here.sdk.location.LocationEngineStatus
import com.here.sdk.location.LocationFeature
import com.here.sdk.location.LocationStatusListener
import com.here.sdk.navigation.LocationSimulator
import com.here.sdk.navigation.LocationSimulatorOptions
import com.here.sdk.navigation.VisualNavigator
import com.here.sdk.routing.Route
import com.here.time.Duration

class LocationHelper {
  companion object {
    const val TAG = "LocationHelper"
  }

  private val locationEngine: LocationEngine by lazy {
    try {
      LocationEngine()
    } catch (e: InstantiationErrorException) {
      throw RuntimeException("Initialization of LocationEngine failed: ${e.error.name}")
    }
  }
  private val locationStatusListener = object : LocationStatusListener {
    override fun onStatusChanged(status: LocationEngineStatus) {
      Log.d(TAG, "Location engine status: ${status.name}")
    }

    override fun onFeaturesNotAvailable(features: List<LocationFeature>) {
      for (feature in features) {
        Log.d(TAG, "Location feature not available: ${feature.name}")
      }
    }
  }
  private var locationListener: LocationListener? = null

  private var locationSimulator: LocationSimulator? = null


  fun startRealLocation(navigator: VisualNavigator, accuracy: LocationAccuracy) {
    Log.d(TAG, "Starting real location updates with accuracy: ${accuracy.name}")
    stopLocationUpdates()

    locationListener = navigator

    locationEngine.confirmHEREPrivacyNoticeInclusion()

    // Set up the location engine with the navigator as listener
    locationEngine.addLocationListener(navigator)
//    locationEngine.addLocationListener {
//      Log.d(TAG, "Location updated: ${it.coordinates.latitude}, ${it.coordinates.latitude}")
//    }
    locationEngine.addLocationStatusListener(locationStatusListener)

    // Start the location engine with the specified accuracy
    locationEngine.start(accuracy)

    Log.d(TAG, "Real location updates started")
  }

  fun startSimulation(route: Route, navigator: VisualNavigator) {
    Log.d(TAG, "Starting location simulation for route")
    stopLocationUpdates()

    locationListener = navigator

    // Setup the location simulator using the HERE SDK's built-in simulator
    val simulatorOptions = LocationSimulatorOptions()
    simulatorOptions.speedFactor = 4.0  // Simulate at 2x speed
    simulatorOptions.notificationInterval = Duration.ofMillis(500)  // Update every 500ms

    try {
      locationSimulator = LocationSimulator(route, simulatorOptions)
      locationSimulator?.listener = navigator
      locationSimulator?.start()
      Log.d(TAG, "Location simulation started")
    } catch (e: InstantiationErrorException) {
      Log.e(TAG, "Failed to initialize LocationSimulator: ${e.error.name}")
    }
  }

  fun stopLocationUpdates() {
    Log.d(TAG, "Stopping location updates")

    // Stop the location engine if it was used
    if (locationEngine.isStarted) {
      locationListener?.let { locationEngine.removeLocationListener(it) }
      locationEngine.removeLocationStatusListener(locationStatusListener)
      locationEngine.stop()
    }

    // Stop the location simulator if it was used
    locationSimulator?.stop()
    locationSimulator = null

    Log.d(TAG, "Location updates stopped")
  }

  fun getLastKnownLocation(): Location? {
    return locationEngine.lastKnownLocation
  }

}

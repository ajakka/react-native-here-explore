package com.hereexplore.features.navigation

import android.content.Context
import android.util.Log
import com.facebook.react.bridge.ReadableMap
import com.here.sdk.core.Location
import com.here.sdk.location.LocationAccuracy
import com.hereexplore.features.map.MapsView
import com.hereexplore.features.navigation.engines.DynamicRoutingHelper
import com.hereexplore.features.navigation.engines.LocationHelper
import com.hereexplore.features.navigation.engines.NavigatorHelper
import com.hereexplore.features.navigation.engines.RoutingHelper
import com.hereexplore.features.navigation.engines.VoiceAssistant
import java.util.Locale


class NavigationView(context: Context?) : MapsView(context) {
  companion object {
    const val TAG = "NavigationView"

    const val COMMAND_START_NAVIGATION = "startNavigation"
    const val COMMAND_STOP_NAVIGATION = "stopNavigation"
  }

  private val routingHelper by lazy { RoutingHelper() }
  private val locationHelper by lazy { LocationHelper() }
  private val navigatorHelper by lazy { NavigatorHelper() }
  private val voiceAssistant by lazy { VoiceAssistant(context!!) }
  private val dynamicRoutingHelper by lazy { DynamicRoutingHelper() }

  private var isSimulated: Boolean = false
  private var isCameraTrackingEnabled: Boolean = true
  private var isVoiceGuidanceEnabled: Boolean = true

  fun setIsSimulated(value: Boolean) {
    isSimulated = value
    Log.d(TAG, "Simulation mode set to: $value")
  }

  fun setIsCameraTrackingEnabled(value: Boolean) {
    isCameraTrackingEnabled = value
    Log.d(TAG, "Camera tracking set to: $value")

    // If navigation is already active, update the tracking status
    if (navigatorHelper.isNavigationActive) {
      updateCameraTracking(value)
    }
  }

  fun setVoiceGuidanceEnabled(enabled: Boolean) {
    Log.d(TAG, "Voice guidance ${if (enabled) "enabled" else "disabled"}")
    isVoiceGuidanceEnabled = enabled
  }

  fun startNavigation(routeMap: ReadableMap?) {
    if (isSimulated) {
      startSimulatedNavigation(routeMap)
    } else {
      startRealNavigation(routeMap)
    }
  }

  private fun startSimulatedNavigation(routeMap: ReadableMap?) {
    routingHelper.calculateRoute(routeMap, null) { route ->

      // Setup voice guidance
      voiceAssistant.setLanguage(Locale.getDefault())
      navigatorHelper.onTextUpdate {
        if (isVoiceGuidanceEnabled) {
          voiceAssistant.speak(it)
        }
      }

      // Start rendering the navigation on this view
      navigatorHelper.visualNavigator.startRendering(this)

      // Set the calculated route to the navigator
      navigatorHelper.visualNavigator.route = route

      // Start location updates based on the mode ( simulated)
      locationHelper.startSimulation(route, navigatorHelper.visualNavigator)
      Log.d(TAG, "Started simulated location updates")


      // Set up dynamic routing for traffic-aware navigation
      dynamicRoutingHelper.setupDynamicRouting(route, true)

      // Update camera tracking based on the setting
      updateCameraTracking(isCameraTrackingEnabled)
    }
  }

  private fun startRealNavigation(routeMap: ReadableMap?) {
    val lastKnownLocation = locationHelper.getLastKnownLocation()

    if (lastKnownLocation != null) {
      routingHelper.calculateRoute(routeMap, lastKnownLocation) { route ->

        // Setup voice guidance
        voiceAssistant.setLanguage(Locale.getDefault())
        navigatorHelper.onTextUpdate {
          if (isVoiceGuidanceEnabled) {
            voiceAssistant.speak(it)
          }
        }

        // Start rendering the navigation on this view
        navigatorHelper.visualNavigator.startRendering(this)

        // Set the calculated route to the navigator
        navigatorHelper.visualNavigator.route = route

        // Start location updates based on the mode (real)
        locationHelper.startRealLocation(navigatorHelper.visualNavigator, LocationAccuracy.NAVIGATION)
        Log.d(TAG, "Started real location updates")

        // Set up dynamic routing for traffic-aware navigation
        dynamicRoutingHelper.setupDynamicRouting(route, true)

        // Update camera tracking based on the setting
        updateCameraTracking(isCameraTrackingEnabled)
      }
    }
  }

  fun stopNavigation() {
    Log.d(TAG, "Stopping navigation")

    // Stop dynamic routing if active
    dynamicRoutingHelper.dismantleDynamicRouting()

    // Stop location updates
    locationHelper.stopLocationUpdates()

    navigatorHelper.visualNavigator.stopRendering() // Stop rendering navigation
    navigatorHelper.visualNavigator.route = null // Clear the route

    voiceAssistant.shutdown()

    Log.d(TAG, "Navigation stopped")
  }

  private fun updateCameraTracking(enabled: Boolean) {
    if (enabled) {
      navigatorHelper.startCameraTracking()
    } else {
      navigatorHelper.stopCameraTracking()
    }
  }

  private fun getLastKnownLocation(): Location? {
    return locationHelper.getLastKnownLocation()
  }
}

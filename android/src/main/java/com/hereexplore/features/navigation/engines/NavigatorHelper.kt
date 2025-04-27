package com.hereexplore.features.navigation.engines

import com.here.sdk.core.errors.InstantiationErrorException
import com.here.sdk.navigation.DynamicCameraBehavior
import com.here.sdk.navigation.EventTextListener
import com.here.sdk.navigation.VisualNavigator

class NavigatorHelper {

  val visualNavigator: VisualNavigator by lazy {
    try {
      VisualNavigator()
    } catch (e: InstantiationErrorException) {
      throw RuntimeException("Initialization of VisualNavigator failed: ${e.error.name}")
    }
  }

  val isNavigationActive: Boolean get() = visualNavigator.route != null

  fun startCameraTracking() {
    // DynamicCameraBehavior is recommended for navigation mode
    visualNavigator.cameraBehavior = DynamicCameraBehavior()
//    visualNavigator.cameraBehavior = FixedCameraBehavior()
//    visualNavigator.cameraBehavior = SpeedBasedCameraBehavior()

  }

  fun stopCameraTracking() {
    visualNavigator.cameraBehavior = null
  }

  fun onTextUpdate(callback: (text: String) -> Unit) {
    visualNavigator.eventTextListener = EventTextListener { eventText ->
      callback(eventText.text)
    }
  }
}

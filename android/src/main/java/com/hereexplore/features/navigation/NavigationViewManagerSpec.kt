package com.hereexplore.features.navigation

import android.view.ViewGroup
import com.hereexplore.features.map.MapsViewManagerSpec

abstract class NavigationViewManagerSpec<T : ViewGroup> : MapsViewManagerSpec<T>() {
  abstract fun setIsSimulated(view: T, value: Boolean)
  abstract fun setIsCameraTrackingEnabled(view: T, value: Boolean)
  abstract fun setIsVoiceGuidanceEnabled(view: T, value: Boolean)
}

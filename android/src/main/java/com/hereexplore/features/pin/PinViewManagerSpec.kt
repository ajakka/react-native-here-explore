package com.hereexplore.features.pin

import android.view.ViewGroup
import com.facebook.react.bridge.ReadableMap
import com.facebook.react.uimanager.ViewGroupManager

abstract class PinViewManagerSpec<T : ViewGroup> : ViewGroupManager<T>() {

  abstract fun setGeoCoordinates(view: T, value: ReadableMap?)

  abstract fun setAnchor(view: T, value: ReadableMap?)
}

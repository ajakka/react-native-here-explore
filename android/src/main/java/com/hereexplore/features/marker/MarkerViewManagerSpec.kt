package com.hereexplore.features.marker

import android.view.ViewGroup
import com.facebook.react.bridge.ReadableMap
import com.facebook.react.uimanager.ViewGroupManager

abstract class MarkerViewManagerSpec<T : ViewGroup> : ViewGroupManager<T>() {

  abstract fun setGeoCoordinates(view: T, value: ReadableMap?)

  abstract fun setImageUri(view: T, value: ReadableMap?)

  abstract fun setScale(view: T, value: Double)

  abstract fun setSize(view: T, value: ReadableMap?)

  abstract fun setAnchor(view: T, value: ReadableMap?)
}

package com.mapshere.components

import android.view.ViewGroup
import com.facebook.react.bridge.ReadableMap
import com.facebook.react.uimanager.ViewGroupManager

abstract class MapsHereViewManagerSpec<T : ViewGroup> : ViewGroupManager<T>() {

  abstract fun setMapScheme(view: T, value: String)

  abstract fun setZoomKind(view: T, value: String)

  abstract fun setZoomValue(view: T, value: Double)

  abstract fun setCoordinates(view: T, value: ReadableMap?)
}

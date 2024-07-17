package com.hereexplore.features.polygon

import android.view.ViewGroup
import com.facebook.react.bridge.ReadableArray
import com.facebook.react.bridge.ReadableMap
import com.facebook.react.uimanager.ViewGroupManager

abstract class PolygonViewManagerSpec<T : ViewGroup> : ViewGroupManager<T>() {

  abstract fun setGeoCoordinates(view: T, value: ReadableArray?)

  abstract fun setGeoCircle(view: T, value: ReadableMap?)

  abstract fun setColor(view: T, value: Double)

  abstract fun setOutlineColor(view: T, value: Double)

  abstract fun setOutlineWidth(view: T, value: Double)
}

package com.mapshere.components.polyline

import android.view.ViewGroup
import com.facebook.react.bridge.ReadableArray
import com.facebook.react.uimanager.ViewGroupManager
import com.facebook.react.uimanager.annotations.ReactProp

abstract class PolylineViewManagerSpec<T : ViewGroup> : ViewGroupManager<T>() {

  abstract fun setCoordinates(view: T, value: ReadableArray?)

  abstract fun setLineColor(view: T, value: String)

  abstract fun setLineWidth(view: T, value: Double)

  abstract fun setLineWidthUnit(view: T, value: String)
}

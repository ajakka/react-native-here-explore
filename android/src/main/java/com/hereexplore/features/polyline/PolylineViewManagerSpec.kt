package com.hereexplore.features.polyline

import android.view.ViewGroup
import com.facebook.react.bridge.ReadableArray
import com.facebook.react.uimanager.ViewGroupManager

abstract class PolylineViewManagerSpec<T : ViewGroup> : ViewGroupManager<T>() {

  abstract fun setGeoPolyline(view: T, value: ReadableArray?)

  abstract fun setLineType(view: T, value: String)

  abstract fun setLineWidth(view: T, value: Double)

  abstract fun setLineColor(view: T, value: Double)

  abstract fun setOutlineWidth(view: T, value: Double)

  abstract fun setOutlineColor(view: T, value: Double)

  abstract fun setLineLength(view: T, value: Double)

  abstract fun setGapColor(view: T, value: Double)

  abstract fun setGapLength(view: T, value: Double)

  abstract fun setCapShape(view: T, value: String)
}

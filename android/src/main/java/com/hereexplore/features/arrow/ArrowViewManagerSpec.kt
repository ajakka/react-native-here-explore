package com.hereexplore.features.arrow

import android.view.ViewGroup
import com.facebook.react.bridge.ReadableArray
import com.facebook.react.uimanager.ViewGroupManager

abstract class ArrowViewManagerSpec<T : ViewGroup> : ViewGroupManager<T>() {

  abstract fun setGeoPolyline(view: T, value: ReadableArray?)

  abstract fun setLineColor(view: T, value: Double)

  abstract fun setLineWidth(view: T, value: Double)
}

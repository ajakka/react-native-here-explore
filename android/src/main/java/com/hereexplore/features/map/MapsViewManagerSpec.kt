package com.hereexplore.features.map

import android.view.ViewGroup
import com.facebook.react.bridge.ReadableMap
import com.facebook.react.uimanager.ViewGroupManager

abstract class MapsViewManagerSpec<T : ViewGroup> : ViewGroupManager<T>() {

  abstract fun setMapScheme(view: T, value: String)

  abstract fun setWatermarkStyle(view: T, value: String?)

  abstract fun setBearing(view: T, value: Double)

  abstract fun setTilt(view: T, value: Double)

  //  GeoCoordinates
  abstract fun setGeoCoordinates(view: T, value: ReadableMap?)

  abstract fun setZoomKind(view: T, value: String)

  abstract fun setZoomValue(view: T, value: Double)

  //  GeoBox
  abstract fun setGeoBox(view: T, value: ReadableMap?)
}

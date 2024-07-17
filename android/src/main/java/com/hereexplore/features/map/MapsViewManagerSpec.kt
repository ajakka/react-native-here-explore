package com.hereexplore.features.map

import android.view.ViewGroup
import com.facebook.react.bridge.ReadableMap
import com.facebook.react.uimanager.ViewGroupManager

abstract class MapsViewManagerSpec<T : ViewGroup> : ViewGroupManager<T>() {

  abstract fun setMapScheme(view: T, value: String)

  abstract fun setWatermarkStyle(view: MapsView, value: String?)

  abstract fun setBearing(view: MapsView, value: Double)

  abstract fun setTilt(view: MapsView, value: Double)

//  GeoCoordinates
  abstract fun setGeoCoordinates(view: T, value: ReadableMap?)

  abstract fun setZoomKind(view: T, value: String)

  abstract fun setZoomValue(view: T, value: Double)

//  GeoBox
  abstract fun setGeoBox(view: MapsView, value: ReadableMap?)
}

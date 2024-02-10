package com.mapshere.components

import android.view.ViewGroup
import com.facebook.react.bridge.ReadableMap
import com.facebook.react.uimanager.ViewGroupManager

abstract class MapsHereViewManagerSpec<T : ViewGroup> : ViewGroupManager<T>() {

  abstract fun setMapScheme(view: T, value: String)

  abstract fun setWatermarkStyle(view: MapsHereView, value: String?)

  abstract fun setBearing(view: MapsHereView, value: Double)

  abstract fun setTilt(view: MapsHereView, value: Double)

//  GeoCoordinates
  abstract fun setGeoCoordinates(view: T, value: ReadableMap?)

  abstract fun setZoomKind(view: T, value: String)

  abstract fun setZoomValue(view: T, value: Double)

//  GeoBox
  abstract fun setGeoBox(view: MapsHereView, value: ReadableMap?)
}

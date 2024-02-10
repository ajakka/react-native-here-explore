package com.mapshere.components.marker

import android.content.Context
import android.view.ViewGroup
import com.facebook.react.bridge.ReadableArray
import com.facebook.react.bridge.ReadableMap
import com.facebook.react.uimanager.ViewGroupManager
import com.here.sdk.mapview.MapMarker
import com.here.sdk.mapview.MapPolygon
import com.mapshere.components.item.ItemView

abstract class MarkerViewManagerSpec<T : ViewGroup> : ViewGroupManager<T>() {

  abstract fun setGeoCoordinates(view: T, value: ReadableMap?)

  abstract fun setImageUri(view: T, value: ReadableMap?)

  abstract fun setScale(view: T, value: Double)

  abstract fun setSize(view: T, value: ReadableMap?)

  abstract fun setAnchor(view: T, value: ReadableMap?)
}

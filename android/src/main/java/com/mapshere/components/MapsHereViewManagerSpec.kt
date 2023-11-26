package com.mapshere.components

import android.view.View
import com.facebook.react.bridge.ReadableMap
import com.facebook.react.uimanager.SimpleViewManager

abstract class MapsHereViewManagerSpec<T : View> : SimpleViewManager<T>() {

  abstract fun setMapScheme(view: T?, value: String?)

  abstract fun setZoomKind(view: T?, value: String?)

  abstract fun setZoomValue(view: T?, value: Double)

  abstract fun setCoordinates(view: T?, value: ReadableMap?)
}

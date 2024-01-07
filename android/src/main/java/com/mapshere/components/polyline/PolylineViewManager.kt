package com.mapshere.components.polyline

import com.facebook.react.bridge.ReadableArray
import com.facebook.react.bridge.ReadableMap
import com.facebook.react.module.annotations.ReactModule
import com.facebook.react.uimanager.ThemedReactContext
import com.facebook.react.uimanager.annotations.ReactProp
import com.here.sdk.mapview.RenderSize

@ReactModule(name = PolylineViewManager.TAG)
class PolylineViewManager : PolylineViewManagerSpec<PolylineView>() {

  companion object {
    const val TAG = "PolylineView"
  }

  @ReactProp(name = "coordinates")
  override fun setCoordinates(view: PolylineView, value: ReadableArray?) {
    view.setGeoCoordinate(value)
  }

  @ReactProp(name = "lineColor")
  override fun setLineColor(view: PolylineView, value: Double) {
    view.setLineColor(value)
  }

  @ReactProp(name = "lineWidth")
  override fun setLineWidth(view: PolylineView, value: Double) {
    view.setLineWidth(value)
  }

  @ReactProp(name = "lineWidthUnit")
  override fun setLineWidthUnit(view: PolylineView, value: String) {
    view.setLineWidthUnit(value)
  }

  override fun getName() = TAG

  override fun createViewInstance(context: ThemedReactContext): PolylineView {
    return PolylineView(context)
  }
}

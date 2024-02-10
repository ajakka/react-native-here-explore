package com.mapshere.components.arrow

import com.facebook.react.bridge.ReadableArray
import com.facebook.react.module.annotations.ReactModule
import com.facebook.react.uimanager.ThemedReactContext
import com.facebook.react.uimanager.annotations.ReactProp

@ReactModule(name = ArrowViewManager.TAG)
class ArrowViewManager : ArrowViewManagerSpec<ArrowView>() {

  @ReactProp(name = "geoPolyline")
  override fun setGeoPolyline(view: ArrowView, value: ReadableArray?) {
    view.setGeoPolyline(value)
  }

  @ReactProp(name = "lineColor")
  override fun setLineColor(view: ArrowView, value: Double) {
    view.setLineColor(value)
  }

  @ReactProp(name = "lineWidth")
  override fun setLineWidth(view: ArrowView, value: Double) {
    view.setLineWidth(value)
  }

  override fun onAfterUpdateTransaction(view: ArrowView) {
    super.onAfterUpdateTransaction(view)
    view.updateFeature()
  }

  override fun getName() = TAG

  override fun createViewInstance(context: ThemedReactContext): ArrowView {
    return ArrowView(context)
  }

  companion object {
    const val TAG = "ArrowView"
  }
}

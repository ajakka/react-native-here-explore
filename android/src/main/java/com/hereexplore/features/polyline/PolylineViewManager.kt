package com.hereexplore.features.polyline

import com.facebook.react.bridge.ReadableArray
import com.facebook.react.module.annotations.ReactModule
import com.facebook.react.uimanager.ThemedReactContext
import com.facebook.react.uimanager.annotations.ReactProp

@ReactModule(name = PolylineViewManager.TAG)
class PolylineViewManager : PolylineViewManagerSpec<PolylineView>() {

  @ReactProp(name = "geoPolyline")
  override fun setGeoPolyline(view: PolylineView, value: ReadableArray?) {
    view.setGeoPolyline(value)
  }

  @ReactProp(name = "lineType")
  override fun setLineType(view: PolylineView, value: String) {
    view.setLineType(value)
  }

  @ReactProp(name = "lineWidth")
  override fun setLineWidth(view: PolylineView, value: Double) {
    view.setLineWidth(value)
  }

  @ReactProp(name = "lineColor")
  override fun setLineColor(view: PolylineView, value: Double) {
    view.setLineColor(value)
  }

  @ReactProp(name = "outlineWidth")
  override fun setOutlineWidth(view: PolylineView, value: Double) {
    view.setOutlineWidth(value)
  }

  @ReactProp(name = "outlineColor")
  override fun setOutlineColor(view: PolylineView, value: Double) {
    view.setOutlineColor(value)
  }

  @ReactProp(name = "lineLength")
  override fun setLineLength(view: PolylineView, value: Double) {
    view.setLineLength(value)
  }

  @ReactProp(name = "gapColor")
  override fun setGapColor(view: PolylineView, value: Double) {
    view.setGapColor(value)
  }

  @ReactProp(name = "gapLength")
  override fun setGapLength(view: PolylineView, value: Double) {
    view.setGapLength(value)
  }

  @ReactProp(name = "capShape")
  override fun setCapShape(view: PolylineView, value: String) {
    view.setCapShape(value)
  }

  override fun onAfterUpdateTransaction(view: PolylineView) {
    super.onAfterUpdateTransaction(view)
    view.updateFeature()
  }
//  @ReactProp(name = "lineWidthUnit")
//  override fun setLineWidthUnit(view: PolylineView, value: String) {
//    view.setLineWidthUnit(value)
//  }

  override fun getName() = TAG

  override fun createViewInstance(context: ThemedReactContext): PolylineView {
    return PolylineView(context)
  }

  companion object {
    const val TAG = "PolylineView"
  }
}

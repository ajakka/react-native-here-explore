package com.hereexplore.features.polygon

import com.facebook.react.bridge.ReadableArray
import com.facebook.react.bridge.ReadableMap
import com.facebook.react.module.annotations.ReactModule
import com.facebook.react.uimanager.ThemedReactContext
import com.facebook.react.uimanager.annotations.ReactProp

@ReactModule(name = PolygonViewManager.TAG)
class PolygonViewManager : PolygonViewManagerSpec<PolygonView>() {

  @ReactProp(name = "geoPolyline")
  override fun setGeoCoordinates(view: PolygonView, value: ReadableArray?) {
    view.setGeoCoordinates(value)
  }
  @ReactProp(name = "geoCircle")
  override fun setGeoCircle(view: PolygonView, value: ReadableMap?) {
    view.setGeoCircle(value)
  }

  @ReactProp(name = "color")
  override fun setColor(view: PolygonView, value: Double) {
    view.setColor(value)
  }

  @ReactProp(name = "outlineColor")
  override fun setOutlineColor(view: PolygonView, value: Double) {
    view.setOutlineColor(value)
  }

  @ReactProp(name = "outlineWidth")
  override fun setOutlineWidth(view: PolygonView, value: Double) {
    view.setOutlineWidth(value)
  }

  override fun onAfterUpdateTransaction(view: PolygonView) {
    super.onAfterUpdateTransaction(view)
    view.updateFeature()
  }

  override fun getName() = TAG

  override fun createViewInstance(context: ThemedReactContext): PolygonView {
    return PolygonView(context)
  }

  companion object {
    const val TAG = "PolygonView"
  }
}

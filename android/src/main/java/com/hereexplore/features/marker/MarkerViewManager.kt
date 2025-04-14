package com.hereexplore.features.marker

import com.facebook.react.bridge.ReadableMap
import com.facebook.react.module.annotations.ReactModule
import com.facebook.react.uimanager.ThemedReactContext
import com.facebook.react.uimanager.annotations.ReactProp


@ReactModule(name = MarkerViewManager.TAG)
class MarkerViewManager : MarkerViewManagerSpec<MarkerView>() {

  @ReactProp(name = "geoCoordinates")
  override fun setGeoCoordinates(view: MarkerView, value: ReadableMap?) {
    view.setGeoCoordinate(value)
  }

  @ReactProp(name = "image")
  override fun setImageUri(view: MarkerView, value: ReadableMap?) {
    view.setImageUri(value)
  }

  @ReactProp(name = "scale")
  override fun setScale(view: MarkerView, value: Double) {
    view.setScale(value)
  }

  @ReactProp(name = "size")
  override fun setSize(view: MarkerView, value: ReadableMap?) {
    view.setSize(value)
  }

  @ReactProp(name = "anchor")
  override fun setAnchor(view: MarkerView, value: ReadableMap?) {
    view.setAnchor(value)
  }

  override fun onAfterUpdateTransaction(view: MarkerView) {
    super.onAfterUpdateTransaction(view)
    view.updateFeature()
  }

  override fun getName() = TAG

  override fun createViewInstance(context: ThemedReactContext): MarkerView {
    return MarkerView(context)
  }

  companion object {
    const val TAG = "MarkerView"
  }
}

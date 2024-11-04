package com.hereexplore.features.pin

import com.facebook.react.bridge.ReadableMap
import com.facebook.react.module.annotations.ReactModule
import com.facebook.react.uimanager.ThemedReactContext
import com.facebook.react.uimanager.annotations.ReactProp


@ReactModule(name = PinViewManager.TAG)
class PinViewManager : PinViewManagerSpec<PinView>() {

  @ReactProp(name = "geoCoordinates")
  override fun setGeoCoordinates(view: PinView, value: ReadableMap?) {
    view.setGeoCoordinate(value)
  }

  @ReactProp(name = "anchor")
  override fun setAnchor(view: PinView, value: ReadableMap?) {
    view.setAnchor(value)
  }

  override fun onAfterUpdateTransaction(view: PinView) {
    super.onAfterUpdateTransaction(view)
    view.updateFeature()
  }

  override fun getName() = TAG

  override fun createViewInstance(context: ThemedReactContext): PinView {
    return PinView(context)
  }

  companion object {
    const val TAG = "PinView"
  }
}

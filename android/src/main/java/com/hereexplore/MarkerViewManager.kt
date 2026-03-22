package com.hereexplore

import com.facebook.react.bridge.ReadableMap
import com.facebook.react.module.annotations.ReactModule
import com.facebook.react.uimanager.SimpleViewManager
import com.facebook.react.uimanager.ThemedReactContext
import com.facebook.react.uimanager.ViewManagerDelegate
import com.facebook.react.viewmanagers.MarkerViewManagerDelegate
import com.facebook.react.viewmanagers.MarkerViewManagerInterface

@ReactModule(name = MarkerViewManager.TAG)
class MarkerViewManager : SimpleViewManager<MarkerView>(), MarkerViewManagerInterface<MarkerView> {

  private val delegate = MarkerViewManagerDelegate(this)

  override fun getDelegate(): ViewManagerDelegate<MarkerView> = delegate

  override fun getName() = TAG

  override fun createViewInstance(context: ThemedReactContext): MarkerView {
    return MarkerView(context)
  }

  override fun setGeoCoordinates(view: MarkerView, value: ReadableMap?) {
    view.setGeoCoordinate(value)
  }

  override fun setImage(view: MarkerView, value: ReadableMap?) {
    view.setImageUri(value)
  }

  override fun setScale(view: MarkerView, value: Double) {
    view.setScale(value)
  }

  override fun setSize(view: MarkerView, value: ReadableMap?) {
    view.setSize(value)
  }

  override fun setAnchor(view: MarkerView, value: ReadableMap?) {
    view.setAnchor(value)
  }

  override fun onAfterUpdateTransaction(view: MarkerView) {
    super.onAfterUpdateTransaction(view)
    view.updateFeature()
  }

  companion object {
    const val TAG = "MarkerView"
  }
}

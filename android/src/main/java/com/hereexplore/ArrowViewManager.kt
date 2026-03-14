package com.hereexplore

import com.facebook.react.bridge.ReadableArray
import com.facebook.react.module.annotations.ReactModule
import com.facebook.react.uimanager.SimpleViewManager
import com.facebook.react.uimanager.ThemedReactContext
import com.facebook.react.uimanager.ViewManagerDelegate
import com.facebook.react.viewmanagers.ArrowViewManagerDelegate
import com.facebook.react.viewmanagers.ArrowViewManagerInterface

@ReactModule(name = ArrowViewManager.TAG)
class ArrowViewManager : SimpleViewManager<ArrowView>(), ArrowViewManagerInterface<ArrowView> {

  private val delegate = ArrowViewManagerDelegate(this)

  override fun getDelegate(): ViewManagerDelegate<ArrowView> = delegate

  override fun getName() = TAG

  override fun createViewInstance(context: ThemedReactContext): ArrowView {
    return ArrowView(context)
  }

  override fun setGeoPolyline(view: ArrowView, value: ReadableArray?) {
    view.setGeoPolyline(value)
  }

  override fun setLineColor(view: ArrowView, value: Int) {
    view.setLineColor(value)
  }

  override fun setLineWidth(view: ArrowView, value: Double) {
    view.setLineWidth(value)
  }

  override fun onAfterUpdateTransaction(view: ArrowView) {
    super.onAfterUpdateTransaction(view)
    view.updateFeature()
  }

  companion object {
    const val TAG = "ArrowView"
  }
}

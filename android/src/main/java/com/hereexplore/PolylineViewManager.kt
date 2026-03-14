package com.hereexplore

import com.facebook.react.bridge.ReadableArray
import com.facebook.react.module.annotations.ReactModule
import com.facebook.react.uimanager.SimpleViewManager
import com.facebook.react.uimanager.ThemedReactContext
import com.facebook.react.uimanager.ViewManagerDelegate
import com.facebook.react.viewmanagers.PolylineViewManagerDelegate
import com.facebook.react.viewmanagers.PolylineViewManagerInterface

@ReactModule(name = PolylineViewManager.TAG)
class PolylineViewManager : SimpleViewManager<PolylineView>(), PolylineViewManagerInterface<PolylineView> {

  private val delegate = PolylineViewManagerDelegate(this)

  override fun getDelegate(): ViewManagerDelegate<PolylineView> = delegate

  override fun getName() = TAG

  override fun createViewInstance(context: ThemedReactContext): PolylineView {
    return PolylineView(context)
  }

  override fun setGeoPolyline(view: PolylineView, value: ReadableArray?) {
    view.setGeoPolyline(value)
  }

  override fun setLineType(view: PolylineView, value: String?) {
    view.setLineType(value ?: "SOLID")
  }

  override fun setLineWidth(view: PolylineView, value: Double) {
    view.setLineWidth(value)
  }

  override fun setLineColor(view: PolylineView, value: Int) {
    view.setLineColor(value)
  }

  override fun setOutlineWidth(view: PolylineView, value: Double) {
    view.setOutlineWidth(value)
  }

  override fun setOutlineColor(view: PolylineView, value: Int) {
    view.setOutlineColor(value)
  }

  override fun setLineLength(view: PolylineView, value: Double) {
    view.setLineLength(value)
  }

  override fun setGapColor(view: PolylineView, value: Int) {
    view.setGapColor(value)
  }

  override fun setGapLength(view: PolylineView, value: Double) {
    view.setGapLength(value)
  }

  override fun setCapShape(view: PolylineView, value: String?) {
    view.setCapShape(value ?: "ROUND")
  }

  override fun setLineWidthUnit(view: PolylineView, value: String?) {
    view.setLineWidthUnit(value ?: "PIXELS")
  }

  override fun onAfterUpdateTransaction(view: PolylineView) {
    super.onAfterUpdateTransaction(view)
    view.updateFeature()
  }

  companion object {
    const val TAG = "PolylineView"
  }
}

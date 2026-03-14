package com.hereexplore

import com.facebook.react.bridge.ReadableArray
import com.facebook.react.bridge.ReadableMap
import com.facebook.react.module.annotations.ReactModule
import com.facebook.react.uimanager.SimpleViewManager
import com.facebook.react.uimanager.ThemedReactContext
import com.facebook.react.uimanager.ViewManagerDelegate
import com.facebook.react.viewmanagers.PolygonViewManagerDelegate
import com.facebook.react.viewmanagers.PolygonViewManagerInterface

@ReactModule(name = PolygonViewManager.TAG)
class PolygonViewManager : SimpleViewManager<PolygonView>(), PolygonViewManagerInterface<PolygonView> {

  private val delegate = PolygonViewManagerDelegate(this)

  override fun getDelegate(): ViewManagerDelegate<PolygonView> = delegate

  override fun getName() = TAG

  override fun createViewInstance(context: ThemedReactContext): PolygonView {
    return PolygonView(context)
  }

  override fun setGeoPolyline(view: PolygonView, value: ReadableArray?) {
    view.setGeoCoordinates(value)
  }

  override fun setGeoCircle(view: PolygonView, value: ReadableMap?) {
    view.setGeoCircle(value)
  }

  override fun setColor(view: PolygonView, value: Int) {
    view.setColor(value)
  }

  override fun setOutlineColor(view: PolygonView, value: Int) {
    view.setOutlineColor(value)
  }

  override fun setOutlineWidth(view: PolygonView, value: Double) {
    view.setOutlineWidth(value)
  }

  override fun onAfterUpdateTransaction(view: PolygonView) {
    super.onAfterUpdateTransaction(view)
    view.updateFeature()
  }

  companion object {
    const val TAG = "PolygonView"
  }
}

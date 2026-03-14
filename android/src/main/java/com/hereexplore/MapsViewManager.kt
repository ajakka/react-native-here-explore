package com.hereexplore

import android.view.View
import com.facebook.react.bridge.ReadableMap
import com.facebook.react.module.annotations.ReactModule
import com.facebook.react.uimanager.ThemedReactContext
import com.facebook.react.uimanager.ViewGroupManager
import com.facebook.react.uimanager.ViewManagerDelegate
import com.facebook.react.viewmanagers.MapViewManagerInterface
import com.facebook.react.viewmanagers.MapViewManagerDelegate

@ReactModule(name = MapsViewManager.TAG)
class MapsViewManager : ViewGroupManager<MapsView>(), MapViewManagerInterface<MapsView> {

  private val delegate = MapViewManagerDelegate(this)

  override fun getDelegate(): ViewManagerDelegate<MapsView> = delegate

  override fun getName() = TAG

  public override fun createViewInstance(context: ThemedReactContext): MapsView {
    val mapsHereView = MapsView(context)
    mapsHereView.onCreate(null)
    mapsHereView.loadCameraView()
    return mapsHereView
  }

  override fun setMapScheme(view: MapsView, value: String?) {
    view.setMapScheme(value ?: "NORMAL_DAY")
  }

  override fun setWatermarkStyle(view: MapsView, value: String?) {
    view.setWatermarkStyle(value)
  }

  override fun setBearing(view: MapsView, value: Double) {
    view.setBearing(value)
  }

  override fun setTilt(view: MapsView, value: Double) {
    view.setTilt(value)
  }

  override fun setGeoCoordinates(view: MapsView, value: ReadableMap?) {
    view.setGeoCoordinates(value)
  }

  override fun setZoomValue(view: MapsView, value: Double) {
    view.setZoomValue(value)
  }

  override fun setZoomKind(view: MapsView, value: String?) {
    view.setZoomKind(value ?: "ZOOM_LEVEL")
  }

  override fun setGeoBox(view: MapsView, value: ReadableMap?) {
    view.setGeoBox(value)
  }

  override fun addView(parent: MapsView, child: View, index: Int) {
    when (child) {
      is ItemView -> {
        parent.addMapItem(child)
      }
    }
  }

  override fun removeViewAt(parent: MapsView, index: Int) {
    parent.removeMapItemAt(index)
  }

  override fun getChildAt(parent: MapsView, index: Int): View {
    return parent.getItemAt(index)
  }

  override fun getChildCount(parent: MapsView): Int {
    return parent.getItemsCount()
  }

  override fun onAfterUpdateTransaction(view: MapsView) {
    super.onAfterUpdateTransaction(view)
    view.updateCameraView()
  }

  companion object {
    const val TAG = "MapView"
  }
}

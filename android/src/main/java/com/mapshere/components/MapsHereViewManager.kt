package com.mapshere.components

import android.util.Log
import android.view.View
import com.facebook.react.bridge.ReadableMap
import com.facebook.react.module.annotations.ReactModule
import com.facebook.react.uimanager.ThemedReactContext
import com.facebook.react.uimanager.annotations.ReactProp
import com.mapshere.components.item.ItemView

@ReactModule(name = MapsHereViewManager.TAG)
class MapsHereViewManager : MapsHereViewManagerSpec<MapsHereView>() {

  @ReactProp(name = "mapScheme")
  override fun setMapScheme(view: MapsHereView, value: String) {
    view.setMapScheme(value)
  }

  @ReactProp(name = "watermarkStyle")
  override fun setWatermarkStyle(view: MapsHereView, value: String?) {
    view.setWatermarkStyle(value)
  }

  @ReactProp(name = "bearing")
  override fun setBearing(view: MapsHereView, value: Double) {
    view.setBearing(value)
  }

  @ReactProp(name = "tilt")
  override fun setTilt(view: MapsHereView, value: Double) {
    view.setTilt(value)
  }

  //  GeoCoordinates
  @ReactProp(name = "geoCoordinates")
  override fun setGeoCoordinates(view: MapsHereView, value: ReadableMap?) {
    view.setGeoCoordinates(value)
  }

  @ReactProp(name = "zoomValue")
  override fun setZoomValue(view: MapsHereView, value: Double) {
    view.setZoomValue(value)
  }

  @ReactProp(name = "zoomKind")
  override fun setZoomKind(view: MapsHereView, value: String) {
    view.setZoomKind(value)
  }

  //  GeoBox
  @ReactProp(name = "geoBox")
  override fun setGeoBox(view: MapsHereView, value: ReadableMap?) {
    view.setGeoBox(value)
  }


  override fun addView(parent: MapsHereView, child: View?, index: Int) {
    when (child) {
      is ItemView -> {
        parent.addMapItem(child)
      }
    }
  }

  override fun removeViewAt(parent: MapsHereView, index: Int) {
    parent.removeMapItemAt(index)
  }

  override fun getChildAt(parent: MapsHereView, index: Int): View {
    return parent.getItemAt(index)
  }

  override fun getChildCount(parent: MapsHereView): Int {
    return parent.getItemsCount()
  }

  override fun onAfterUpdateTransaction(view: MapsHereView) {
    super.onAfterUpdateTransaction(view)
    view.updateCameraView()
  }

  override fun getName() = TAG

  public override fun createViewInstance(context: ThemedReactContext): MapsHereView {
    val mapsHereView = MapsHereView(context)
    mapsHereView.onCreate(null)
    mapsHereView.loadCameraView()
    return mapsHereView
  }

  companion object {
    const val TAG = "MapsHereView"
  }
}

package com.mapshere.components

import android.util.Log
import android.view.View
import com.facebook.react.bridge.ReadableMap
import com.facebook.react.module.annotations.ReactModule
import com.facebook.react.uimanager.ThemedReactContext
import com.facebook.react.uimanager.annotations.ReactProp
import com.here.sdk.core.GeoCoordinates
import com.here.sdk.mapview.MapMeasure
import com.here.sdk.mapview.MapScheme
import com.mapshere.components.polyline.PolylineView
import com.mapshere.utils.mapSchemes
import com.mapshere.utils.zoomKinds


@ReactModule(name = MapsHereViewManager.TAG)
class MapsHereViewManager :
  MapsHereViewManagerSpec<MapsHereView>() {

  companion object {
    const val TAG = "MapsHereView"
  }

  override fun getName() = TAG

  public override fun createViewInstance(context: ThemedReactContext): MapsHereView {
    val mapsHereView = MapsHereView(context)
    mapsHereView.onCreate(null)
    mapsHereView.loadCameraView()
    return mapsHereView
  }

  @ReactProp(name = "coordinates")
  override fun setCoordinates(view: MapsHereView, value: ReadableMap?) {
    view.setCoordinates(value)
  }

  @ReactProp(name = "mapScheme")
  override fun setMapScheme(view: MapsHereView, value: String) {
    view.setMapScheme(value)
  }

  @ReactProp(name = "zoomValue")
  override fun setZoomValue(view: MapsHereView, value: Double) {
    view.setZoomValue(value)
  }

  @ReactProp(name = "zoomKind")
  override fun setZoomKind(view: MapsHereView, value: String) {
    view.setZoomKind(value)
  }

  override fun addView(parent: MapsHereView, child: View?, index: Int) {
    when (child) {
      is PolylineView -> {
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
}

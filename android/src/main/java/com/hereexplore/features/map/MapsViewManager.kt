package com.hereexplore.features.map

import android.view.View
import com.facebook.react.bridge.ReadableMap
import com.facebook.react.common.MapBuilder
import com.facebook.react.module.annotations.ReactModule
import com.facebook.react.uimanager.ThemedReactContext
import com.facebook.react.uimanager.annotations.ReactProp
import com.hereexplore.features.item.ItemView
import com.hereexplore.features.map.MapsView.Companion.EVENT_MAP_LONG_PRESS
import com.hereexplore.features.map.MapsView.Companion.EVENT_MAP_TAP
import com.hereexplore.features.navigation.NavigationView.Companion.EVENT_USER_LOCATION_NOT_FOUND

@ReactModule(name = MapsView.TAG)
open class MapsViewManager : MapsViewManagerSpec<MapsView>() {

  @ReactProp(name = "mapScheme")
  override fun setMapScheme(view: MapsView, value: String) {
    view.setMapScheme(value)
  }

  @ReactProp(name = "watermarkStyle")
  override fun setWatermarkStyle(view: MapsView, value: String?) {
    view.setWatermarkStyle(value)
  }

  @ReactProp(name = "bearing")
  override fun setBearing(view: MapsView, value: Double) {
    view.setBearing(value)
  }

  @ReactProp(name = "tilt")
  override fun setTilt(view: MapsView, value: Double) {
    view.setTilt(value)
  }

  //  GeoCoordinates
  @ReactProp(name = "geoCoordinates")
  override fun setGeoCoordinates(view: MapsView, value: ReadableMap?) {
    view.setGeoCoordinates(value)
  }

  @ReactProp(name = "zoomValue")
  override fun setZoomValue(view: MapsView, value: Double) {
    view.setZoomValue(value)
  }

  @ReactProp(name = "zoomKind")
  override fun setZoomKind(view: MapsView, value: String) {
    view.setZoomKind(value)
  }

  //  GeoBox
  @ReactProp(name = "geoBox")
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

  override fun getName() = MapsView.TAG

  public override fun createViewInstance(context: ThemedReactContext): MapsView {
    val mapsHereView = MapsView(context)
    mapsHereView.onCreate(null)
    mapsHereView.loadCameraView()
    return mapsHereView
  }

  override fun getExportedCustomDirectEventTypeConstants(): Map<String, Any> {
    return MapBuilder.builder<String, Any>()
      .put(EVENT_MAP_TAP, MapBuilder.of("registrationName", EVENT_MAP_TAP))
      .put(EVENT_MAP_LONG_PRESS, MapBuilder.of("registrationName", EVENT_MAP_LONG_PRESS))
      .build()
  }
}

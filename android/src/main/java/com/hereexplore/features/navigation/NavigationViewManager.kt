package com.hereexplore.features.navigation

import android.view.View
import com.facebook.react.bridge.ReadableMap
import com.facebook.react.common.MapBuilder
import com.facebook.react.module.annotations.ReactModule
import com.facebook.react.uimanager.ThemedReactContext
import com.facebook.react.uimanager.annotations.ReactProp
import com.here.sdk.navigation.VisualNavigator
import com.hereexplore.features.item.ItemView

// This class is a replica of the map view manager
// with what will potentially be the navigate own properties
// FIXME: find a way to inherit from map manager instead
@ReactModule(name = NavigationViewManager.TAG)
class NavigationViewManager : NavigationViewManagerSpec<NavigationView>() {

  companion object {
    const val TAG = "NavigationView"
  }

  private val visualNavigator: VisualNavigator by lazy { VisualNavigator() }

  @ReactProp(name = "mapScheme")
  override fun setMapScheme(view: NavigationView, value: String) {
    view.setMapScheme(value)
  }

  @ReactProp(name = "watermarkStyle")
  override fun setWatermarkStyle(view: NavigationView, value: String?) {
    view.setWatermarkStyle(value)
  }

  @ReactProp(name = "bearing")
  override fun setBearing(view: NavigationView, value: Double) {
    view.setBearing(value)
  }

  @ReactProp(name = "tilt")
  override fun setTilt(view: NavigationView, value: Double) {
    view.setTilt(value)
  }

  //  GeoCoordinates
  @ReactProp(name = "geoCoordinates")
  override fun setGeoCoordinates(view: NavigationView, value: ReadableMap?) {
    view.setGeoCoordinates(value)
  }

  @ReactProp(name = "zoomValue")
  override fun setZoomValue(view: NavigationView, value: Double) {
    view.setZoomValue(value)
  }

  @ReactProp(name = "zoomKind")
  override fun setZoomKind(view: NavigationView, value: String) {
    view.setZoomKind(value)
  }

  //  GeoBox
  @ReactProp(name = "geoBox")
  override fun setGeoBox(view: NavigationView, value: ReadableMap?) {
    view.setGeoBox(value)
  }

  public override fun createViewInstance(context: ThemedReactContext): NavigationView {
    val mapsHereView = NavigationView(context)
    mapsHereView.onCreate(null)
    mapsHereView.loadCameraView()
    visualNavigator.startRendering(mapsHereView)
    return mapsHereView
  }

  override fun getName() = TAG

  override fun addView(parent: NavigationView, child: View, index: Int) {
    when (child) {
      is ItemView -> {
        parent.addMapItem(child)
      }
    }
  }

  override fun removeViewAt(parent: NavigationView, index: Int) {
    parent.removeMapItemAt(index)
  }

  override fun getChildAt(parent: NavigationView, index: Int): View {
    return parent.getItemAt(index)
  }

  override fun getChildCount(parent: NavigationView): Int {
    return parent.getItemsCount()
  }

  override fun onAfterUpdateTransaction(view: NavigationView) {
    super.onAfterUpdateTransaction(view)
    view.updateCameraView()
  }

  override fun getExportedCustomDirectEventTypeConstants(): Map<String, Any> {
    return MapBuilder.builder<String, Any>()
      .put("onMapTap", MapBuilder.of("registrationName", "onMapTap"))
      .put("onMapLongPress", MapBuilder.of("registrationName", "onMapLongPress"))
      .build()
  }
}

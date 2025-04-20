package com.hereexplore.features.navigation

import android.util.Log
import android.view.View
import com.facebook.react.bridge.ReadableArray
import com.facebook.react.bridge.ReadableMap
import com.facebook.react.common.MapBuilder
import com.facebook.react.module.annotations.ReactModule
import com.facebook.react.uimanager.ThemedReactContext
import com.facebook.react.uimanager.annotations.ReactProp
import com.hereexplore.features.item.ItemView
import com.hereexplore.features.map.MapsView.Companion.EVENT_MAP_LONG_PRESS
import com.hereexplore.features.map.MapsView.Companion.EVENT_MAP_TAP
import com.hereexplore.features.navigation.NavigationView.Companion.COMMAND_PREFETCH_USER_LOCATION
import com.hereexplore.features.navigation.NavigationView.Companion.COMMAND_START_NAVIGATION
import com.hereexplore.features.navigation.NavigationView.Companion.COMMAND_STOP_NAVIGATION
import com.hereexplore.features.navigation.NavigationView.Companion.EVENT_USER_LOCATION_NOT_FOUND
import com.hereexplore.features.navigation.NavigationView.Companion.EVENT_USER_LOCATION_RESOLVED
import com.hereexplore.features.navigation.NavigationView.Companion.TAG

// This class is a replica of the map view manager
// with what will potentially be the navigate own properties
// FIXME: find a way to inherit from map manager instead
@ReactModule(name = TAG)
class NavigationViewManager : NavigationViewManagerSpec<NavigationView>() {

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

  @ReactProp(name = "isSimulated")
  override fun setIsSimulated(view: NavigationView, value: Boolean) {
    view.setIsSimulated(value)
  }

  @ReactProp(name = "isCameraTrackingEnabled")
  override fun setIsCameraTrackingEnabled(view: NavigationView, value: Boolean) {
    view.setIsCameraTrackingEnabled(value)
  }

  @ReactProp(name = "isVoiceGuidanceEnabled")
  override fun setIsVoiceGuidanceEnabled(view: NavigationView, value: Boolean) {
    view.setVoiceGuidanceEnabled(value)
  }

  public override fun createViewInstance(context: ThemedReactContext): NavigationView {
    val navigationView = NavigationView(context)
    navigationView.onCreate(null)
    navigationView.loadCameraView()
    return navigationView
  }

  override fun getName() = TAG

  override fun addView(parent: NavigationView, child: View, index: Int) {
    when (child) {
      is ItemView -> parent.addMapItem(child)
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

  override fun onDropViewInstance(view: NavigationView) {
    super.onDropViewInstance(view)
    view.stopNavigation()
  }

  override fun getExportedCustomDirectEventTypeConstants(): Map<String, Any> {
    return MapBuilder.builder<String, Any>()
      // Map events
      .put(EVENT_MAP_TAP, MapBuilder.of("registrationName", EVENT_MAP_TAP))
      .put(EVENT_MAP_LONG_PRESS, MapBuilder.of("registrationName", EVENT_MAP_LONG_PRESS))
      .put(EVENT_USER_LOCATION_NOT_FOUND, MapBuilder.of("registrationName", EVENT_USER_LOCATION_NOT_FOUND))
      .put(EVENT_USER_LOCATION_RESOLVED, MapBuilder.of("registrationName", EVENT_USER_LOCATION_RESOLVED))
      .build()
  }

  override fun getCommandsMap(): Map<String, Int> {
    return MapBuilder.of(
      COMMAND_PREFETCH_USER_LOCATION, 1,
      COMMAND_START_NAVIGATION, 2,
      COMMAND_STOP_NAVIGATION, 3
    )
  }

  override fun receiveCommand(root: NavigationView, commandId: String?, args: ReadableArray?) {
    when (commandId) {
      COMMAND_PREFETCH_USER_LOCATION -> root.prefetchUserLocation()

      COMMAND_START_NAVIGATION -> {
        if (args != null && args.size() > 0) {
          root.startNavigation(args.getMap(0))
        }
      }

      COMMAND_STOP_NAVIGATION -> root.stopNavigation()

      else -> Log.e(TAG, "Unknown command: $commandId")
    }
  }
}

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
import com.hereexplore.features.navigation.NavigationView.Companion.COMMAND_START_NAVIGATION
import com.hereexplore.features.navigation.NavigationView.Companion.COMMAND_STOP_NAVIGATION

// This class is a replica of the map view manager
// with what will potentially be the navigate own properties
// FIXME: find a way to inherit from map manager instead
@ReactModule(name = NavigationView.TAG)
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

  public override fun createViewInstance(context: ThemedReactContext): NavigationView {
    val navigationView = NavigationView(context)
    navigationView.onCreate(null)
    navigationView.loadCameraView()
    return navigationView
  }

  override fun getName() = NavigationView.TAG

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
      .build()
  }

  override fun getCommandsMap(): Map<String, Int> {
    return MapBuilder.of(
      COMMAND_START_NAVIGATION, 1,
      COMMAND_STOP_NAVIGATION, 2
    )
  }

  override fun receiveCommand(root: NavigationView, commandId: String?, args: ReadableArray?) {
    Log.d(NavigationView.TAG, "Received command: $commandId")

    when (commandId) {
      COMMAND_START_NAVIGATION -> {
        if (args != null && args.size() > 0) {
          val routeData = args.getMap(0)
          Log.d(NavigationView.TAG, "Starting navigation with route data: $routeData")
          root.startNavigation(routeData)
        } else {
          Log.e(NavigationView.TAG, "Invalid arguments for startNavigation command")
        }
      }

      COMMAND_STOP_NAVIGATION -> {
        Log.d(NavigationView.TAG, "Stopping navigation")
        root.stopNavigation()
      }

      else -> {
        Log.e(NavigationView.TAG, "Unknown command: $commandId")
      }
    }
  }
}

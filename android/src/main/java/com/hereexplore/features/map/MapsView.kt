package com.hereexplore.features.map

import android.content.Context
import android.os.Bundle
import android.util.Log
import android.view.View
import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.ReadableMap
import com.here.sdk.core.GeoBox
import com.here.sdk.core.GeoCoordinates
import com.here.sdk.core.GeoOrientationUpdate
import com.here.sdk.gestures.LongPressListener
import com.here.sdk.gestures.TapListener
import com.here.sdk.mapview.MapMeasure
import com.here.sdk.mapview.MapScheme
import com.here.sdk.mapview.MapView
import com.here.sdk.mapview.WatermarkStyle
import com.hereexplore.features.item.ItemView
import com.hereexplore.helpers.CoordinatesUtils
import com.hereexplore.helpers.sendEvent


open class MapsView(context: Context?) : MapView(context) {

  companion object {
    const val TAG = "MapsView"

    const val EVENT_MAP_TAP = "onMapTap"
    const val EVENT_MAP_LONG_PRESS = "onMapLongPress"
  }

  private val mapItems: ArrayList<ItemView> = arrayListOf()

  private var mapScheme = MapScheme.NORMAL_DAY

  private var watermarkStyle: WatermarkStyle? = null

  private var bearing: Double = 0.0

  private var tilt: Double = 0.0

  private var geoCoordinates: GeoCoordinates? = null

  private var zoomKind: MapMeasure.Kind = MapMeasure.Kind.ZOOM_LEVEL

  private var zoomValue: Double = 8.0

  private var geoBox: GeoBox? = null

  override fun onCreate(bundle: Bundle?) {
    super.onCreate(bundle)
    initializeGestureListeners()
  }

  private fun initializeGestureListeners() {
    // Tap listener
    gestures.tapListener = TapListener { touchPoint ->
      val coordinates = viewToGeoCoordinates(touchPoint)
      val eventArgs = Arguments.createMap()
      eventArgs.putDouble("latitude", coordinates?.latitude ?: 0.0)
      eventArgs.putDouble("longitude", coordinates?.longitude ?: 0.0)
      eventArgs.putDouble("altitude", coordinates?.altitude ?: 0.0)

     sendEvent(id, context, EVENT_MAP_TAP, eventArgs)
    }

    // Long press listener
    gestures.longPressListener = LongPressListener { _, touchPoint ->
      val coordinates = viewToGeoCoordinates(touchPoint)
      val eventArgs = Arguments.createMap()
      eventArgs.putDouble("latitude", coordinates?.latitude ?: 0.0)
      eventArgs.putDouble("longitude", coordinates?.longitude ?: 0.0)
      eventArgs.putDouble("altitude", coordinates?.altitude ?: 0.0)

      sendEvent(id, context, EVENT_MAP_LONG_PRESS, eventArgs)
    }
  }

  fun setMapScheme(value: String) {
    mapScheme = MapScheme.valueOf(value)
    loadCameraView()
  }

  fun setWatermarkStyle(value: String?) {
    watermarkStyle = if (value != null) WatermarkStyle.valueOf(value) else null
  }

  fun setBearing(value: Double) {
    bearing = value
  }

  fun setTilt(value: Double) {
    tilt = value
  }

  //  GeoCoordinates
  fun setGeoCoordinates(value: ReadableMap?) {
    if (value != null) {
      geoCoordinates = CoordinatesUtils.toGeoCoordinates(value)
      geoBox = null
    }
  }

  fun setZoomKind(value: String) {
    zoomKind = MapMeasure.Kind.valueOf(value)
  }

  fun setZoomValue(value: Double) {
    zoomValue = value
  }

  //  GeoBox
  fun setGeoBox(value: ReadableMap?) {
    val southWestCorner = value?.getMap("southWestCorner")
    val northEastCorner = value?.getMap("northEastCorner")

    if (southWestCorner != null && northEastCorner != null) {
      geoBox = GeoBox(
        CoordinatesUtils.toGeoCoordinates(southWestCorner),
        CoordinatesUtils.toGeoCoordinates(northEastCorner),
      )
      geoCoordinates = null
    }
  }

  fun loadCameraView() {
    mapScene.loadScene(mapScheme) { mapError ->
      if (mapError == null) updateCameraView()
    }
  }

  fun updateCameraView() {
    geoCoordinates?.let {
      camera.lookAt(it, GeoOrientationUpdate(bearing, tilt), MapMeasure(zoomKind, zoomValue))
    } ?: geoBox?.let {
      camera.lookAt(it, GeoOrientationUpdate(bearing, tilt))
    } ?: Log.d(TAG, "updateCameraView: No coordinates Info was given")
  }

  fun addMapItem(child: ItemView) {
    mapItems.add(child)
    child.assignToMap(this)
    child.updateFeature()
  }

  fun removeMapItemAt(index: Int) {
    if (index >= 0 && index < mapItems.size) {
      val mapItem = mapItems[index]
      mapItem.removeFeature()
      mapItems.removeAt(index)
    }
  }

  fun getItemAt(index: Int): View {
    return mapItems[index]
  }

  fun getItemsCount(): Int {
    return mapItems.size
  }
}

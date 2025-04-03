package com.hereexplore.features.map

import android.content.Context
import android.os.Bundle
import android.util.Log
import android.view.View
import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.ReadableMap
import com.facebook.react.uimanager.ThemedReactContext
import com.facebook.react.uimanager.events.RCTEventEmitter
import com.facebook.react.uimanager.events.RCTModernEventEmitter
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


class MapsView(context: Context?) : MapView(context) {

  companion object {
    const val TAG = "MapsView"
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

    // Tap listener
    gestures.tapListener = TapListener { touchPoint ->
      val coordinates = viewToGeoCoordinates(touchPoint)
      Log.d(TAG, "onCreate: TapListener ${coordinates?.latitude} ${coordinates?.longitude}")
      coordinates?.let { sendCoordinates("onMapTap", it) }
    }

    // Long press listener
    gestures.longPressListener = LongPressListener { _, touchPoint ->
      val coordinates = viewToGeoCoordinates(touchPoint)
      Log.d(TAG, "onCreate: LongPressListener ${coordinates?.latitude} ${coordinates?.longitude}")
      coordinates?.let { sendCoordinates("onMapLongPress", it) }
    }
  }

  private fun sendCoordinates(eventName: String, coordinates: GeoCoordinates) {
    val eventArgs = Arguments.createMap()
    eventArgs.putDouble("latitude", coordinates.latitude)
    eventArgs.putDouble("longitude", coordinates.longitude)
    coordinates.altitude?.let { altitude -> eventArgs.putDouble("altitude", altitude) }

    val reactContext = context as? ThemedReactContext
    val jsModule = reactContext?.getJSModule(RCTEventEmitter::class.java)
    jsModule?.receiveEvent(id, eventName, eventArgs)
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
      geoCoordinates = CoordinatesUtils.toCoordinates(value)
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
        CoordinatesUtils.toCoordinates(southWestCorner),
        CoordinatesUtils.toCoordinates(northEastCorner),
      )
      geoCoordinates = null
    }
  }

  fun loadCameraView() {
    mapScene.loadScene(mapScheme) { mapError ->
      if (mapError == null) updateCameraView()
      else Log.d(MapsViewManager.TAG, "Loading map failed: mapError" + mapError.name)
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

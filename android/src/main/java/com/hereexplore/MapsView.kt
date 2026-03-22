package com.hereexplore

import android.content.Context
import android.os.Bundle
import android.util.Log
import android.view.View
import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.ReadableMap
import com.facebook.react.bridge.WritableMap
import com.facebook.react.uimanager.ThemedReactContext
import com.facebook.react.uimanager.UIManagerHelper
import com.facebook.react.uimanager.events.Event
import com.here.sdk.core.GeoBox
import com.here.sdk.core.GeoCoordinates
import com.here.sdk.core.GeoOrientationUpdate
import com.here.sdk.gestures.LongPressListener
import com.here.sdk.gestures.TapListener
import com.here.sdk.mapview.MapMeasure
import com.here.sdk.mapview.MapScheme
import com.here.sdk.mapview.MapView
import com.here.sdk.mapview.WatermarkStyle
import com.hereexplore.helpers.CoordinatesUtils
import com.hereexplore.helpers.safeMapScheme
import com.hereexplore.helpers.safeWatermarkStyle
import com.hereexplore.helpers.safeZoomKind


class MapsView(context: Context?) : MapView(context) {

  companion object {
    const val TAG = "MapsView"
  }

  private val mapItems: ArrayList<ItemView> = arrayListOf()

  private var mapScheme = MapScheme.NORMAL_DAY

  private var watermarkStyle: WatermarkStyle? = null

  private var bearing: Double = 0.0

  private var tilt: Double = 0.0

  private var hasGeoCoordinates: Boolean = false

  private var geoCoordinates: GeoCoordinates? = null

  private var zoomKind: MapMeasure.Kind = MapMeasure.Kind.ZOOM_LEVEL

  private var zoomValue: Double = 8.0

  private var geoBox: GeoBox? = null

  override fun onCreate(bundle: Bundle?) {
    super.onCreate(bundle)

    // Tap listener
    gestures.tapListener = TapListener { touchPoint ->
      val coordinates = viewToGeoCoordinates(touchPoint)
      coordinates?.let { sendCoordinates("topMapTap", it) }
    }

    // Long press listener
    gestures.longPressListener = LongPressListener { _, touchPoint ->
      val coordinates = viewToGeoCoordinates(touchPoint)
      coordinates?.let { sendCoordinates("topMapLongPress", it) }
    }
  }

  private fun sendCoordinates(eventName: String, coordinates: GeoCoordinates) {
    val eventArgs = Arguments.createMap()
    eventArgs.putDouble("latitude", coordinates.latitude)
    eventArgs.putDouble("longitude", coordinates.longitude)
    coordinates.altitude?.let { altitude -> eventArgs.putDouble("altitude", altitude) }

    val reactContext = context as? ThemedReactContext
    if (reactContext != null) {
      val surfaceId = UIManagerHelper.getSurfaceId(reactContext)
      val eventDispatcher = UIManagerHelper.getEventDispatcherForReactTag(reactContext, id)
      eventDispatcher?.dispatchEvent(
        MapCoordinateEvent(surfaceId, id, eventName, eventArgs)
      )
    }
  }

  private class MapCoordinateEvent(
    surfaceId: Int,
    viewId: Int,
    private val name: String,
    private val data: WritableMap
  ) : Event<MapCoordinateEvent>(surfaceId, viewId) {
    override fun getEventName() = name
    override fun getEventData() = data
  }

  fun setMapScheme(value: String) {
    mapScheme = safeMapScheme(value)
    loadCameraView()
  }

  fun setWatermarkStyle(value: String?) {
    watermarkStyle = if (value != null) safeWatermarkStyle(value) else null
  }

  fun setBearing(value: Double) {
    bearing = value
  }

  fun setTilt(value: Double) {
    tilt = value
  }

  fun setHasGeoCoordinates(value: Boolean) {
    hasGeoCoordinates = value
  }

  //  GeoCoordinates
  fun setGeoCoordinates(value: ReadableMap?) {
    geoCoordinates = if (value != null) CoordinatesUtils.toCoordinates(value) else null
  }

  fun setZoomKind(value: String) {
    zoomKind = safeZoomKind(value)
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
    if (hasGeoCoordinates) {
      geoCoordinates?.let {
        camera.lookAt(it, GeoOrientationUpdate(bearing, tilt), MapMeasure(zoomKind, zoomValue))
      }
    } else {
      geoBox?.let {
        camera.lookAt(it, GeoOrientationUpdate(bearing, tilt))
      } ?: Log.d(TAG, "updateCameraView: No coordinates Info was given")
    }
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

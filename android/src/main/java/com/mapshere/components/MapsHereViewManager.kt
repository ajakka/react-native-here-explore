package com.mapshere.components

import android.util.Log
import com.facebook.react.bridge.ReadableMap
import com.facebook.react.module.annotations.ReactModule
import com.facebook.react.uimanager.ThemedReactContext
import com.facebook.react.uimanager.annotations.ReactProp
import com.here.sdk.core.GeoCoordinates
import com.here.sdk.mapview.MapMeasure
import com.here.sdk.mapview.MapScheme


@ReactModule(name = MapsHereViewManager.NAME)
class MapsHereViewManager :
  MapsHereViewManagerSpec<MapsHereView>() {

  // MapMeasure
  private var zoomKind: MapMeasure.Kind = MapMeasure.Kind.ZOOM_LEVEL
  private var zoomValue: Double = 5.0

  // GeoCoordinates
  private var latitude = 0.0
  private var longitude = 0.0

  //
  private var mapScheme = MapScheme.NORMAL_DAY

  override fun getName(): String {
    return NAME
  }

  public override fun createViewInstance(context: ThemedReactContext): MapsHereView {
    val mapsHereView = MapsHereView(context)
    mapsHereView.onCreate(null)
    loadCameraView(mapsHereView)
    return mapsHereView

  }

  @ReactProp(name = "mapScheme")
  override fun setMapScheme(view: MapsHereView?, value: String?) {
    Log.d(TAG, "setMapScheme: $value")

    mapScheme = when {
      value?.uppercase().equals("NORMAL_DAY") -> MapScheme.NORMAL_DAY
      value?.uppercase().equals("NORMAL_NIGHT") -> MapScheme.NORMAL_NIGHT
      value?.uppercase().equals("SATELLITE") -> MapScheme.SATELLITE
      value?.uppercase().equals("HYBRID_DAY") -> MapScheme.HYBRID_DAY
      value?.uppercase().equals("HYBRID_NIGHT") -> MapScheme.HYBRID_NIGHT
      value?.uppercase().equals("LITE_DAY") -> MapScheme.LITE_DAY
      value?.uppercase().equals("LITE_NIGHT") -> MapScheme.LITE_NIGHT
      value?.uppercase().equals("LITE_HYBRID_DAY") -> MapScheme.LITE_HYBRID_DAY
      value?.uppercase().equals("LITE_HYBRID_NIGHT") -> MapScheme.LITE_HYBRID_NIGHT
      value?.uppercase().equals("LOGISTICS_DAY") -> MapScheme.LOGISTICS_DAY
      else -> MapScheme.NORMAL_DAY
    }

    loadCameraView(view)
  }

  @ReactProp(name = "zoomKind")
  override fun setZoomKind(view: MapsHereView?, value: String?) {
    Log.d(TAG, "setZoomKind: $value")

    zoomKind = when {
      value?.uppercase().equals("DISTANCE") -> MapMeasure.Kind.DISTANCE
      value?.uppercase().equals("ZOOM_LEVEL") -> MapMeasure.Kind.ZOOM_LEVEL
      value?.uppercase().equals("SCALE") -> MapMeasure.Kind.SCALE
      else -> MapMeasure.Kind.ZOOM_LEVEL
    }
    updateCameraView(view)
  }

  @ReactProp(name = "zoomValue")
  override fun setZoomValue(view: MapsHereView?, value: Double) {
    Log.d(TAG, "setZoomValue: $value")

    zoomValue = value
    updateCameraView(view)
  }

  @ReactProp(name = "coordinates")
  override fun setCoordinates(view: MapsHereView?, value: ReadableMap?) {
    Log.d(TAG, "setCoordinates: $value")

    latitude = value?.getDouble("lat") ?: 0.0
    longitude = value?.getDouble("lon") ?: 0.0

    updateCameraView(view)
  }

  private fun loadCameraView(view: MapsHereView?) {
    view?.mapScene?.loadScene(mapScheme) { mapError ->
      if (mapError == null) {
        view.camera.lookAt(
          GeoCoordinates(latitude, longitude),
          MapMeasure(zoomKind, zoomValue)
        )
      } else {
        Log.d(TAG, "Loading map failed: mapError" + mapError.name)
      }
    }
  }

  private fun updateCameraView(view: MapsHereView?) {
    view?.camera?.lookAt(
      GeoCoordinates(latitude, longitude),
      MapMeasure(zoomKind, zoomValue)
    )
  }

  companion object {
    const val NAME = "MapsHereView"
    private const val TAG = "MapsHereViewManager"
  }
}

package com.mapshere.components

import android.content.Context
import android.util.AttributeSet
import android.util.Log
import android.view.View
import com.facebook.react.bridge.ReadableMap
import com.here.sdk.core.GeoCoordinates
import com.here.sdk.mapview.MapMeasure
import com.here.sdk.mapview.MapScheme
import com.here.sdk.mapview.MapView
import com.mapshere.components.polyline.PolylineView

class MapsHereView : MapView {

  companion object {
    const val TAG = "MapsHereView"
  }

  private var zoomKind: MapMeasure.Kind = MapMeasure.Kind.ZOOM_LEVEL

  private var zoomValue: Double = 5.0

  private var latitude = 0.0

  private var longitude = 0.0

  private var mapScheme = MapScheme.NORMAL_DAY

  private val mapPolyLines: ArrayList<PolylineView> = arrayListOf()

  constructor(context: Context?) :
    super(context)

  constructor(context: Context?, attrs: AttributeSet?) :
    super(context, attrs)

  constructor(context: Context?, attrs: AttributeSet?, defStyleAttr: Int) :
    super(context, attrs, defStyleAttr)


  fun setCoordinates(value: ReadableMap?) {
    latitude = value?.getDouble("lat") ?: 0.0
    longitude = value?.getDouble("lon") ?: 0.0
    updateCameraView()
  }

  fun setMapScheme(value: String) {
    mapScheme = MapScheme.valueOf(value)
    loadCameraView()
  }

  fun setZoomValue(value: Double) {
    zoomValue = value
    updateCameraView()
  }

  fun setZoomKind(value: String) {
    zoomKind = MapMeasure.Kind.valueOf(value)
    updateCameraView()
  }

  fun loadCameraView() {
    mapScene.loadScene(mapScheme) { mapError ->
      if (mapError == null) {
        camera.lookAt(GeoCoordinates(latitude, longitude), MapMeasure(zoomKind, zoomValue))
      } else {
        Log.d(MapsHereViewManager.TAG, "Loading map failed: mapError" + mapError.name)
      }
    }
  }

  private fun updateCameraView() {
    camera.lookAt(
      GeoCoordinates(latitude, longitude),
      MapMeasure(zoomKind, zoomValue)
    )
  }

  fun addMapItem(child: PolylineView) {
    mapPolyLines.add(child)
    child.setOnUpdateListener { old, new ->
      if (old != null) {
        mapScene.removeMapPolyline(old)
      }
      mapScene.addMapPolyline(new)
    }
    child.updatePolyline()
  }

  fun removeMapItemAt(index: Int) {
    if (index >= 0 && index < mapPolyLines.size) {
      val item = mapPolyLines[index].mapPolyline
      if (item != null) {
        mapScene.removeMapPolyline(item)
      }
      mapPolyLines.removeAt(index)
    }
  }

  fun getItemAt(index: Int): View {
    return mapPolyLines[index]
  }

  fun getItemsCount(): Int {
    return mapPolyLines.size
  }
}

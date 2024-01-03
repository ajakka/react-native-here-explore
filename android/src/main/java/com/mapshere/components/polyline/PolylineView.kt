package com.mapshere.components.polyline

import android.content.Context
import com.facebook.react.bridge.ReadableArray
import com.facebook.react.views.view.ReactViewGroup
import com.here.sdk.core.Color
import com.here.sdk.core.GeoCoordinates
import com.here.sdk.core.GeoPolyline
import com.here.sdk.mapview.LineCap
import com.here.sdk.mapview.MapMeasureDependentRenderSize
import com.here.sdk.mapview.MapPolyline
import com.here.sdk.mapview.RenderSize
import com.mapshere.utils.ColorParser

class PolylineView(context: Context?) : ReactViewGroup(context) {

  private var coordinates = arrayListOf<GeoCoordinates>()

  private var lineColor: Color = ColorParser.toHereColor("white")

  private var lineWidth: Double = 8.0

  private var lineWidthUnit: RenderSize.Unit = RenderSize.Unit.PIXELS

  var mapPolyline: MapPolyline? = null

  private var listener: OnUpdateListener? = null

  fun setGeoCoordinate(value: ReadableArray?) {
    if (value != null && value.size() > 0) {
      coordinates = convertToGeoCoordinates(value)
      if (coordinates.size == 1) {
        val lat = coordinates[0].latitude
        val lon = coordinates[0].longitude
        coordinates.add(GeoCoordinates(lat, lon))
      }
      updatePolyline()
    }
  }

  fun setLineColor(value: String) {
    lineColor = ColorParser.toHereColor(value)
    updatePolyline()
  }

  fun setLineWidth(value: Double) {
    lineWidth = value
    updatePolyline()
  }

  fun setLineWidthUnit(value: String) {
    lineWidthUnit = RenderSize.Unit.valueOf(value)
    updatePolyline()
  }

  fun setOnUpdateListener(listener: OnUpdateListener?) {
    this.listener = listener
  }

  private fun createPolyline(coordinates: ArrayList<GeoCoordinates>): MapPolyline {
    val geoPolyline = GeoPolyline(coordinates)
    val lineSize = MapMeasureDependentRenderSize(lineWidthUnit, lineWidth)

    return MapPolyline(
      geoPolyline,
      MapPolyline.SolidRepresentation(
        lineSize,
        lineColor,
        LineCap.BUTT
      )
    )
  }

  fun updatePolyline() {
    if (coordinates.size > 0) {
      val newPolyline = createPolyline(coordinates)
      listener?.onUpdate(mapPolyline, newPolyline)
      mapPolyline = newPolyline
    }
  }

//  fun clearPolyline() {
//    coordinates = arrayListOf()
//    mapPolyline = null
//    listener = null
//  }

  private fun convertToGeoCoordinates(readableArray: ReadableArray): ArrayList<GeoCoordinates> {
    val coordinates = ArrayList<GeoCoordinates>()

    for (i in 0 until readableArray.size()) {
      val item = readableArray.getMap(i)
      val lat = item.getDouble("lat")
      val lon = item.getDouble("lon")
      coordinates.add(GeoCoordinates(lat, lon))
    }
    return coordinates
  }

  fun interface OnUpdateListener {
    fun onUpdate(old: MapPolyline?, new: MapPolyline)
  }

  companion object {
    private const val TAG = "PolylineView"
  }
}

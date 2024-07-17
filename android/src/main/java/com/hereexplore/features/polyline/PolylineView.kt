package com.hereexplore.features.polyline

import android.content.Context
import com.facebook.react.bridge.ReadableArray
import com.here.sdk.core.Color
import com.here.sdk.core.GeoCoordinates
import com.here.sdk.core.GeoPolyline
import com.here.sdk.mapview.LineCap
import com.here.sdk.mapview.MapMeasureDependentRenderSize
import com.here.sdk.mapview.MapPolyline
import com.here.sdk.mapview.RenderSize
import com.hereexplore.features.item.ItemView
import com.hereexplore.helpers.ColorParser
import com.hereexplore.helpers.CoordinatesUtils

class PolylineView(context: Context?) : ItemView(context) {

  private var geoPolyline = arrayListOf<GeoCoordinates>()

  private var lineType: String = "SOLID" // or "DASH"

  private var lineWidth: Double = 8.0

  private var lineColor: Color = Color.valueOf(255)

  private var lineLength: Double = 2.0

  private var gapColor: Color = Color.valueOf(0f, 0f, 0f, 0f)

  private var gapLength: Double = 2.0

  private var outlineWidth: Double = 0.0

  private var outlineColor: Color = Color.valueOf(0f, 0f, 0f, 0f)

  private var capShape: LineCap = LineCap.ROUND

  private var lineWidthUnit: RenderSize.Unit = RenderSize.Unit.PIXELS

  private var mapPolyline: MapPolyline? = null

  fun setGeoPolyline(value: ReadableArray?) {
    if (value != null && value.size() > 1) {
      geoPolyline = CoordinatesUtils.toCoordinatesList(value)
    }
  }

  fun setLineType(value: String) {
    lineType = value
  }

  fun setLineWidth(value: Double) {
    lineWidth = value
  }

  fun setLineColor(value: Double) {
    lineColor = ColorParser.toHereColor(value)
  }

  fun setOutlineWidth(value: Double) {
    outlineWidth = value
  }

  fun setOutlineColor(value: Double) {
    outlineColor = ColorParser.toHereColor(value)
  }

  fun setLineLength(value: Double) {
    lineLength = value
  }

  fun setGapColor(value: Double) {
    gapColor = ColorParser.toHereColor(value)
  }

  fun setGapLength(value: Double) {
    gapLength = value
  }

  fun setCapShape(value: String) {
    capShape = LineCap.valueOf(value)
  }

  fun setLineWidthUnit(value: String) {
    lineWidthUnit = RenderSize.Unit.valueOf(value)
  }

  override fun updateFeature() {
    if (geoPolyline.size > 1) {
      val newPolyline = createPolyline()
      val mapScene = parentMap?.mapScene

      mapPolyline?.let { mapScene?.removeMapPolyline(it) }

      mapScene?.addMapPolyline(newPolyline)
      mapPolyline = newPolyline
    }
  }

  override fun removeFeature() {
    mapPolyline?.let { parentMap?.mapScene?.removeMapPolyline(it) }
    mapPolyline = null
    unassignMap()
  }

  private fun createPolyline(): MapPolyline {
    val geoPolyline = GeoPolyline(geoPolyline)

    val representation =
      if (lineType == "SOLID") {
        MapPolyline.SolidRepresentation(
          MapMeasureDependentRenderSize(lineWidthUnit, lineWidth),
          lineColor,
          MapMeasureDependentRenderSize(lineWidthUnit, outlineWidth),
          outlineColor,
          capShape
        )
      }
      else {
        MapPolyline.DashRepresentation(
          MapMeasureDependentRenderSize(lineWidthUnit, lineWidth),
          MapMeasureDependentRenderSize(lineWidthUnit, lineLength),
          MapMeasureDependentRenderSize(lineWidthUnit, gapLength),
          lineColor,
          gapColor
        )
      }

    return MapPolyline(
      geoPolyline, representation
    )
  }
}

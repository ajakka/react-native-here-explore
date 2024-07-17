package com.hereexplore.features.arrow

import android.content.Context
import com.facebook.react.bridge.ReadableArray
import com.here.sdk.core.Color
import com.here.sdk.core.GeoCoordinates
import com.here.sdk.core.GeoPolyline
import com.here.sdk.mapview.MapArrow
import com.hereexplore.features.item.ItemView
import com.hereexplore.helpers.ColorParser
import com.hereexplore.helpers.CoordinatesUtils

class ArrowView(context: Context?) : ItemView(context) {

  private var geoPolyline = arrayListOf<GeoCoordinates>()

  private var lineColor: Color = Color.valueOf(255)

  private var lineWidth: Double = 8.0

  private var mapArrow: MapArrow? = null

  fun setGeoPolyline(value: ReadableArray?) {
    if (value != null && value.size() > 1) {
      geoPolyline = CoordinatesUtils.toCoordinatesList(value)
    }
  }

  fun setLineColor(value: Double) {
    lineColor = ColorParser.toHereColor(value)
  }

  fun setLineWidth(value: Double) {
    lineWidth = value
  }

  override fun updateFeature() {
    if (geoPolyline.size > 1) {
      val newArrow = createArrow()

      mapArrow?.let {
        parentMap?.mapScene?.removeMapArrow(it)
      }
      parentMap?.mapScene?.addMapArrow(newArrow)
      mapArrow = newArrow
    }
  }

  override fun removeFeature() {
    val mapScene = parentMap?.mapScene
    val currentMapArrow = mapArrow

    if (currentMapArrow != null) {
      mapScene?.removeMapArrow(currentMapArrow)
      mapArrow = null
      unassignMap()
    }
  }

  private fun createArrow(): MapArrow {
    return MapArrow(GeoPolyline(geoPolyline), lineWidth, lineColor)
  }
}

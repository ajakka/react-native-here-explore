package com.mapshere.components.polygon

import android.content.Context
import com.facebook.react.bridge.ReadableArray
import com.facebook.react.bridge.ReadableMap
import com.here.sdk.core.Color
import com.here.sdk.core.GeoCircle
import com.here.sdk.core.GeoCoordinates
import com.here.sdk.core.GeoPolygon
import com.here.sdk.mapview.MapPolygon
import com.mapshere.components.item.ItemView
import com.mapshere.utils.ColorParser
import com.mapshere.utils.CoordinatesUtils

class PolygonView(context: Context?) : ItemView(context) {

  private var geoCoordinates: ArrayList<GeoCoordinates>? = null

  private var geoCircle: GeoCircle? = null

  private var color: Color = Color(0f, 0f, 0f, 127f)

  private var outlineColor: Color = Color(0f, 0f, 0f, 0f)

  private var outlineWidth: Double = 0.0

  private var mapPolygon: MapPolygon? = null

  fun setGeoCoordinates(value: ReadableArray?) {
    if (value != null) {
      geoCoordinates = CoordinatesUtils.toCoordinatesList(value)
      geoCircle = null
    }
  }

  fun setGeoCircle(value: ReadableMap?) {
    val circleMap = value?.getMap("center")

    if (circleMap != null) {
      val radiusInMeters = value.getDouble("radiusInMeters")
      geoCircle = GeoCircle(
        CoordinatesUtils.toCoordinates(circleMap),
        radiusInMeters
      )
      geoCoordinates = null
    }
  }

  fun setColor(value: Double) {
    color = if (value.toInt() == 0) {
      Color(0f, 0f, 0f, 127f)
    } else {
      ColorParser.toHereColor(value)
    }
  }

  fun setOutlineColor(value: Double) {
    outlineColor = ColorParser.toHereColor(value)
  }

  fun setOutlineWidth(value: Double) {
    outlineWidth = value
  }

  override fun updateFeature() {
    val newPolygon = createPolygon()
    val mapScene = parentMap?.mapScene

    mapPolygon?.let { mapScene?.removeMapPolygon(it) }
    newPolygon?.let {
      mapScene?.addMapPolygon(it)
      mapPolygon = it
    }
  }

  override fun removeFeature() {
    mapPolygon?.let { parentMap?.mapScene?.removeMapPolygon(it) }
    mapPolygon = null
    unassignMap()
  }

  private fun createPolygon(): MapPolygon? {
    val localGeoCircle = geoCircle
    val localGeoCoordinates = geoCoordinates

    return if (localGeoCircle != null) {
      MapPolygon(GeoPolygon(localGeoCircle), color, outlineColor, outlineWidth)
    } else if (localGeoCoordinates != null && localGeoCoordinates.size > 2) {
      MapPolygon(GeoPolygon(localGeoCoordinates), color, outlineColor, outlineWidth)
    } else {
      null
    }
  }
}

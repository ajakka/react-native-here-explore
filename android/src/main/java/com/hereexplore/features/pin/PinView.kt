package com.hereexplore.features.pin

import android.content.Context
import android.view.View
import com.facebook.react.bridge.ReadableMap
import com.here.sdk.core.Anchor2D
import com.here.sdk.core.GeoCoordinates
import com.here.sdk.mapview.MapView
import com.hereexplore.features.item.ItemView
import com.hereexplore.helpers.CoordinatesUtils

class PinView(context: Context?) : ItemView(context) {

  private var mapPin: MapView.ViewPin? = null
  private var geoCoordinates: GeoCoordinates? = null
  private var anchor2D = Anchor2D(0.5, 0.5)
  private var pinView: View? = null

  fun setGeoCoordinate(value: ReadableMap?) {
    if (value != null) {
      geoCoordinates = CoordinatesUtils.toGeoCoordinates(value)
    }
  }

  fun setAnchor(value: ReadableMap?) {
    if (value != null) {
      anchor2D.horizontal = if (value.hasKey("horizontal")) value.getDouble("horizontal") else 0.5
      anchor2D.vertical = if (value.hasKey("vertical")) value.getDouble("vertical") else 0.5
    }
  }

  override fun addView(childView: View, childPosition: Int) {
    pinView = childView
  }

  override fun updateFeature() {
    mapPin?.let {
      mapPin?.unpin()
    }
    pinView?.let {
      mapPin = parentMap?.pinView(it, geoCoordinates)
      mapPin!!.anchorPoint = anchor2D
    }
  }


  override fun removeFeature() {
    mapPin?.let { mapPin?.unpin() }
    unassignMap()
  }
}

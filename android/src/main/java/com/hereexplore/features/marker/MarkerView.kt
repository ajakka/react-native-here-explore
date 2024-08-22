package com.hereexplore.features.marker

import android.annotation.SuppressLint
import android.content.Context
import android.graphics.Bitmap
import android.graphics.BitmapFactory
import android.graphics.drawable.Drawable
import com.bumptech.glide.Glide
import com.bumptech.glide.request.target.CustomTarget
import com.bumptech.glide.request.transition.Transition
import com.facebook.react.bridge.ReadableMap
import com.here.sdk.core.Anchor2D
import com.here.sdk.core.GeoCoordinates
import com.here.sdk.mapview.MapImageFactory
import com.here.sdk.mapview.MapMarker
import com.hereexplore.features.item.ItemView
import com.hereexplore.helpers.CoordinatesUtils

class MarkerView(context: Context?) : ItemView(context) {

  private var geoCoordinates: GeoCoordinates? = null

  private var imageUri: String? = null

  private var scale: Double? = null

  private var width: Double? = null

  private var height: Double? = null

  private var anchor2D = Anchor2D(0.5, 0.5)

  private var vertical: Double = 0.5

  private var mapMarker: MapMarker? = null

  fun setGeoCoordinate(value: ReadableMap?) {
    if (value != null) {
      geoCoordinates = CoordinatesUtils.toCoordinates(value)
    }
  }

  fun setImageUri(value: ReadableMap?) {
    if (value != null) {
      imageUri = value.getString("uri")
    }
  }

  fun setScale(value: Double) {
    scale = if (value != 0.0) value else null
  }

  fun setSize(value: ReadableMap?) {
    if (value != null) {
      width = if (value.hasKey("width")) value.getDouble("width") else null
      height = if (value.hasKey("height")) value.getDouble("height") else null
    }
  }

  fun setAnchor(value: ReadableMap?) {
    if (value != null) {
      anchor2D.horizontal = if (value.hasKey("horizontal")) value.getDouble("horizontal") else 0.5
      anchor2D.vertical = if (value.hasKey("vertical")) value.getDouble("vertical") else 0.5
    }
  }

  @SuppressLint("DiscouragedApi")
  private fun getDrawableResourceByName(name: String): Int {
    return resources.getIdentifier(name, "drawable", context.packageName)
  }

  override fun updateFeature() {
    imageUri?.let { uri ->

      if (
        uri.startsWith("http://") ||
        uri.startsWith("https://") ||
        uri.startsWith("file://") ||
        uri.startsWith("asset://") ||
        uri.startsWith("data:")
      ) {
        Glide.with(this)
          .asBitmap()
          .load(uri)
          .into(object : CustomTarget<Bitmap?>() {
            override fun onResourceReady(resource: Bitmap, transition: Transition<in Bitmap?>?) {
              assignMarkerBitmapToMap(resource)
            }
            override fun onLoadCleared(placeholder: Drawable?) {}
          })
      } else {
        val drawableId = getDrawableResourceByName(uri)
        val resource = BitmapFactory.decodeResource(resources, drawableId)
        assignMarkerBitmapToMap(resource)
      }
    }
  }

  fun assignMarkerBitmapToMap(resource: Bitmap) {
    val newWidth = width?.toInt() ?: resource.width
    val scaledWidth = scale?.let { (newWidth * it).toInt() } ?: newWidth

    val newHeight = height?.toInt() ?: resource.height
    val scaledHeight = scale?.let { (newHeight * it).toInt() } ?: newHeight

    val scaledResource = Bitmap.createScaledBitmap(resource, scaledWidth, scaledHeight, false)

    val mapImage = MapImageFactory.fromBitmap(scaledResource)
    val newMarker = geoCoordinates?.let { coordinates -> MapMarker(coordinates, mapImage, anchor2D) }

    val mapScene = parentMap?.mapScene
    mapMarker?.let { mapScene?.removeMapMarker(it) }
    newMarker?.let {
      mapScene?.addMapMarker(it)
      mapMarker = it
    }
  }

  override fun removeFeature() {
    mapMarker?.let { parentMap?.mapScene?.removeMapMarker(it) }
    mapMarker = null
    unassignMap()
  }
}

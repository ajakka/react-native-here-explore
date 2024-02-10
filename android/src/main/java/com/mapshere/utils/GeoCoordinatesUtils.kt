package com.mapshere.utils

import android.util.Log
import com.facebook.react.bridge.NoSuchKeyException
import com.facebook.react.bridge.ReadableArray
import com.facebook.react.bridge.ReadableMap
import com.here.sdk.core.GeoCoordinates

class GeoCoordinatesUtils {
  companion object {
    fun convertToGeoCoordinates(readableMap: ReadableMap): GeoCoordinates {
      val latitude = readableMap.getDouble("latitude")
      val longitude = readableMap.getDouble("longitude")
      val altitude: Double?

      return if (readableMap.hasKey("altitude")){
          altitude = readableMap.getDouble("altitude")
        GeoCoordinates(latitude, longitude, altitude)
      } else {
        GeoCoordinates(latitude, longitude)
      }
    }

    fun convertToGeoCoordinatesList(readableArray: ReadableArray?): ArrayList<GeoCoordinates> {
      val coordinates = ArrayList<GeoCoordinates>()
      val arraySize = readableArray?.size()

      if (arraySize != null) {
        for (i in 0 until arraySize) {
          val item = readableArray.getMap(i)
          coordinates.add(convertToGeoCoordinates(item))
        }
      }
      return coordinates
    }
  }
}

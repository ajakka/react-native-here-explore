package com.hereexplore.helpers

import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.ReadableArray
import com.facebook.react.bridge.ReadableMap
import com.facebook.react.bridge.WritableArray
import com.facebook.react.bridge.WritableMap
import com.here.sdk.core.GeoCoordinates

class CoordinatesUtils {
  companion object {
    fun toCoordinates(readableMap: ReadableMap): GeoCoordinates {
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

    fun toCoordinatesList(readableArray: ReadableArray?): ArrayList<GeoCoordinates> {
      val coordinates = ArrayList<GeoCoordinates>()
      val arraySize = readableArray?.size()

      if (arraySize != null) {
        for (i in 0 until arraySize) {
          val item = readableArray.getMap(i)
          coordinates.add(toCoordinates(item))
        }
      }
      return coordinates
    }

    fun fromCoordinates(coordinates: GeoCoordinates): WritableMap {
      val map = Arguments.createMap()
      map.putDouble("latitude", coordinates.latitude)
      map.putDouble("longitude", coordinates.longitude)
      coordinates.altitude?.let { map.putDouble("altitude", it) }
      return map
    }

    fun fromCoordinatesList(coordinatesList: List<GeoCoordinates>): WritableArray {
      val map = Arguments.createArray()
      coordinatesList.map { map.pushMap(fromCoordinates(it)) }
      return map
    }
  }
}

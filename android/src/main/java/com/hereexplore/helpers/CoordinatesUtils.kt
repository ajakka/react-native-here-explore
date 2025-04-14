package com.hereexplore.helpers

import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.ReadableArray
import com.facebook.react.bridge.ReadableMap
import com.facebook.react.bridge.WritableArray
import com.facebook.react.bridge.WritableMap
import com.here.sdk.core.GeoCoordinates
import com.here.sdk.routing.Waypoint

class CoordinatesUtils {
  companion object {
    fun toGeoCoordinates(readableMap: ReadableMap): GeoCoordinates {
      val latitude = readableMap.getDouble("latitude")
      val longitude = readableMap.getDouble("longitude")
      val altitude: Double?

      return if (readableMap.hasKey("altitude")) {
        altitude = readableMap.getDouble("altitude")
        GeoCoordinates(latitude, longitude, altitude)
      } else {
        GeoCoordinates(latitude, longitude)
      }
    }

    fun toGeoCoordinatesList(readableArray: ReadableArray?): ArrayList<GeoCoordinates> {
      val coordinates = ArrayList<GeoCoordinates>()
      val arraySize = readableArray?.size()

      if (arraySize != null) {
        for (i in 0 until arraySize) {
          val item = readableArray.getMap(i)
          coordinates.add(toGeoCoordinates(item))
        }
      }
      return coordinates
    }

    fun toWaypoint(readableMap: ReadableMap): Waypoint {
      return Waypoint(toGeoCoordinates(readableMap))
    }

    fun toWaypointList(readableArray: ReadableArray?): ArrayList<Waypoint> {
      val coordinates = ArrayList<Waypoint>()
      val arraySize = readableArray?.size()

      if (arraySize != null) {
        for (i in 0 until arraySize) {
          val item = readableArray.getMap(i)
          coordinates.add(toWaypoint(item))
        }
      }
      return coordinates
    }

    fun fromGeoCoordinates(coordinates: GeoCoordinates): WritableMap {
      val map = Arguments.createMap()
      map.putDouble("latitude", coordinates.latitude)
      map.putDouble("longitude", coordinates.longitude)
      coordinates.altitude?.let { map.putDouble("altitude", it) }
      return map
    }

    fun fromGeoCoordinatesList(coordinatesList: List<GeoCoordinates>): WritableArray {
      val map = Arguments.createArray()
      coordinatesList.map { map.pushMap(fromGeoCoordinates(it)) }
      return map
    }
  }
}

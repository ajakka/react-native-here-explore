import React
import Foundation

import heresdk

@objcMembers public class PolygonViewImpl: ItemView, ItemFeatureEvents {

  var currentMapPolygon: MapPolygon?

  public var geoCoordinates: NSArray = [] {
    didSet { updateFeature() }
  }

  public var geoCircle: NSDictionary = [:] {
    didSet { updateFeature() }
  }

  public var color: Double = 0 {
    didSet { updateFeature() }
  }

  public var outlineColor: Double = 0 {
    didSet { updateFeature() }
  }

  public var outlineWidth: Double = 2.0 {
    didSet { updateFeature() }
  }

  public func updateFeature() {
    var mapPolygon: MapPolygon?

    if geoCoordinates.count > 2 {
      let vertices = toCoordinatesList(raw: geoCoordinates)
      mapPolygon = try? MapPolygon(
        geometry: GeoPolygon(vertices: vertices),
        color: RCTConvert.uiColor(color),
        outlineColor: RCTConvert.uiColor(outlineColor),
        outlineWidthInPixels: outlineWidth
      )
    }
    else if (geoCircle.count > 1) {
      if let vertices = toGeoCircle(raw: geoCircle) {
        mapPolygon = MapPolygon(
          geometry: GeoPolygon(geoCircle: vertices),
          color: RCTConvert.uiColor(color),
          outlineColor: RCTConvert.uiColor(outlineColor),
          outlineWidthInPixels: outlineWidth
        )
      }
    }

    if let oldMapPolygon = currentMapPolygon {
      parentMap?.mapScene.removeMapPolygon(oldMapPolygon)
    }

    if let newMapPolygon = mapPolygon {
      parentMap?.mapScene.addMapPolygon(newMapPolygon)
      currentMapPolygon = newMapPolygon
    }
  }

  public func removeFeature() {
    if let oldMapPolygon = currentMapPolygon {
      parentMap?.mapScene.removeMapPolygon(oldMapPolygon)
    }
    currentMapPolygon = nil
    unassignMap()
  }
}

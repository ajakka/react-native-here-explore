import React
import Foundation

import heresdk

@objcMembers public class ArrowViewImpl: ItemView {

  var mapArrow: MapArrow?

  @objc public var geoPolyline: NSArray = [] {
    didSet { updateFeature() }
  }

  @objc public var lineColor: Double = 0 {
    didSet { updateFeature() }
  }

  @objc public var lineWidth: Double = 8.0 {
    didSet { updateFeature() }
  }

  public override func updateFeature() {
    guard geoPolyline.count > 1 else { return }
    let coords = toCoordinatesList(raw: geoPolyline)
    guard coords.count > 1 else { return }

    if let old = mapArrow {
      parentMap?.mapScene.removeMapArrow(old)
    }

    if let geometry = try? GeoPolyline(vertices: coords) {
      let arrow = MapArrow(
        geometry: geometry,
        widthInPixels: lineWidth,
        color: RCTConvert.uiColor(lineColor)
      )
      mapArrow = arrow
      parentMap?.mapScene.addMapArrow(arrow)
    }
  }

  public override func removeFeature() {
    if let old = mapArrow {
      parentMap?.mapScene.removeMapArrow(old)
    }
    mapArrow = nil
    unassignMap()
  }
}

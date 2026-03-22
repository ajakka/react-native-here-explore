import React
import Foundation

import heresdk

@objcMembers public class PolylineViewImpl: ItemView, ItemFeatureEvents {
  
  var mapPolyline: MapPolyline?
  
  public var geoPolyline: NSArray = [] {
    didSet { updateFeature() }
  }
  
  public var lineType: String = "SOLID" {
    didSet { updateFeature() }
  }
  
  public var lineWidth: Double = 8.0 {
    didSet { updateFeature() }
  }
  public var lineColor: Double = 0 {
    didSet { updateFeature() }
  }
  
  public var lineLength: Double = 2.0 {
    didSet { updateFeature() }
  }
  
  public var gapColor: Double = 0 {
    didSet { updateFeature() }
  }
  public var gapLength: Double = 0 {
    didSet { updateFeature() }
  }
  
  public var outlineWidth: Double = 0 {
    didSet { updateFeature() }
  }
  
  public var outlineColor: Double = 0 {
    didSet { updateFeature() }
  }
  public var capShape: String = "ROUND" {
    didSet { updateFeature() }
  }
  
  public var lineWidthUnit: String = "PIXELS" {
    didSet { updateFeature() }
  }
  
  public func updateFeature() {
    guard geoPolyline.count > 1 else { return }
    
    let coords = toCoordinatesList(raw: geoPolyline)
    guard coords.count > 1 else { return }
    
    let sizeUnit = convertRenderSizeUnit(scheme: lineWidthUnit)
    var representation: MapPolyline.Representation?
    
    if lineType == "SOLID" {
      representation = try? MapPolyline.SolidRepresentation(
        lineWidth: MapMeasureDependentRenderSize(sizeUnit: sizeUnit, size: lineWidth),
        color: RCTConvert.uiColor(lineColor),
        outlineWidth: MapMeasureDependentRenderSize(sizeUnit: sizeUnit, size: outlineWidth),
        outlineColor: RCTConvert.uiColor(outlineColor),
        capShape: convertLineCap(scheme: capShape)
      )
    } else if lineType == "DASH" {
      representation = try? MapPolyline.DashRepresentation(
        lineWidth: MapMeasureDependentRenderSize(sizeUnit: sizeUnit, size: lineWidth),
        dashLength: MapMeasureDependentRenderSize(sizeUnit: sizeUnit, size: lineLength),
        gapLength: MapMeasureDependentRenderSize(sizeUnit: sizeUnit, size: gapLength),
        dashColor: RCTConvert.uiColor(lineColor),
        gapColor: RCTConvert.uiColor(gapColor)
      )
    }
    
    if let old = mapPolyline {
      parentMap?.mapScene.removeMapPolyline(old)
    }
    
    if let geometry = try? GeoPolyline(vertices: coords),
       let rep = representation {
      let newPolyline = MapPolyline(geometry: geometry, representation: rep)
      parentMap?.mapScene.addMapPolyline(newPolyline)
      mapPolyline = newPolyline
    }
  }
  
  public func removeFeature() {
    if let old = mapPolyline {
      parentMap?.mapScene.removeMapPolyline(old)
    }
    mapPolyline = nil
    unassignMap()
  }
}

import heresdk

@objc(PolylineViewManager)
class PolylineViewManager: RCTViewManager {
    
    @objc override func view() -> (PolylineView) {
        return PolylineView()
    }
    
    @objc override static func requiresMainQueueSetup() -> Bool {
        return false
    }
    
    @objc override static func moduleName() -> String! {
        return "PolylineView"
    }
}

class PolylineView : ItemView {
    
    var mapPolyline: MapPolyline?
    
    @objc var geoPolyline: NSArray = []
    { didSet {self.updateFeature()} }
    
    @objc var lineType: String = "SOLID" // or "DASH"
    { didSet {self.updateFeature()} }
    
    @objc var lineWidth: Double = 8.0
    { didSet {self.updateFeature()} }
    
    @objc var lineColor: Double = 0
    { didSet {self.updateFeature()} }
    
    @objc var lineLength: Double = 2.0
    { didSet {self.updateFeature()} }
    
    @objc var gapColor: Double = 0
    { didSet {self.updateFeature()} }
    
    @objc var gapLength: Double = 0
    { didSet {self.updateFeature()} }
    
    @objc var outlineWidth: Double = 0
    { didSet {self.updateFeature()} }
    
    @objc var outlineColor: Double = 0
    { didSet {self.updateFeature()} }
    
    @objc var capShape: String = "ROUND"
    { didSet {self.updateFeature()} }
    
    @objc var lineWidthUnit: String = "PIXELS"
    { didSet {self.updateFeature()} }
    
    override func updateFeature() {
        if (geoPolyline.count <= 1) { return }
        let geoCoordinates = toCoordinatesList(raw: geoPolyline)
        
        if (geoCoordinates.count <= 1) { return }
        
        var representation: MapPolyline.Representation?
        
        let sizeUnite = convertRenderSizeUnit(scheme: lineWidthUnit)
        if (lineType == "SOLID") {
            representation = try? MapPolyline.SolidRepresentation(
                lineWidth: MapMeasureDependentRenderSize(sizeUnit: sizeUnite, size: lineWidth),
                color: RCTConvert.uiColor(lineColor),
                outlineWidth: MapMeasureDependentRenderSize(sizeUnit: sizeUnite, size: outlineWidth),
                outlineColor: RCTConvert.uiColor(outlineColor),
                capShape: convertLineCap(scheme: capShape))
        }
        else if (lineType == "DASH") {
            representation = try? MapPolyline.DashRepresentation(
                lineWidth: MapMeasureDependentRenderSize(sizeUnit: sizeUnite, size: lineWidth),
                dashLength: MapMeasureDependentRenderSize(sizeUnit: sizeUnite, size: lineLength),
                gapLength: MapMeasureDependentRenderSize(sizeUnit: sizeUnite, size: gapLength),
                dashColor: RCTConvert.uiColor(lineColor),
                gapColor: RCTConvert.uiColor(gapColor))
        }
        
        if let oldMapPolyline = mapPolyline {
            parentMap?.mapScene.removeMapPolyline(oldMapPolyline)
        }
        
        if let geometry = try? GeoPolyline(vertices: geoCoordinates),
           let polylineRepresentation = representation {
            
            let newMapPolyline = MapPolyline(
                geometry: geometry,
                representation: polylineRepresentation
            )
            
            parentMap?.mapScene.addMapPolyline(newMapPolyline)
            mapPolyline = newMapPolyline
        }
    }
    
    override func removeFeature() {
        if let oldMapPolyline = mapPolyline {
            parentMap?.mapScene.removeMapPolyline(oldMapPolyline)
        }
        mapPolyline = nil
        unassignMap()
    }
    
}

import heresdk

@objc(ArrowViewManager)
class ArrowViewManager: RCTViewManager {
    
    @objc override func view() -> (ArrowView) {
        return ArrowView()
    }
    
    @objc override static func requiresMainQueueSetup() -> Bool {
        return false
    }
    
    @objc override static func moduleName() -> String! {
        return "ArrowView"
    }
}

class ArrowView : ItemView {
    
    var mapArrow: MapArrow?
    
    @objc var geoPolyline: NSArray = []
    { didSet {self.updateFeature()} }
    
    @objc var lineColor: Double = 0
    { didSet {self.updateFeature()} }
    
    @objc var lineWidth: Double = 8.0
    { didSet {self.updateFeature()} }
    
    override func updateFeature() {
        if (geoPolyline.count <= 1) { return }
        let geoCoordinates = toCoordinatesList(raw: geoPolyline)
        if (geoCoordinates.count <= 1) { return }
        
        if let oldMapArrow = mapArrow {
            parentMap?.mapScene.removeMapArrow(oldMapArrow)
        }
        
        if let geometry = try? GeoPolyline(vertices: geoCoordinates) {
            let newMapArrow = MapArrow(
                geometry: geometry,
                widthInPixels: lineWidth,
                color: RCTConvert.uiColor(lineColor)
            )
            
            mapArrow = newMapArrow
            parentMap?.mapScene.addMapArrow(newMapArrow)
        }
    }
    
    override func removeFeature() {
        if let oldMapArrow = mapArrow {
            parentMap?.mapScene.removeMapArrow(oldMapArrow)
        }
        mapArrow = nil
        unassignMap()
    }
    
}

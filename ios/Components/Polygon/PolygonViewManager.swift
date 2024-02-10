import heresdk

@objc(PolygonViewManager)
class PolygonViewManager: RCTViewManager {
    
    @objc override func view() -> (PolygonView) {
        return PolygonView()
    }
    
    @objc override static func requiresMainQueueSetup() -> Bool {
        return false
    }
    
    @objc override static func moduleName() -> String! {
        return "PolygonView"
    }
}

class PolygonView : ItemView {
    
    var currentMapPolygon: MapPolygon?
    
    @objc var geoCoordinates: NSArray = []
    { didSet {self.updateFeature()} }
    
    @objc var geoCircle: NSDictionary = [:]
    { didSet {self.updateFeature()} }
    
    @objc var color: Double = 8.0
    { didSet {self.updateFeature()} }
    
    @objc var outlineColor: Double = 0
    { didSet {self.updateFeature()} }
    
    @objc var outlineWidth: Double = 2.0
    { didSet {self.updateFeature()} }
    
    override func updateFeature() {
        var mapPolygon: MapPolygon?
        
        if (geoCoordinates.count > 2) {
            let vertices = convertToGeoCoordinatesList(raw: geoCoordinates)
            mapPolygon = try? MapPolygon(
                geometry: GeoPolygon(vertices: vertices),
                color: RCTConvert.uiColor(color),
                outlineColor: RCTConvert.uiColor(color),
                outlineWidthInPixels: outlineWidth
            )
            
        }
        else if (geoCircle.count > 1) {
            if let vertices = convertToGeoCircle(raw: geoCircle) {
                mapPolygon = MapPolygon(
                    geometry: GeoPolygon(geoCircle: vertices),
                    color: RCTConvert.uiColor(color),
                    outlineColor: RCTConvert.uiColor(color),
                    outlineWidthInPixels: outlineWidth
                )}
        }
        
        if let oldMapPolygon = currentMapPolygon{
            parentMap?.mapScene.removeMapPolygon(oldMapPolygon)
        }
        
        if let newMapPolygon = mapPolygon {
            parentMap?.mapScene.addMapPolygon(newMapPolygon)
            currentMapPolygon = newMapPolygon
        }
    }
    
    override func removeFeature() {
        if let oldMapPolygon = currentMapPolygon {
            parentMap?.mapScene.removeMapPolygon(oldMapPolygon)
        }
        currentMapPolygon = nil
        unassignMap()
    }
    
}

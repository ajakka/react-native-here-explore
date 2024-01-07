import heresdk
import SwiftUI

@objc(PolylineViewManager)
class PolylineViewManager: RCTViewManager {
    
    @objc override func view() -> (PolylineView) {
        return PolylineView()
    }
    
    @objc override static func requiresMainQueueSetup() -> Bool {
        return false
    }
    
    override static func moduleName() -> String! {
        return "PolylineView"
    }
}

class PolylineView : UIView {
    
    var currentPolyline: MapPolyline?
    
    var onUpdate: ((MapPolyline?, MapPolyline) -> Void)?
    
    @objc var coordinates: NSArray = [] {
        didSet {self.updatePolyline()}
    }
    
    @objc var lineColor: Double = 0 {
        didSet {self.updatePolyline()}
    }
    
    @objc var lineWidth: Double = 8.0 {
        didSet {self.updatePolyline()}
    }
    
    @objc var lineWidthUnit: String = "PIXELS" {
        didSet {self.updatePolyline()}
    }
    
    func updatePolyline() {
        if coordinates.count == 0 {return}
        
        print("coordinates", coordinates)
        
        var geoCoordinates: [GeoCoordinates] = []
        for coord in coordinates {
            if let dict = coord as? NSDictionary,
               let lat = dict["lat"] as? Double,
               let lon = dict["lon"] as? Double {
                let geoCoord = GeoCoordinates(latitude: lat, longitude: lon)
                geoCoordinates.append(geoCoord)
            }
        }
        // Prevents code from crashing when there's only
        // one coordinate entery by duplicating it
        if geoCoordinates.count == 1 {
            if let firstCoord = geoCoordinates.first {
                geoCoordinates.append(firstCoord)
            }
        }
        
        print("geoCoordinates", geoCoordinates)
        
        let geoPolyline = try! GeoPolyline(vertices: geoCoordinates)
        let lineColor = RCTConvert.uiColor(lineColor) ?? UIColor(red: 1, green: 1, blue: 1, alpha: 1)
        let widthInPixels = lineWidth
        
        let lineWidth = try! MapMeasureDependentRenderSize(sizeUnit: RenderSize.Unit.pixels, size: widthInPixels)
        let representation = try! MapPolyline.SolidRepresentation(
            lineWidth: lineWidth,
            color: lineColor,
            capShape: LineCap.round)
        
        let newMapPolyline = MapPolyline(geometry: geoPolyline, representation: representation)
        
        onUpdate?(currentPolyline, newMapPolyline)
        
        currentPolyline = newMapPolyline
    }
}

protocol OnUpdateListener {
    func onUpdate(old: MapPolyline?, new: MapPolyline)
}

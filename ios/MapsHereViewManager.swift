import heresdk

@objc(MapsHereViewManager)
class MapsHereViewManager: RCTViewManager {
    
    @objc override func view() -> (MapsHereView) {
        let hereMapView = MapsHereView()
        //        hereMapView.loadCameraView()
        return hereMapView
    }
    
    @objc override static func requiresMainQueueSetup() -> Bool {
        return false
    }
    
    override static func moduleName() -> String! {
        return "MapsHereView"
    }
}

class MapsHereView : UIView {
    
    let mapView = MapView()
    
    @objc var zoomKind: String = "ZOOM_LEVEL" {
        didSet {self.updateCameraView()}
    }
    
    @objc var zoomValue: Double = 5.0 {
        didSet {self.updateCameraView()}
    }
    
    @objc var coordinates: NSDictionary = ["lat": 0.0, "lon": 0.0] {
        didSet {self.updateCameraView()}
    }
    
    @objc var mapScheme: String = "NORMAL_DAY" {
        didSet {self.loadCameraView()}
    }
    
    override func layoutSubviews() {
        super.layoutSubviews()
        mapView.frame = self.bounds
        self.loadCameraView()
        self.addSubview(mapView)
    }
    
    override func addSubview(_ view: UIView) {
        if let polylineView = view as? PolylineView {
            polylineView.onUpdate = { old, new in
                if let oldPolyline = old {
                    self.mapView.mapScene.removeMapPolyline(oldPolyline)
                }
                self.mapView.mapScene.addMapPolyline(new)
            }
            polylineView.updatePolyline()
        }
        //        else {
        super.addSubview(view)
        //        }
    }
    
    override func willRemoveSubview(_ subview: UIView) {
        if let polylineView = subview as? PolylineView {
            if let currentPolyline = polylineView.currentPolyline {
                self.mapView.mapScene.removeMapPolyline(currentPolyline)
            }
        }
        super.willRemoveSubview(subview)
    }
    
    private func updateCameraView() -> Void {
        let latitude = coordinates.value(forKey: "lat") as! Double
        let longitude = coordinates.value(forKey: "lon") as! Double
        
        let kind = convertZoomKind(kind: zoomKind)
        
        self.mapView.camera
            .lookAt(
                point: GeoCoordinates(latitude: latitude, longitude: longitude),
                zoom: MapMeasure(kind: kind, value: zoomValue))
    }
    
    private func loadCameraView() -> Void {
        let scheme = convertMapScheme(scheme: mapScheme)
        self.mapView.mapScene.loadScene(mapScheme: scheme) { mapError in
            guard mapError == nil else {
                print("Error: Map scene not loaded, \(String(describing: mapError))")
                return
            }
            self.updateCameraView()
        }
    }
    
    private func convertZoomKind(kind: String) -> MapMeasure.Kind {
        switch kind {
        case "DISTANCE":
            return .distance
        case "ZOOM_LEVEL":
            return .zoomLevel
        case "SCALE":
            return .scale
        default:
            return .zoomLevel
        }
    }
    
    private func convertMapScheme(scheme: String) -> MapScheme {
        switch scheme {
        case "NORMAL_DAY":
            return .normalDay
        case "NORMAL_NIGHT":
            return .normalNight
        case "SATELLITE":
            return .satellite
        case "HYBRID_DAY":
            return .hybridDay
        case "HYBRID_NIGHT":
            return .hybridNight
        case "LITE_DAY":
            return .liteDay
        case "LITE_NIGHT":
            return .liteNight
        case "LITE_HYBRID_DAY":
            return .liteHybridDay
        case "LITE_HYBRID_NIGHT":
            return .liteHybridNight
        case "LOGISTICS_DAY":
            return .logisticsDay
        default:
            return .normalDay
        }
    }
}

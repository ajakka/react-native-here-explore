import heresdk

@objc(MapsViewManager)
class MapsViewManager: RCTViewManager {
  
  @objc override func view() -> (MapsHereView) {
    let hereMapView = MapsHereView()
    //        hereMapView.loadCameraView()
    return hereMapView
  }
  
  @objc override static func requiresMainQueueSetup() -> Bool {
    return false
  }
  
  @objc override static func moduleName() -> String! {
    return "MapsHereView"
  }
}

class MapsHereView : UIView, TapDelegate, LongPressDelegate {
  
  let mapView = MapView()
  
  @objc var mapScheme: String = "NORMAL_DAY" {
    didSet {self.loadCameraView()}
  }
  
  @objc var watermarkStyle: String = "" {
    didSet {self.loadCameraView()}
  }
  
  @objc var bearing: Double = 0.0 {
    didSet {self.updateCameraView()}
  }
  
  @objc var tilt: Double = 0.0 {
    didSet {self.updateCameraView()}
  }
  
  @objc var geoCoordinates: NSDictionary = [:] {
    didSet {self.updateCameraView()}
  }
  
  @objc var zoomKind: String = "ZOOM_LEVEL" {
    didSet {self.updateCameraView()}
  }
  
  @objc var zoomValue: Double = 8.0 {
    didSet {self.updateCameraView()}
  }
  
  @objc var geoBox: NSDictionary = [:] {
    didSet {self.updateCameraView()}
  }
  
  @objc var onMapTap: RCTDirectEventBlock?
  
  @objc var onMapLongPress: RCTDirectEventBlock?
  
  override func layoutSubviews() {
    super.layoutSubviews()
    mapView.frame = self.bounds
    mapView.gestures.tapDelegate = self
    mapView.gestures.longPressDelegate = self
    
    self.loadCameraView()
    self.addSubview(mapView)
  }
  
  override func addSubview(_ subview: UIView) {
    if let itemView = subview as? ItemView {
      itemView.assignToMap(map: mapView)
      itemView.updateFeature()
    }
    super.addSubview(subview)
  }
  
  override func willRemoveSubview(_ subview: UIView) {
    if let itemView = subview as? ItemView {
      itemView.removeFeature()
    }
    super.willRemoveSubview(subview)
  }
  
  func onTap(origin: Point2D) {
    let geoCoordinates = mapView.viewToGeoCoordinates(viewCoordinates: origin)
    if let onMapTap = onMapTap {
      onMapTap([
        "latitude": geoCoordinates?.latitude ?? 0,
        "longitude": geoCoordinates?.longitude ?? 0,
        "altitude": geoCoordinates?.altitude ?? 0
      ])
    }
  }
  
  func onLongPress(state: GestureState, origin: Point2D) {
    let geoCoordinates = mapView.viewToGeoCoordinates(viewCoordinates: origin)
    if let onMapLongPress = onMapLongPress {
      onMapLongPress([
        "latitude": geoCoordinates?.latitude ?? 0,
        "longitude": geoCoordinates?.longitude ?? 0,
        "altitude": geoCoordinates?.altitude ?? 0
      ])
    }
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
  
  private func updateCameraView() -> Void {
    if (geoBox.count > 0) {
      guard let southWestDict = geoBox["southWestCorner"] as? NSDictionary,
            let northEastDict = geoBox["northEastCorner"] as? NSDictionary,
            let southWestCorner = toCoordinates(raw: southWestDict),
            let northEastCorner = toCoordinates(raw: northEastDict)
      else { return }
      
      self.mapView.camera.lookAt(area: GeoBox(southWestCorner: southWestCorner, northEastCorner: northEastCorner),
                                 orientation: GeoOrientationUpdate(bearing: bearing, tilt: tilt))
    }
    else if (geoCoordinates.count > 0) {
      guard let target = toCoordinates(raw: geoCoordinates)
      else { return }
      
      self.mapView.camera.lookAt(point: target,
                                 orientation: GeoOrientationUpdate(bearing: bearing, tilt: tilt),
                                 zoom: MapMeasure(kind: convertZoomKind(kind: zoomKind), value: zoomValue))
    }
  }
}

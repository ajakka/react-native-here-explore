import Foundation

import heresdk

@objcMembers public class MapViewImpl: UIView, TapDelegate, LongPressDelegate {

  private let mapView = MapView()

  // Callbacks invoked by the Fabric wrapper to emit events upstream
  @objc public var onMapTapCallback: (([String: Any]) -> Void)?
  @objc public var onMapLongPressCallback: (([String: Any]) -> Void)?

  @objc public var mapScheme: String = "NORMAL_DAY" {
    didSet { loadCameraView() }
  }

  @objc public var watermarkStyle: String = "" {
    didSet { loadCameraView() }
  }

  @objc public var bearing: Double = 0.0 {
    didSet { updateCameraView() }
  }

  @objc public var tilt: Double = 0.0 {
    didSet { updateCameraView() }
  }

  @objc public var geoCoordinates: NSDictionary = [:] {
    didSet { updateCameraView() }
  }

  @objc public var zoomKind: String = "ZOOM_LEVEL" {
    didSet { updateCameraView() }
  }

  @objc public var zoomValue: Double = 8.0 {
    didSet { updateCameraView() }
  }

  @objc public var geoBox: NSDictionary = [:] {
    didSet { updateCameraView() }
  }

  public override func didMoveToWindow() {
    super.didMoveToWindow()
    guard window != nil, mapView.superview == nil else { return }
    addSubview(mapView)
    mapView.gestures.tapDelegate = self
    mapView.gestures.longPressDelegate = self
    loadCameraView()
  }

  public override func layoutSubviews() {
    super.layoutSubviews()
    mapView.frame = self.bounds
  }

  // Called by MapView.mm when a child ItemView is mounted
  @objc public func addItemView(_ itemView: ItemView) {
    guard let feature = itemView as? ItemFeatureEvents else {
      preconditionFailure("\(type(of: itemView)) must conform to ItemFeatureEvents")
    }
    itemView.assignToMap(map: mapView)
    feature.updateFeature()
  }

  // Called by MapView.mm when a child ItemView is unmounted
  @objc public func removeItemView(_ itemView: ItemView) {
    guard let feature = itemView as? ItemFeatureEvents else {
      preconditionFailure("\(type(of: itemView)) must conform to ItemFeatureEvents")
    }
    feature.removeFeature()
  }

  public func onTap(origin: Point2D) {
    let coords = mapView.viewToGeoCoordinates(viewCoordinates: origin)
    onMapTapCallback?([
      "latitude": coords?.latitude ?? 0,
      "longitude": coords?.longitude ?? 0,
      "altitude": coords?.altitude ?? 0,
    ])
  }

  public func onLongPress(state: GestureState, origin: Point2D) {
    let coords = mapView.viewToGeoCoordinates(viewCoordinates: origin)
    onMapLongPressCallback?([
      "latitude": coords?.latitude ?? 0,
      "longitude": coords?.longitude ?? 0,
      "altitude": coords?.altitude ?? 0,
    ])
  }

  private func loadCameraView() {
    let scheme = convertMapScheme(scheme: mapScheme)
    self.mapView.mapScene.loadScene(mapScheme: scheme) { mapError in
      guard mapError == nil else {
        return
      }
      self.updateCameraView()
    }
  }

  private func updateCameraView() {
    if geoBox.count > 0 {
      guard let swDict = geoBox["southWestCorner"] as? NSDictionary,
            let neDict = geoBox["northEastCorner"] as? NSDictionary,
            let sw = toCoordinates(raw: swDict),
            let ne = toCoordinates(raw: neDict)
      else { return }
      self.mapView.camera.lookAt(
        area: GeoBox(southWestCorner: sw, northEastCorner: ne),
        orientation: GeoOrientationUpdate(bearing: bearing, tilt: tilt)
      )
    } else if geoCoordinates.count > 0 {
      guard let target = toCoordinates(raw: geoCoordinates) else { return }
      self.mapView.camera.lookAt(
        point: target,
        orientation: GeoOrientationUpdate(bearing: bearing, tilt: tilt),
        zoom: MapMeasure(kind: convertZoomKind(kind: zoomKind), value: zoomValue)
      )
    }
  }
}

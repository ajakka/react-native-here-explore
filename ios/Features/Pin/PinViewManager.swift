import heresdk

@objc(PinViewManager)
class PinViewManager: RCTViewManager {
  
  @objc override func view() -> (PinView) {
    return PinView()
  }
  
  @objc override static func requiresMainQueueSetup() -> Bool {
    return false
  }
  
  @objc override static func moduleName() -> String! {
    return "PinView"
  }
}

class PinView: ItemView {
  var currentPinView: MapView.ViewPin?
  var pinUIView: UIView? = nil
  
  @objc var geoCoordinates: NSDictionary = [:]
  { didSet {self.updateFeature()} }
  
  @objc var anchor: NSDictionary = [:]
  { didSet {self.updateFeature()} }
  
  public override func insertReactSubview(_ subview: UIView!, at atIndex: Int) {
    pinUIView = subview
  }
  
  override func updateFeature() {
    guard let pinUIView, let coordinates = toCoordinates(raw: geoCoordinates) else {
      return
    }
    if let oldMapPin = self.currentPinView {
      self.parentMap?.unpinView(oldMapPin.view)
    }
    
    let anchorPoint = Anchor2D(
      horizontal: self.anchor["horizontal"] as? CGFloat ?? 0.5,
      vertical: self.anchor["vertical"] as? CGFloat ?? 0.5
    )
    pinUIView.layer.anchorPoint = CGPoint(x: anchorPoint.horizontal, y: anchorPoint.vertical)
    self.currentPinView = self.parentMap?.pinView(pinUIView, to: coordinates)
  }
  
  override func removeFeature() {
    if let oldMapPin = currentPinView {
      self.parentMap?.unpinView(oldMapPin.view)
    }
    currentPinView = nil
    pinUIView = nil
    unassignMap()
  }
}

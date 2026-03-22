import Foundation
import heresdk

@objc
public protocol ItemFeatureEvents {
  func updateFeature()
  func removeFeature()
}

@objc(ItemView)
public class ItemView: UIView {

  weak public var parentMap: MapView?

  public func assignToMap(map: MapView) {
    parentMap = map
  }
  
  public func unassignMap() {
    parentMap = nil
  }
}

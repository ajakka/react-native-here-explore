import heresdk

protocol ItemFeatureEvents {
    func updateFeature()
    func removeFeature()
}

class ItemView: UIView, ItemFeatureEvents {
    
    weak var parentMap: MapView?
    
    func updateFeature() {
        fatalError("updateFeature() must be overridden in subclasses")
    }
    
    func removeFeature() {
        fatalError("removeFeature() must be overridden in subclasses")
    }
    
    func assignToMap(map: MapView) {
        parentMap = map
    }
    
    func unassignMap() {
        parentMap = nil
    }
}
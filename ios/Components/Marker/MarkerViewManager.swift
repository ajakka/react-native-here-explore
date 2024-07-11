import heresdk
import React

@objc(MarkerViewManager)
class MarkerViewManager: RCTViewManager {
    
    @objc override func view() -> (MarkerView) {
        return MarkerView()
    }
    
    @objc override static func requiresMainQueueSetup() -> Bool {
        return false
    }
    
    @objc override static func moduleName() -> String! {
        return "MarkerView"
    }
}

class MarkerView : ItemView {
    
    var currentMapMarker: MapMarker?
    
    @objc var geoCoordinates: NSDictionary = [:]
    { didSet {self.updateFeature()} }
    
    @objc var image: NSDictionary = [:]
    { didSet {self.updateFeature()} }
    
    @objc var size: NSDictionary = [:]
    { didSet {self.updateFeature()} }
    
    @objc var anchor: NSDictionary = [:]
    { didSet {self.updateFeature()} }
    
    override func updateFeature() {
        guard let urlString = image["uri"] as? String,
              let url = URL(string: urlString)
        else {
            print("Invalid or missing URL for the image")
            return
        }
        
        URLSession.shared.dataTask(with: url) { [weak self] data, response, error in
            guard 
                let self = self,
                    let data = data, error == nil,
                // TODO: use data directly on MapImage
                    var downloadedImage = UIImage(data: data)
            else {
                print("Error downloading image: \(String(describing: error))")
                return
            }
            
            if let width = self.size["width"] as? CGFloat, let height = self.size["height"] as? CGFloat {
                let targetSize = CGSize(width: width, height: height)
                if let resizedImage = self.resizeImage(downloadedImage, targetSize: targetSize) {
                    downloadedImage = resizedImage
                }
            }
            
            DispatchQueue.main.async {
                
                // Assuming MapImage can be initialized with a UIImage
                if let uiImage = try? MapImage(from: downloadedImage),
                   let coordinates = toCoordinates(raw: self.geoCoordinates) {
                    let newMapMarker = MapMarker(at: coordinates, image: uiImage)
                    
                    if let oldMapMarker = self.currentMapMarker {
                        self.parentMap?.mapScene.removeMapMarker(oldMapMarker)
                    }
                    
                    self.parentMap?.mapScene.addMapMarker(newMapMarker)
                    self.currentMapMarker = newMapMarker
                }
            }
        }.resume()
    }
    
    override func removeFeature() {
        if let oldMapMarker = currentMapMarker {
            parentMap?.mapScene.removeMapMarker(oldMapMarker)
        }
        currentMapMarker = nil
        unassignMap()
    }
    
    func resizeImage(_ image: UIImage, targetSize: CGSize) -> UIImage? {
        let contextSize: CGSize = image.size
        
        let widthRatio = targetSize.width / contextSize.width
        let heightRatio = targetSize.height / contextSize.height
        
        var newSize: CGSize
        if widthRatio > heightRatio {
            newSize = CGSize(width: contextSize.width * heightRatio, height: contextSize.height * heightRatio)
        } else {
            newSize = CGSize(width: contextSize.width * widthRatio, height: contextSize.height * widthRatio)
        }
        
        let rect = CGRect(origin: .zero, size: newSize)
        
        UIGraphicsBeginImageContextWithOptions(newSize, false, image.scale)
        image.draw(in: rect)
        let resizedImage = UIGraphicsGetImageFromCurrentImageContext()
        UIGraphicsEndImageContext()
        
        return resizedImage
    }
}

import Foundation

import heresdk

@objcMembers public class MarkerViewImpl: ItemView, ItemFeatureEvents {

  var currentMapMarker: MapMarker?

  public var geoCoordinates: NSDictionary = [:] {
    didSet { updateFeature() }
  }

  public var image: NSDictionary = [:] {
    didSet { updateFeature() }
  }

  public var size: NSDictionary = [:] {
    didSet { updateFeature() }
  }

  public var anchor: NSDictionary = [:] {
    didSet { updateFeature() }
  }

  public func updateFeature() {
    guard let urlString = image["uri"] as? String,
          let url = URL(string: urlString)
    else {
      return
    }

    URLSession.shared.dataTask(with: url) { [weak self] data, response, error in
      guard let self = self,
            let data = data, error == nil,
            var downloadedImage = UIImage(data: data)
      else {
        return
      }

      if let width = self.size["width"] as? CGFloat, let height = self.size["height"] as? CGFloat {
        let targetSize = CGSize(width: width, height: height)
        if let resizedImage = self.resizeImage(downloadedImage, targetSize: targetSize) {
          downloadedImage = resizedImage
        }
      }

      DispatchQueue.main.async {
        if let uiImage = try? MapImage(from: downloadedImage),
           let coordinates = toCoordinates(raw: self.geoCoordinates) {
          let newMapMarker = MapMarker(
            at: coordinates,
            image: uiImage,
            anchor: Anchor2D(
              horizontal: self.anchor["horizontal"] as? CGFloat ?? 0.5,
              vertical: self.anchor["vertical"] as? CGFloat ?? 0.5
            )
          )
          if let oldMapMarker = self.currentMapMarker {
            self.parentMap?.mapScene.removeMapMarker(oldMapMarker)
          }

          self.parentMap?.mapScene.addMapMarker(newMapMarker)
          self.currentMapMarker = newMapMarker
        }
      }
    }.resume()
  }

  public func removeFeature() {
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

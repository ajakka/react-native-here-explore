import Foundation
import heresdk

@objc class HERESDKManager: NSObject {
  
  @objc static let shared = HERESDKManager()
  
  private override init() {
    // Private initialization to ensure singleton instance
    super.init()
  }
  
  @objc func initializeHERESDK() {
    // TODO: YOUR_ACCESS_KEY_ID
    let accessKeyID = "YOUR_ACCESS_KEY_ID"
    
    // TODO: YOUR_ACCESS_KEY_SECRET
    let accessKeySecret = "YOUR_ACCESS_KEY_SECRET"
    
    let options = SDKOptions(accessKeyId: accessKeyID, accessKeySecret: accessKeySecret)
    
    print("SDKOptions created successfully")
    do {
      try SDKNativeEngine.makeSharedInstance(options: options)
      print("SDKOptions engine started")
    } catch let error {
      fatalError("Failed to initialize the HERE SDK. Cause: \(error)")
    }
  }
  
  @objc func disposeHERESDK() {
    SDKNativeEngine.sharedInstance = nil
    MapView.deinitialize()
  }
}


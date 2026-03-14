import Foundation

import heresdk

@objcMembers public class HEREConfigImpl: NSObject {
  
  public func initializeHereSDK(accessKeyID: String, accessKeySecret: String) -> String {
    
    let authenticationMode = AuthenticationMode.withKeySecret(
      accessKeyId: accessKeyID,
      accessKeySecret: accessKeySecret
    )
    let options = SDKOptions(authenticationMode: authenticationMode)
    do {
      try SDKNativeEngine.makeSharedInstance(options: options)
      return "started"
    } catch {
      return "errored"
    }
  }
}

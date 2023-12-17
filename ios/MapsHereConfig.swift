import heresdk

@objc(MapsHereConfig)
class MapsHereConfig: NSObject {
    
    @objc(initializeHereSDK:withAccessKeySecret:)
    func initializeHereSDK(accessKeyID: String, accessKeySecret: String) -> String {
            let options = SDKOptions(
                accessKeyId: accessKeyID,
                accessKeySecret: accessKeySecret)
            
            do {
                try SDKNativeEngine.makeSharedInstance(options: options)
                return "SDKNativeEngine started"
//                resolve("Here SDK initialized")
            } catch _ {
                return "SDKNativeEngine errored"
//                reject("", "", error)
            }
        }
}


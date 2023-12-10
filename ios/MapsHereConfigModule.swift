import heresdk

@objc(MapsHereConfigModule)
class MapsHereConfigModule: NSObject {
    
    @objc(initializeHereSDK:withAccessKeySecret:withResolver:withRejecter:)
    func initializeHereSDK(
        accessKeyID: String,
        accessKeySecret: String,
        resolve: RCTPromiseResolveBlock,
        reject: RCTPromiseRejectBlock) -> Void {
            
            let options = SDKOptions(
                accessKeyId: accessKeyID,
                accessKeySecret: accessKeySecret)
            
            do {
                try SDKNativeEngine.makeSharedInstance(options: options)
                print("SDKOptions engine started")
                resolve("Here SDK initialized")
            } catch let error {
                reject(error)
            }
        }
}


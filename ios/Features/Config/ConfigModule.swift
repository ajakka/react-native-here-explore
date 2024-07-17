import heresdk

@objc(ConfigModule)
class ConfigModule: NSObject {
    
    @objc(initializeHereSDK:withAccessKeySecret:)
    func initializeHereSDK(accessKeyID: String, accessKeySecret: String) -> String {
        let options = SDKOptions(
            accessKeyId: accessKeyID,
            accessKeySecret: accessKeySecret)
        do {
            try SDKNativeEngine.makeSharedInstance(options: options)
            return "SDKNativeEngine started"
        } catch _ {
            return "SDKNativeEngine errored"
        }
    }
}

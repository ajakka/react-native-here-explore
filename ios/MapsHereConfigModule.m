#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(MapsHereConfigModule, NSObject)

RCT_EXTERN_METHOD(initializeHereSDK:(NSString *)accessKeyID
                  withAccessKeySecret:(NSString *)accessKeySecret
                  withResolver:(RCTPromiseResolveBlock)resolve
                  withRejecter:(RCTPromiseRejectBlock)reject)

+ (BOOL)requiresMainQueueSetup
{
  return NO;
}

@end

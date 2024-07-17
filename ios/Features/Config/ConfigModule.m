#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(ConfigModule, NSObject)

RCT_EXTERN__BLOCKING_SYNCHRONOUS_METHOD(initializeHereSDK:(NSString *)accessKeyID
                                        withAccessKeySecret:(NSString *)accessKeySecret)

+ (BOOL)requiresMainQueueSetup
{
  return NO;
}

@end

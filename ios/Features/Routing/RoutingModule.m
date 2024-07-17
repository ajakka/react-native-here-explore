#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(RoutingModule, NSObject)


RCT_EXTERN_METHOD(
    calculateRoute: (NSArray *)waypoints
    withRouteOption: (NSString *)routeOption
    withResolver: (RCTPromiseResolveBlock)resolve
    withRejecter: (RCTPromiseRejectBlock)reject
)

RCT_EXTERN_METHOD(
    cancel: (RCTPromiseResolveBlock)resolve
    withRejecter: (RCTPromiseRejectBlock)reject
)


+ (BOOL)requiresMainQueueSetup
{
  return NO;
}

@end


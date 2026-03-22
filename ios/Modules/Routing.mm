#import <HereExploreSpec/HereExploreSpec.h>

#if __has_include("HereExplore/HereExplore-Swift.h")
#import "HereExplore/HereExplore-Swift.h"
#else
#import "HereExplore-Swift.h"
#endif

using namespace facebook::react;

@interface Routing : NSObject <NativeRoutingSpec>
@end

@implementation Routing {
  RoutingImpl *_impl;
}

RCT_EXPORT_MODULE()

- (instancetype)init {
  self = [super init];
  if (self) {
    _impl = [[RoutingImpl alloc] init];
  }
  return self;
}

- (void)calculateRoute:(nonnull NSArray *)waypoints
           routeOption:(nonnull NSString *)routeOption
               resolve:(nonnull RCTPromiseResolveBlock)resolve
                reject:(nonnull RCTPromiseRejectBlock)reject
{
  [_impl calculateRouteWithWaypoints:waypoints routeOption:routeOption completion:^(NSDictionary * _Nonnull result) {
    resolve(result);
  }];
}

- (void)cancel:(nonnull RCTPromiseResolveBlock)resolve
        reject:(nonnull RCTPromiseRejectBlock)reject
{
  [_impl cancelWithCompletion:^(BOOL success) {
    resolve(@(success));
  }];
}

- (std::shared_ptr<TurboModule>)getTurboModule:(const ObjCTurboModule::InitParams &)params {
  return std::make_shared<NativeRoutingSpecJSI>(params);
}

@end

#import <HereExploreSpec/HereExploreSpec.h>

#if __has_include("HereExplore/HereExplore-Swift.h")
#import "HereExplore/HereExplore-Swift.h"
#else
#import "HereExplore-Swift.h"
#endif

using namespace facebook::react;

@interface HEREConfig : NSObject <NativeHEREConfigSpec>
@end

@implementation HEREConfig {
  HEREConfigImpl *_impl;
}

RCT_EXPORT_MODULE()

- (instancetype)init {
  self = [super init];
  if (self) {
    _impl = [[HEREConfigImpl alloc] init];
  }
  return self;
}

- (NSString *)initializeHereSDK:(NSString *)accessKeyID
                accessKeySecret:(NSString *)accessKeySecret
{
  NSString *result = [_impl
                      initializeHereSDKWithAccessKeyID:accessKeyID
                      accessKeySecret:accessKeySecret];
  return result;
}

- (std::shared_ptr<TurboModule>)getTurboModule:(const ObjCTurboModule::InitParams &)params
{
  return std::make_shared<NativeHEREConfigSpecJSI>(params);
}

@end



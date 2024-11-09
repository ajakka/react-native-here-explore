#import <React/RCTViewManager.h>

@interface RCT_EXTERN_MODULE(PinViewManager, RCTViewManager)

RCT_EXPORT_VIEW_PROPERTY(geoCoordinates,    NSDictionary)
RCT_EXPORT_VIEW_PROPERTY(anchor,            NSDictionary)

@end

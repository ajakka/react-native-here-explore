#import <React/RCTViewManager.h>

@interface RCT_EXTERN_MODULE(MarkerViewManager, RCTViewManager)

RCT_EXPORT_VIEW_PROPERTY(geoCoordinates,    NSDictionary)
RCT_EXPORT_VIEW_PROPERTY(image,             NSDictionary)
RCT_EXPORT_VIEW_PROPERTY(size,              NSDictionary)
RCT_EXPORT_VIEW_PROPERTY(anchor,            NSDictionary)

@end

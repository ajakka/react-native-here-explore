#import <React/RCTViewManager.h>

@interface RCT_EXTERN_MODULE(MapsHereViewManager, RCTViewManager)

RCT_EXPORT_VIEW_PROPERTY(zoomKind, NSString)
RCT_EXPORT_VIEW_PROPERTY(zoomValue, double)
RCT_EXPORT_VIEW_PROPERTY(coordinates, NSDictionary)
RCT_EXPORT_VIEW_PROPERTY(mapScheme, NSString)

@end

#import <React/RCTViewManager.h>

@interface RCT_EXTERN_MODULE(MapsViewManager, RCTViewManager)

RCT_EXPORT_VIEW_PROPERTY(mapScheme, NSString)
RCT_EXPORT_VIEW_PROPERTY(watermarkStyle, NSString)
RCT_EXPORT_VIEW_PROPERTY(bearing, double)
RCT_EXPORT_VIEW_PROPERTY(tilt, double)
RCT_EXPORT_VIEW_PROPERTY(geoCoordinates, NSDictionary)
RCT_EXPORT_VIEW_PROPERTY(zoomKind, NSString)
RCT_EXPORT_VIEW_PROPERTY(zoomValue, double)
RCT_EXPORT_VIEW_PROPERTY(geoBox, NSDictionary)

@end
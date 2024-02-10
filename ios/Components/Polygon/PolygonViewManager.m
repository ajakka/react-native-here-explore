#import <React/RCTViewManager.h>

@interface RCT_EXTERN_MODULE(PolygonViewManager, RCTViewManager)

RCT_EXPORT_VIEW_PROPERTY(geoCoordinates,    NSArray)
RCT_EXPORT_VIEW_PROPERTY(geoCircle,         NSDictionary)
RCT_EXPORT_VIEW_PROPERTY(color,             double)
RCT_EXPORT_VIEW_PROPERTY(outlineColor,      double)
RCT_EXPORT_VIEW_PROPERTY(outlineWidth,      double)

@end

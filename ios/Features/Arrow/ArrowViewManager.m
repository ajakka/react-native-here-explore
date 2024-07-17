#import <React/RCTViewManager.h>

@interface RCT_EXTERN_MODULE(ArrowViewManager, RCTViewManager)

RCT_EXPORT_VIEW_PROPERTY(geoPolyline, NSArray)
RCT_EXPORT_VIEW_PROPERTY(lineColor, double)
RCT_EXPORT_VIEW_PROPERTY(lineWidth, double)

@end

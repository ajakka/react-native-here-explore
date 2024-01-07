#import <React/RCTViewManager.h>

@interface RCT_EXTERN_MODULE(PolylineViewManager, RCTViewManager)

RCT_EXPORT_VIEW_PROPERTY(coordinates, NSArray)
RCT_EXPORT_VIEW_PROPERTY(lineColor, double)
RCT_EXPORT_VIEW_PROPERTY(lineWidth, double)
RCT_EXPORT_VIEW_PROPERTY(lineWidthUnit, NSString)

@end

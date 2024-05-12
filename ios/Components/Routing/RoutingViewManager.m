#import <React/RCTViewManager.h>

@interface RCT_EXTERN_MODULE(RoutingViewManager, RCTViewManager)


RCT_EXPORT_VIEW_PROPERTY(lineType,      NSString)
RCT_EXPORT_VIEW_PROPERTY(lineWidth,     double)
RCT_EXPORT_VIEW_PROPERTY(lineColor,     double)
RCT_EXPORT_VIEW_PROPERTY(lineLength,    double)
RCT_EXPORT_VIEW_PROPERTY(gapColor,      double)
RCT_EXPORT_VIEW_PROPERTY(gapLength,     double)
RCT_EXPORT_VIEW_PROPERTY(outlineWidth,  double)
RCT_EXPORT_VIEW_PROPERTY(outlineColor,  double)
RCT_EXPORT_VIEW_PROPERTY(capShape,      NSString)

RCT_EXPORT_VIEW_PROPERTY(originCoordinates,    NSDictionary)
RCT_EXPORT_VIEW_PROPERTY(destinationCoordinates,    NSDictionary)
RCT_EXPORT_VIEW_PROPERTY(wayPoints,   NSArray)
RCT_EXPORT_VIEW_PROPERTY(onSendMessageRoutingDetails,   RCTDirectEventBlock)

@end

#import <React/RCTViewManager.h>

@interface RCT_EXTERN_MODULE(NavigationViewManager, RCTViewManager)

// Inheriting properties from MapsHereView
RCT_EXPORT_VIEW_PROPERTY(mapScheme, NSString)
RCT_EXPORT_VIEW_PROPERTY(watermarkStyle, NSString)
RCT_EXPORT_VIEW_PROPERTY(bearing, double)
RCT_EXPORT_VIEW_PROPERTY(tilt, double)
RCT_EXPORT_VIEW_PROPERTY(geoCoordinates, NSDictionary)
RCT_EXPORT_VIEW_PROPERTY(zoomKind, NSString)
RCT_EXPORT_VIEW_PROPERTY(zoomValue, double)
RCT_EXPORT_VIEW_PROPERTY(geoBox, NSDictionary)

// Navigation specific properties
RCT_EXPORT_VIEW_PROPERTY(isSimulated, BOOL)
RCT_EXPORT_VIEW_PROPERTY(isCameraTrackingEnabled, BOOL)
RCT_EXPORT_VIEW_PROPERTY(isVoiceGuidanceEnabled, BOOL)

// Events
RCT_EXPORT_VIEW_PROPERTY(onMapTap, RCTDirectEventBlock)
RCT_EXPORT_VIEW_PROPERTY(onMapLongPress, RCTDirectEventBlock)
RCT_EXPORT_VIEW_PROPERTY(onUserLocationNotFound, RCTDirectEventBlock)
RCT_EXPORT_VIEW_PROPERTY(onUserLocationResolved, RCTDirectEventBlock)

// Commands
RCT_EXTERN_METHOD(prefetchUserLocation:(nonnull NSNumber *)node)
RCT_EXTERN_METHOD(startNavigation:(nonnull NSNumber *)node route:(nonnull NSDictionary *)route)
RCT_EXTERN_METHOD(stopNavigation:(nonnull NSNumber *)node)

@end

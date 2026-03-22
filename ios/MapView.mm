#import <React/RCTViewComponentView.h>

#import <react/renderer/components/HereExploreSpec/ComponentDescriptors.h>
#import <react/renderer/components/HereExploreSpec/Props.h>

//#if __has_include("heresdk/heresdk-Swift.h")
//#import "heresdk/heresdk-Swift.h"
//#else
//#import "heresdk-Swift.h"
//#endif

#if __has_include("HereExplore/HereExplore-Swift.h")
#import "HereExplore/HereExplore-Swift.h"
#else
#import "HereExplore-Swift.h"
#endif

@interface MapView : RCTViewComponentView
@end

using namespace facebook::react;

@implementation MapView {
  MapViewImpl *_view;
}

+ (ComponentDescriptorProvider)componentDescriptorProvider {
  return concreteComponentDescriptorProvider<MapViewComponentDescriptor>();
}

- (instancetype)initWithFrame:(CGRect)frame {
  if (self = [super initWithFrame:frame]) {
    static const auto defaultProps = std::make_shared<const MapViewProps>();
    _props = defaultProps;
    
    _view = [[MapViewImpl alloc] initWithFrame:frame];
    
    __weak RCTViewComponentView *weakSelf = self;
    
    _view.onMapTapCallback = ^(NSDictionary *coords) {
      __strong RCTViewComponentView *strongSelf = weakSelf;
      if (!strongSelf || !strongSelf->_eventEmitter) return;
      MapViewEventEmitter::OnMapTap event;
      event.latitude = [coords[@"latitude"] doubleValue];
      event.longitude = [coords[@"longitude"] doubleValue];
      event.altitude = [coords[@"altitude"] doubleValue];
      std::static_pointer_cast<MapViewEventEmitter const>(strongSelf->_eventEmitter)->onMapTap(event);
    };
    
    _view.onMapLongPressCallback = ^(NSDictionary *coords) {
      __strong RCTViewComponentView *strongSelf = weakSelf;
      if (!strongSelf || !strongSelf->_eventEmitter) return;
      MapViewEventEmitter::OnMapLongPress event;
      event.latitude = [coords[@"latitude"] doubleValue];
      event.longitude = [coords[@"longitude"] doubleValue];
      event.altitude = [coords[@"altitude"] doubleValue];
      std::static_pointer_cast<MapViewEventEmitter const>(strongSelf->_eventEmitter)->onMapLongPress(event);
    };
    
    self.contentView = _view;
  }
  return self;
}

- (void)updateProps:(Props::Shared const &)props oldProps:(Props::Shared const &)oldProps {
  const auto &newProps = static_cast<MapViewProps const &>(*props);
  
  _view.mapScheme = [[NSString alloc] initWithUTF8String:newProps.mapScheme.c_str()];
  _view.watermarkStyle = [[NSString alloc] initWithUTF8String:newProps.watermarkStyle.c_str()];
  _view.bearing = newProps.bearing;
  _view.tilt = newProps.tilt;
  _view.zoomValue = newProps.zoomValue;
  _view.zoomKind = [[NSString alloc] initWithUTF8String:newProps.zoomKind.c_str()];
  
  const auto &gc = newProps.geoCoordinates;
  if (newProps.hasGeoCoordinates) {
    _view.geoCoordinates = @{
      @"latitude": @(gc.latitude),
      @"longitude": @(gc.longitude),
      @"altitude": @(gc.altitude)
    };
  } else {
    _view.geoCoordinates = [NSDictionary dictionary];
  }
  
  const auto &gb = newProps.geoBox;
  const auto &sw = gb.southWestCorner;
  const auto &ne = gb.northEastCorner;
  if (sw.latitude != 0 || sw.longitude != 0 || ne.latitude != 0 || ne.longitude != 0) {
    _view.geoBox = @{
      @"southWestCorner": @{@"latitude": @(sw.latitude), @"longitude": @(sw.longitude)},
      @"northEastCorner": @{@"latitude": @(ne.latitude), @"longitude": @(ne.longitude)}
    };
  } else {
    _view.geoBox = [NSDictionary dictionary];
  }
  
  [super updateProps:props oldProps:oldProps];
}

- (void)mountChildComponentView:(UIView<RCTComponentViewProtocol> *)childComponentView index:(NSInteger)index {
  UIView *content = childComponentView;
  if ([childComponentView isKindOfClass:[RCTViewComponentView class]]) {
    content = ((RCTViewComponentView *)childComponentView).contentView;
  }
  
  if ([content isKindOfClass:[ItemView class]]) {
    [_view addItemView:(ItemView *)content];
  }
}

- (void)unmountChildComponentView:(UIView<RCTComponentViewProtocol> *)childComponentView index:(NSInteger)index {
  UIView *content = childComponentView;
  if ([childComponentView isKindOfClass:[RCTViewComponentView class]]) {
    content = ((RCTViewComponentView *)childComponentView).contentView;
  }
  
  if ([content isKindOfClass:[ItemView class]]) {
    [_view removeItemView:(ItemView *)content];
  }
}

@end

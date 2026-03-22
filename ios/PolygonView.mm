#import <React/RCTViewComponentView.h>

#import <react/renderer/components/HereExploreSpec/ComponentDescriptors.h>
#import <react/renderer/components/HereExploreSpec/Props.h>

#if __has_include("HereExplore/HereExplore-Swift.h")
#import "HereExplore/HereExplore-Swift.h"
#else
#import "HereExplore-Swift.h"
#endif

using namespace facebook::react;

@interface PolygonView : RCTViewComponentView
@end

@implementation PolygonView {
  PolygonViewImpl *_view;
}

+ (ComponentDescriptorProvider)componentDescriptorProvider {
  return concreteComponentDescriptorProvider<PolygonViewComponentDescriptor>();
}

- (instancetype)initWithFrame:(CGRect)frame {
  if (self = [super initWithFrame:frame]) {
    static const auto defaultProps = std::make_shared<const PolygonViewProps>();
    _props = defaultProps;
    _view = [[PolygonViewImpl alloc] initWithFrame:frame];
    self.contentView = _view;
  }
  return self;
}

- (void)updateProps:(Props::Shared const &)props oldProps:(Props::Shared const &)oldProps {
  const auto &newProps = static_cast<PolygonViewProps const &>(*props);

  // geoPolyline → maps to Swift's geoCoordinates property
  NSMutableArray *coords = [NSMutableArray arrayWithCapacity:newProps.geoPolyline.size()];
  for (const auto &c : newProps.geoPolyline) {
    [coords addObject:@{
      @"latitude": @(c.latitude),
      @"longitude": @(c.longitude),
      @"altitude": @(c.altitude)
    }];
  }
  _view.geoCoordinates = coords;

  // geoCircle
  if (newProps.geoCircle.radiusInMeters > 0) {
    _view.geoCircle = @{
      @"center": @{
        @"latitude": @(newProps.geoCircle.center.latitude),
        @"longitude": @(newProps.geoCircle.center.longitude)
      },
      @"radiusInMeters": @(newProps.geoCircle.radiusInMeters)
    };
  } else {
    _view.geoCircle = [NSDictionary dictionary];
  }

  _view.color = (double)newProps.color;
  _view.outlineColor = (double)newProps.outlineColor;
  _view.outlineWidth = newProps.outlineWidth;

  [super updateProps:props oldProps:oldProps];
}

@end

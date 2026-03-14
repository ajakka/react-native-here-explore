#import <React/RCTViewComponentView.h>

#import <react/renderer/components/HereExploreSpec/ComponentDescriptors.h>
#import <react/renderer/components/HereExploreSpec/Props.h>

#if __has_include("HereExplore/HereExplore-Swift.h")
#import "HereExplore/HereExplore-Swift.h"
#else
#import "HereExplore-Swift.h"
#endif

@interface ArrowView : RCTViewComponentView
@end

using namespace facebook::react;

@implementation ArrowView {
  ArrowViewImpl *_view;
}

+ (ComponentDescriptorProvider)componentDescriptorProvider {
  return concreteComponentDescriptorProvider<ArrowViewComponentDescriptor>();
}

- (instancetype)initWithFrame:(CGRect)frame {
  if (self = [super initWithFrame:frame]) {
    static const auto defaultProps = std::make_shared<const ArrowViewProps>();
    _props = defaultProps;
    _view = [[ArrowViewImpl alloc] initWithFrame:frame];
    self.contentView = _view;
  }
  return self;
}

- (void)updateProps:(Props::Shared const &)props oldProps:(Props::Shared const &)oldProps {
  const auto &newProps = static_cast<ArrowViewProps const &>(*props);
  
  NSMutableArray *polyline = [NSMutableArray arrayWithCapacity:newProps.geoPolyline.size()];
  for (const auto &coord : newProps.geoPolyline) {
    [polyline addObject:@{
      @"latitude": @(coord.latitude),
      @"longitude": @(coord.longitude),
      @"altitude": @(coord.altitude)
    }];
  }
  _view.geoPolyline = polyline;
  _view.lineColor = (double)newProps.lineColor;
  _view.lineWidth = newProps.lineWidth;
  
  [super updateProps:props oldProps:oldProps];
}

@end

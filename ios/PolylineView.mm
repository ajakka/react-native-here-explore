#import <React/RCTViewComponentView.h>

#import <react/renderer/components/HereExploreSpec/ComponentDescriptors.h>
#import <react/renderer/components/HereExploreSpec/Props.h>

#if __has_include("HereExplore/HereExplore-Swift.h")
#import "HereExplore/HereExplore-Swift.h"
#else
#import "HereExplore-Swift.h"
#endif

@interface PolylineView : RCTViewComponentView
@end

using namespace facebook::react;

@implementation PolylineView {
  PolylineViewImpl *_view;
}

+ (ComponentDescriptorProvider)componentDescriptorProvider {
  return concreteComponentDescriptorProvider<PolylineViewComponentDescriptor>();
}

- (instancetype)initWithFrame:(CGRect)frame {
  if (self = [super initWithFrame:frame]) {
    static const auto defaultProps = std::make_shared<const PolylineViewProps>();
    _props = defaultProps;
    _view = [[PolylineViewImpl alloc] initWithFrame:frame];
    self.contentView = _view;
  }
  return self;
}

- (void)updateProps:(Props::Shared const &)props oldProps:(Props::Shared const &)oldProps {
  const auto &newProps = static_cast<PolylineViewProps const &>(*props);
  NSMutableArray *polyline = [NSMutableArray arrayWithCapacity:newProps.geoPolyline.size()];
  
  for (const auto &coord : newProps.geoPolyline) {
    [polyline addObject:@{
      @"latitude": @(coord.latitude),
      @"longitude": @(coord.longitude),
      @"altitude": @(coord.altitude)
    }];
  }

  _view.geoPolyline = polyline;
  _view.lineWidth = newProps.lineWidth;
  _view.lineColor = (double)newProps.lineColor;
  _view.lineType = [[NSString alloc] initWithUTF8String:newProps.lineType.c_str()];
  _view.outlineWidth = newProps.outlineWidth;
  _view.outlineColor = (double)newProps.outlineColor;
  _view.capShape = [[NSString alloc] initWithUTF8String:newProps.capShape.c_str()];
  _view.lineLength = newProps.lineLength;
  _view.gapLength = newProps.gapLength;
  _view.gapColor = (double)newProps.gapColor;
  _view.lineWidthUnit = [[NSString alloc] initWithUTF8String:newProps.lineWidthUnit.c_str()];
  
  [super updateProps:props oldProps:oldProps];
}

@end

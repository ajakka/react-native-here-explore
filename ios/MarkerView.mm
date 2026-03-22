#import <React/RCTViewComponentView.h>

#import <react/renderer/components/HereExploreSpec/ComponentDescriptors.h>
#import <react/renderer/components/HereExploreSpec/Props.h>

#if __has_include("HereExplore/HereExplore-Swift.h")
#import "HereExplore/HereExplore-Swift.h"
#else
#import "HereExplore-Swift.h"
#endif

using namespace facebook::react;

@interface MarkerView : RCTViewComponentView
@end

@implementation MarkerView {
  MarkerViewImpl *_view;
}

+ (ComponentDescriptorProvider)componentDescriptorProvider {
  return concreteComponentDescriptorProvider<MarkerViewComponentDescriptor>();
}

- (instancetype)initWithFrame:(CGRect)frame {
  if (self = [super initWithFrame:frame]) {
    static const auto defaultProps = std::make_shared<const MarkerViewProps>();
    _props = defaultProps;
    _view = [[MarkerViewImpl alloc] initWithFrame:frame];
    self.contentView = _view;
  }
  return self;
}

- (void)updateProps:(Props::Shared const &)props oldProps:(Props::Shared const &)oldProps {
  const auto &newProps = static_cast<MarkerViewProps const &>(*props);

  const auto &gc = newProps.geoCoordinates;
  _view.geoCoordinates = @{
    @"latitude": @(gc.latitude),
    @"longitude": @(gc.longitude),
    @"altitude": @(gc.altitude)
  };

  _view.image = @{
    @"uri": [[NSString alloc] initWithUTF8String:newProps.image.uri.c_str()]
  };

  _view.size = @{
    @"width": @(newProps.size.width),
    @"height": @(newProps.size.height)
  };

  _view.anchor = @{
    @"horizontal": @(newProps.anchor.horizontal),
    @"vertical": @(newProps.anchor.vertical)
  };

  [super updateProps:props oldProps:oldProps];
}

@end

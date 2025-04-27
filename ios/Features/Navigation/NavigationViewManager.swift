import heresdk
import AVFoundation

@objc(NavigationViewManager)
class NavigationViewManager: RCTViewManager {
  
  @objc override func view() -> (NavigationView) {
    let navigationView = NavigationView()
    return navigationView
  }
  
  @objc override static func requiresMainQueueSetup() -> Bool {
    return false
  }
  
  @objc override static func moduleName() -> String! {
    return "NavigationView"
  }
  
  @objc func prefetchUserLocation(_ node: NSNumber) {
    DispatchQueue.main.async {
      let component = self.bridge.uiManager.view(
        forReactTag: node
      ) as! NavigationView
      component.prefetchUserLocation()
    }
  }
  
  @objc func startNavigation(_ node: NSNumber, route: NSDictionary) {
    DispatchQueue.main.async {
      let component = self.bridge.uiManager.view(
        forReactTag: node
      ) as! NavigationView
      component.startNavigation(route: route)
    }
  }
  
  @objc func stopNavigation(_ node: NSNumber) {
    DispatchQueue.main.async {
      let component = self.bridge.uiManager.view(
        forReactTag: node
      ) as! NavigationView
      component.stopNavigation()
    }
  }
}

class NavigationView: MapsHereView, DynamicRoutingDelegate, EventTextDelegate {
  
  private let positioningProvider: PositioningProvider
  private let positioningSimulator: PositioningSimulator
  
  private let visualNavigator: VisualNavigator
//  private let dynamicRoutingEngine: DynamicRoutingEngine
  private let routePrefetcher: RoutePrefetcher
  private let voiceAssistant: VoiceAssistant
  private var routeCalculator: RouteCalculator?
  
  @objc var isSimulated: Bool = false
  
  @objc var isCameraTrackingEnabled: Bool = true {
    didSet {
      if isCameraTrackingEnabled {
        visualNavigator.cameraBehavior = DynamicCameraBehavior()
      } else {
        visualNavigator.cameraBehavior = nil
      }
    }
  }
  
  @objc var isVoiceGuidanceEnabled: Bool = true {
    didSet {
      if isVoiceGuidanceEnabled {
        visualNavigator.eventTextDelegate = self
      }
      else {
        visualNavigator.eventTextDelegate = nil
      }
    }
  }
  
  @objc var onUserLocationNotFound: RCTDirectEventBlock?
  @objc var onUserLocationResolved: RCTDirectEventBlock?
  
  override init(frame: CGRect) {
    do {
      try visualNavigator = VisualNavigator()
    } catch let engineInstantiationError {
      fatalError("Failed to initialize VisualNavigator. Cause: \(engineInstantiationError)")
    }
    
    positioningProvider = PositioningProvider()
    positioningSimulator = PositioningSimulator()
    
    routePrefetcher = RoutePrefetcher(SDKNativeEngine.sharedInstance!)
    voiceAssistant = VoiceAssistant()
//    dynamicRoutingEngine = NavigationView.createDynamicRoutingEngine()
    
    super.init(frame: frame)
  }
  
  required init?(coder: NSCoder) {
    fatalError("init(coder:) has not been implemented")
  }
  
  override func layoutSubviews() {
    super.layoutSubviews()
    
    if routeCalculator == nil {
      routeCalculator = RouteCalculator()
      visualNavigator.cameraBehavior = DynamicCameraBehavior()
      visualNavigator.startRendering(mapView: mapView)
    }
  }
  
  override func removeFromSuperview() {
    stopNavigation()
    super.removeFromSuperview()
  }
  
  func prefetchUserLocation() {
    let location = positioningProvider.getLastKnownLocation()
    
    if let location = location {
      if let onUserLocationResolved = onUserLocationResolved {
        onUserLocationResolved([
          "latitude": location.coordinates.latitude,
          "longitude": location.coordinates.longitude,
          "altitude": location.coordinates.altitude ?? 0
        ])
      }
    } else {
      positioningProvider.startLocating(locationDelegate: { (location) in
        if let onUserLocationResolved = self.onUserLocationResolved {
          onUserLocationResolved([
            "latitude": location.coordinates.latitude,
            "longitude": location.coordinates.longitude,
            "altitude": location.coordinates.altitude ?? 0
          ])
        }
        
        self.positioningProvider.stopLocating()
      }, accuracy: .navigation)
      
      DispatchQueue.main.asyncAfter(deadline: .now() + 5) {
        if self.positioningProvider.getLastKnownLocation() == nil {
          if let onUserLocationNotFound = self.onUserLocationNotFound {
            onUserLocationNotFound(["message": "Could not determine user location"])
          }
        }
      }
    }
  }
  
  func startNavigation(route: NSDictionary) {
    guard let routeCalculator = routeCalculator,
          let geoPolylineArray = route["geoPolyline"] as? NSArray else {
      return
    }
    
    let waypoints = convertGeoPolylineToWaypoints(geoPolylineArray)
    if waypoints.isEmpty {
      if let onUserLocationNotFound = onUserLocationNotFound {
        onUserLocationNotFound(["message": "No waypoints found in route"])
      }
      return
    }
    
    routeCalculator.calculateRoute(waypoints: waypoints) { [weak self] (route) in
      guard let self = self, let route = route
      else {
        if let onUserLocationNotFound = self?.onUserLocationNotFound {
          onUserLocationNotFound(["message": "Failed to calculate route"])
        }
        return
      }
      
      let startGeoCoordinates = route.geometry.vertices[0]
      self.prefetchMapData(currentGeoCoordinates: startGeoCoordinates)
      
      self.visualNavigator.route = route
      
      if self.isSimulated {
        self.enableRoutePlayback(route: route)
      } else {
        self.enableDevicePositioning()
      }
      
//      self.startDynamicSearchForBetterRoutes(route)
    }
  }
  
  func stopNavigation() {
//    dynamicRoutingEngine.stop()
    routePrefetcher.stopPrefetchAroundRoute()
    visualNavigator.route = nil
    enableDevicePositioning()
  }
  
  private func prefetchMapData(currentGeoCoordinates: GeoCoordinates) {
    routePrefetcher.prefetchAroundLocationWithRadius(currentLocation: currentGeoCoordinates, radiusInMeters: 2000.0)
    routePrefetcher.prefetchAroundRouteOnIntervals(navigator: visualNavigator)
  }
  
  private func enableRoutePlayback(route: Route) {
    positioningProvider.stopLocating()
    positioningSimulator.startLocating(locationDelegate: visualNavigator, route: route)
  }
  
  private func enableDevicePositioning() {
    positioningSimulator.stopLocating()
    positioningProvider.startLocating(locationDelegate: visualNavigator, accuracy: .navigation)
  }
  
//  private func startDynamicSearchForBetterRoutes(_ route: Route) {
//    do {
//      try dynamicRoutingEngine.start(route: route, delegate: self)
//    } catch let instantiationError {
//      print("Start of DynamicRoutingEngine failed: \(instantiationError). Is the RouteHandle missing?")
//    }
//  }
  
  private static func createDynamicRoutingEngine() -> DynamicRoutingEngine {
    let minTimeDifferencePercentage = 0.1
    let minTimeDifferenceInSeconds: TimeInterval = 1
    
    let dynamicRoutingOptions = DynamicRoutingEngineOptions(
      minTimeDifferencePercentage: minTimeDifferencePercentage,
      minTimeDifference: minTimeDifferenceInSeconds
    )
    
    do {
      return try DynamicRoutingEngine(options: dynamicRoutingOptions)
    } catch let engineInstantiationError {
      fatalError("Failed to initialize DynamicRoutingEngine. Cause: \(engineInstantiationError)")
    }
  }
  
  private func convertGeoPolylineToWaypoints(_ polyline: NSArray) -> [Waypoint] {
    var waypoints = [Waypoint]()
    
    for point in polyline {
      if let pointDict = point as? NSDictionary,
         let latitude = pointDict["latitude"] as? Double,
         let longitude = pointDict["longitude"] as? Double {
        let geoCoordinates = GeoCoordinates(latitude: latitude, longitude: longitude)
        waypoints.append(Waypoint(coordinates: geoCoordinates))
      }
    }
    
    return waypoints
  }
  
  // MARK: - DynamicRoutingDelegate
  
  func onBetterRouteFound(newRoute: Route,
                          etaDifferenceInSeconds: Int32,
                          distanceDifferenceInMeters: Int32) {
    print("DynamicRoutingEngine: Calculated a new route.")
    print("DynamicRoutingEngine: etaDifferenceInSeconds: \(etaDifferenceInSeconds).")
    print("DynamicRoutingEngine: distanceDifferenceInMeters: \(distanceDifferenceInMeters).")
  }
  
  func onRoutingError(routingError: RoutingError) {
    print("Error while dynamically searching for a better route: \(routingError).")
  }
  
  // MARK: - EventTextDelegate
  
  func onEventTextUpdated(_ eventText: heresdk.EventText) {
    if isVoiceGuidanceEnabled {
      voiceAssistant.speak(message: eventText.text)
    }
  }
}

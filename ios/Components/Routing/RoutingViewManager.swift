import heresdk
import React

@objc(RoutingViewManager)
class RoutingViewManager: RCTViewManager {
    
    @objc override func view() -> (RoutingView) {
        return RoutingView()
        
    }
    
    @objc override static func requiresMainQueueSetup() -> Bool {
        return false
    }
    
    @objc override static func moduleName() -> String! {
        return "RoutingView"
    }    
}

class RoutingView : ItemView {
    
     var mapPolyline: MapPolyline?
     var mapPolylineList = [MapPolyline]()
     var routingEngine: RoutingEngine?
    
    
    @objc var originCoordinates: NSDictionary = [:]
    @objc var destinationCoordinates: NSDictionary = [:]
    @objc var wayPoints: NSArray = []
    @objc var lineType: String = "SOLID" // or "DASH"
    @objc var lineWidth: Double = 8.0
    @objc var lineColor: Double = 0
    @objc var lineLength: Double = 2.0
    @objc var gapColor: Double = 0
    @objc var gapLength: Double = 0
    @objc var outlineWidth: Double = 0
    @objc var outlineColor: Double = 0
    @objc var capShape: String = "ROUND"
    @objc var lineWidthUnit: String = "PIXELS"

    
    // Events
    @objc var onSendMessageRoutingDetails: RCTDirectEventBlock?

    override func updateFeature() {
    
        let geoCoordinates = convertToGeoCoordinatesList(raw: wayPoints)
                
        if (originCoordinates.count <= 1) { return }
        if (destinationCoordinates.count <= 1) { return }
        
        var representation: MapPolyline.Representation?
    
        let startGeoCoordinates = convertToGeoCoordinates(raw: originCoordinates)
        let destinationGeoCoordinates = convertToGeoCoordinates(raw: destinationCoordinates)
        // Check if both variables are not nil
        
        if startGeoCoordinates != nil && destinationGeoCoordinates != nil {
            // Proceed with using startGeoCoordinates and destinationGeoCoordinates
            // Example: someFunction(startGeoCoordinates!, destinationGeoCoordinates!)
        } else {
            // Handle the case where one or both conversions fail
            if startGeoCoordinates == nil {
                print("Error: Origin coordinates could not be converted.")
                return;
            }
            if destinationGeoCoordinates == nil {
                print("Error: Destination coordinates could not be converted.")
                return;
            }
        }
      
        let sizeUnite = convertRenderSizeUnit(scheme: lineWidthUnit)
        if (lineType == "SOLID") {
            representation = try? MapPolyline.SolidRepresentation(
                lineWidth: MapMeasureDependentRenderSize(sizeUnit: sizeUnite, size: lineWidth),
                color: RCTConvert.uiColor(lineColor),
                outlineWidth: MapMeasureDependentRenderSize(sizeUnit: sizeUnite, size: outlineWidth),
                outlineColor: RCTConvert.uiColor(outlineColor),
                capShape: convertLineCap(scheme: capShape))
        }
        else if (lineType == "DASH") {
            representation = try? MapPolyline.DashRepresentation(
                lineWidth: MapMeasureDependentRenderSize(sizeUnit: sizeUnite, size: lineWidth),
                dashLength: MapMeasureDependentRenderSize(sizeUnit: sizeUnite, size: lineLength),
                gapLength: MapMeasureDependentRenderSize(sizeUnit: sizeUnite, size: gapLength),
                dashColor: RCTConvert.uiColor(lineColor),
                gapColor: RCTConvert.uiColor(gapColor))
        }
        
//        if let oldMapPolyline = mapPolyline {
//            parentMap?.mapScene.removeMapPolyline(oldMapPolyline)
//        }
//        
        do {
            try routingEngine = RoutingEngine()
        } catch let engineInstantiationError {
            fatalError("Failed to initialize routing engine. Cause: \(engineInstantiationError)")
        }
        
        
        var carOptions = CarOptions()
        carOptions.routeOptions.enableTolls = true
             
        var waypoints: [Waypoint] = []
        for coordinate in geoCoordinates {
            let waypoint = Waypoint(coordinates: coordinate)
            waypoints.append(waypoint)
        }
                
        // Prepare the start and destination waypoints

        let startWaypoint = Waypoint(coordinates: startGeoCoordinates!)
        let destinationWaypoint = Waypoint(coordinates: destinationGeoCoordinates!)
        
        // Combine all waypoints for routing if there are additional waypoints; otherwise just use start and destination
        let routeWaypoints = waypoints.isEmpty ? [startWaypoint, destinationWaypoint] : [startWaypoint] + waypoints + [destinationWaypoint]

        
        routingEngine?.calculateRoute(with: routeWaypoints,
                                      carOptions: carOptions) { [self] (routingError, routes) in

                                        if let error = routingError {
                                            print("error in routing \(error)")
                                            return
                                        }
                                        // When routingError is nil, routes is guaranteed to contain at least one route.
                                        let route = routes!.first
                                        let routeGeoPolyline = route?.geometry
     
            do {
                // Assuming that 'geometry' or 'representation' can throw an error
                guard let routeGeoPolyline = routeGeoPolyline else {
                    throw NSError(domain: "MissingDataError", code: 1001, userInfo: [NSLocalizedDescriptionKey: "Route geo-polyline data is missing."])
                }

                guard let representation = representation else {
                    throw NSError(domain: "MissingDataError", code: 1002, userInfo: [NSLocalizedDescriptionKey: "Map polyline representation data is missing."])
                }

                let routeMapPolyline = MapPolyline(geometry: routeGeoPolyline, representation: representation)
                

                self.parentMap?.mapScene.addMapPolyline(routeMapPolyline)
                self.mapPolyline = routeMapPolyline
                   
           
             if let route = route {
                    animateToRoute(route: route)
                    showRouteDetails(route: route)
                } else {
                    throw NSError(domain: "MissingDataError", code: 1003, userInfo: [NSLocalizedDescriptionKey: "Route data is missing."])
                }
            } catch {
                // Handle the error here, perhaps by logging or displaying a message to the user.
                fatalError("Failed to render MapPolyline. Cause: \(error)")
            }
            }
        }

    func animateToRoute(route: Route){
        let bearing: Double = 0
        let tilt: Double = 0
        
        // Safely unwrap the parentMap optional
           guard let parentMap = parentMap else {
               return
           }
        
        
        // We want to show the route fitting in the map view with an additional padding of 50 pixels.
        let origin:Point2D = Point2D(x: 50.0, y: 50.0)
        let sizeInPixels:Size2D = Size2D(width: parentMap.viewportSize.width - 100, height: (parentMap.viewportSize.height) - 100)
        let mapViewport:Rectangle2D = Rectangle2D(origin: origin, size: sizeInPixels)

        // Animate to the route within a duration of 3 seconds.
        let update:MapCameraUpdate = MapCameraUpdateFactory.lookAt(area: route.boundingBox, orientation: GeoOrientationUpdate(GeoOrientation(bearing: bearing, tilt: tilt)), viewRectangle: mapViewport)
        let animation: MapCameraAnimation = MapCameraAnimationFactory.createAnimation(from: update, duration: TimeInterval(1), easing: Easing(EasingFunction.inCubic))
        parentMap.camera.startAnimation(animation)
    }
    
    private func showRouteDetails(route: Route) {
        // estimatedTravelTimeInSeconds includes traffic delay.
        let estimatedTravelTimeInSeconds = route.duration
        let estimatedTrafficDelayInSeconds = route.trafficDelay
        let lengthInMeters = route.lengthInMeters
        
        onSendMessageRoutingDetails?(["estimatedTravelTimeInSeconds": estimatedTravelTimeInSeconds,
                               "estimatedTrafficDelayInSeconds": estimatedTrafficDelayInSeconds,
                               "lengthInMeters": lengthInMeters])
    }

    private func formatTime(sec: Double) -> String {
        let hours: Double = sec / 3600
        let minutes: Double = (sec.truncatingRemainder(dividingBy: 3600)) / 60

        return "\(Int32(hours)):\(Int32(minutes))"
    }

    private func formatLength(meters: Int32) -> String {
        let kilometers: Int32 = meters / 1000
        let remainingMeters: Int32 = meters % 1000

        return "\(kilometers).\(remainingMeters) km"
    }
    
    override func removeFeature() {
        if let oldMapPolyline = mapPolyline {
            parentMap?.mapScene.removeMapPolyline(oldMapPolyline)
        }
        mapPolyline = nil
        unassignMap()
    }
}

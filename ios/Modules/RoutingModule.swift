import heresdk

@objc(RoutingModule)
class RoutingModule: NSObject {
    
    var taskHandle: TaskHandle?
    
    lazy var routingEngine: RoutingEngine = {
        do {
            return try RoutingEngine()
        } catch let engineInstantiationError {
            fatalError("Failed to initialize routing engine. Cause: \(engineInstantiationError)")
        }
    }()
    
    @objc(calculateRoute:withRouteOption:withResolver:withRejecter:)
    func calculateRoute(
        waypoints: NSArray,
        routeOption: String,
        resolve: @escaping RCTPromiseResolveBlock,
        reject: @escaping RCTPromiseRejectBlock
    ) {
        taskHandle = routingEngine.calculateRoute(
            with: toCoordinatesList(raw: waypoints).map { it in Waypoint(coordinates: it) },
            routeOption: routeOption
        ) { (routingError, routes) in
            let result = NSMutableDictionary()
            
            if let routingError = routingError {
                result["routingError"] = routingError.rawValue
                result["routes"] = []
                resolve(result)
            } else if let routes = routes {
                result["routes"] = routesToWritableArray(routes)
                resolve(result)
            } else {
                result["routingError"] = -1
                result["routes"] = []
                resolve(result)
            }
        }
    }
    
    
    @objc(cancel:withRejecter:)
    func cancel(
        resolve: @escaping RCTPromiseResolveBlock,
        reject: @escaping RCTPromiseRejectBlock
    ) {
        guard let gTaskHandle = taskHandle else {
            resolve(false)
            return
        }
        
        if gTaskHandle.isCancelled {
            resolve(false)
            return
        }
        
        resolve(gTaskHandle.cancel())
        taskHandle = nil
    }
}

extension RoutingEngine {
    func calculateRoute(
        with waypoints: [heresdk.Waypoint],
        routeOption: String,
        completion: @escaping heresdk.CalculateRouteCompletionHandler
    ) -> any TaskHandle {
        switch routeOption {
            case "CarOptions":
                return self.calculateRoute(with: waypoints, carOptions: CarOptions(), completion: completion)
            case "PedestrianOptions":
                return self.calculateRoute(with: waypoints, pedestrianOptions: PedestrianOptions(), completion: completion)
            case "TruckOptions":
                return self.calculateRoute(with: waypoints, truckOptions: TruckOptions(), completion: completion)
            case "ScooterOptions":
                return self.calculateRoute(with: waypoints, scooterOptions: ScooterOptions(), completion: completion)
            case "BicycleOptions":
                return self.calculateRoute(with: waypoints, bicycleOptions: BicycleOptions(), completion: completion)
            case "TaxiOptions":
                return self.calculateRoute(with: waypoints, taxiOptions: TaxiOptions(), completion: completion)
            case "EVCarOptions":
                return self.calculateRoute(with: waypoints, evCarOptions: EVCarOptions(), completion: completion)
            case "EVTruckOptions":
                return self.calculateRoute(with: waypoints, evTruckOptions: EVTruckOptions(), completion: completion)
            case "BusOptions":
                return self.calculateRoute(with: waypoints, busOptions: BusOptions(), completion: completion)
            case "PrivateBusOptions":
                return self.calculateRoute(with: waypoints, privateBusOptions: PrivateBusOptions(), completion: completion)
            default:
                return self.calculateRoute(with: waypoints, carOptions: CarOptions(), completion: completion)
        }
    }
}    

func routesToWritableArray(_ routes: [Route]) -> NSArray {
    let waRoutes = NSMutableArray()
    for route in routes {
        let wmRoute = NSMutableDictionary()
        
        let verticesArray = fromCoordinatesList(route.geometry.vertices)
        wmRoute["vertices"] = verticesArray
        wmRoute["durationInSeconds"] = route.duration
        wmRoute["trafficDelayInSeconds"] = route.trafficDelay
        wmRoute["lengthInMeters"] = route.lengthInMeters
        
        if let routeHandle = route.routeHandle?.handle {
            wmRoute["routeHandle"] = routeHandle
        }
        
        waRoutes.add(wmRoute)
    }
    return waRoutes
}


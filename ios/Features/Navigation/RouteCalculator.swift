import heresdk

class RouteCalculator {
    private let routingEngine: RoutingEngine
    
    init() {
        do {
            try routingEngine = RoutingEngine()
        } catch let engineInstantiationError {
            fatalError("Failed to initialize RoutingEngine. Cause: \(engineInstantiationError)")
        }
    }
    
    func calculateRoute(waypoints: [Waypoint], completion: @escaping (Route?) -> Void) {
        if waypoints.count < 2 {
            print("Error: Need at least two waypoints to calculate a route.")
            completion(nil)
            return
        }
        
        let carOptions = CarOptions()
        
        // Request a route with the HERE SDK's RoutingEngine.
      routingEngine.calculateRoute(with: waypoints, carOptions: carOptions) { (routingError, routes) in
            if let error = routingError {
                print("Failed to calculate a route: \(error)")
                completion(nil)
                return
            }
            
            // Get the first calculated route.
            let route = routes?.first
            completion(route)
        }
    }
} 

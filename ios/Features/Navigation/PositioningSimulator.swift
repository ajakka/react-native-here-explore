import heresdk

// A class to simulate location updates along a route.
class PositioningSimulator {
  
  private var locationSimulator: LocationSimulator?
  
  func startLocating(locationDelegate: LocationDelegate, route: Route) {
    if let locationSimulator = locationSimulator {
      locationSimulator.stop()
    }
    
    locationSimulator = createLocationSimulator(locationDelegate: locationDelegate, route: route)
    locationSimulator!.start()
  }
  
  func stopLocating() {
    if locationSimulator != nil {
      locationSimulator!.stop()
      locationSimulator = nil
    }
  }
  
  // Provides fake GPS signals based on the route geometry.
  private func createLocationSimulator(locationDelegate: LocationDelegate,
                                       route: Route) -> LocationSimulator {
    let notificationIntervalInSeconds: TimeInterval = 0.5
    let locationSimulatorOptions = LocationSimulatorOptions(speedFactor: 2,
                                                            notificationInterval: notificationIntervalInSeconds)
    let locationSimulator: LocationSimulator
    
    do {
      try locationSimulator = LocationSimulator(route: route,
                                                options: locationSimulatorOptions)
    } catch let instantiationError {
      fatalError("Failed to initialize LocationSimulator. Cause: \(instantiationError)")
    }
    
    locationSimulator.delegate = locationDelegate
    locationSimulator.start()
    
    return locationSimulator
  }
}

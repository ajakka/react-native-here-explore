import CoreLocation
import heresdk

// A reference implementation using HERE Positioning to get notified on location updates
// from various location sources available from a device and HERE services.
class PositioningProvider: NSObject, CLLocationManagerDelegate, LocationStatusDelegate {

    // We need to check if the device is authorized to use location capabilities like GPS sensors.
    private let locationManager = CLLocationManager()
    private let locationEngine: LocationEngine
    private var locationUpdateDelegate: ((Location) -> Void)?
    private var locationDelegate: LocationDelegate?
    private var accuracy = LocationAccuracy.bestAvailable
    private var isLocating = false

    override init() {
        do {
            try locationEngine = LocationEngine()
        } catch let engineInstantiationError {
            fatalError("Failed to initialize LocationEngine. Cause: \(engineInstantiationError)")
        }

        super.init()
        authorizeNativeLocationServices()
    }

    func getLastKnownLocation() -> Location? {
        return locationEngine.lastKnownLocation
    }

    private func authorizeNativeLocationServices() {
        locationManager.delegate = self
        locationManager.requestAlwaysAuthorization()
    }

    // Conforms to the CLLocationManagerDelegate protocol.
    // Handles the result of the native authorization request.
    func locationManager(_ manager: CLLocationManager,
                         didChangeAuthorization status: CLAuthorizationStatus) {
        switch status {
        case .restricted, .denied, .notDetermined:
            print("Native location services denied or disabled by user in device settings.")
            break
        case .authorizedWhenInUse, .authorizedAlways:
            if let locationDelegate = locationDelegate, isLocating {
                startLocating(locationDelegate: locationDelegate, accuracy: accuracy)
            } else if let locationUpdateDelegate = locationUpdateDelegate, isLocating {
                if let location = getLastKnownLocation() {
                    locationUpdateDelegate(location)
                }
            }
            print("Native location services authorized by user.")
            break
        default:
            print("Unknown location authorization status.")
            break
        }
    }

    // Start location updates with a delegate callback
    func startLocating(locationDelegate: @escaping (Location) -> Void, accuracy: LocationAccuracy) {
        if locationEngine.isStarted {
            return
        }

        isLocating = true
        locationUpdateDelegate = locationDelegate
        self.accuracy = accuracy

        // Create a temporary delegate to get the first location
        let tempDelegate = SimpleLocationDelegate { location in
            locationDelegate(location)
            self.stopLocating()
        }

        // Set delegates to get location updates
        locationEngine.addLocationDelegate(locationDelegate: tempDelegate)
        locationEngine.addLocationStatusDelegate(locationStatusDelegate: self)

        // Without native permissions granted by user, the LocationEngine cannot be started
        if locationEngine.start(locationAccuracy: accuracy) == .missingPermissions {
            authorizeNativeLocationServices()
        }
    }

    // Start location updates with a LocationDelegate
    func startLocating(locationDelegate: LocationDelegate, accuracy: LocationAccuracy) {
        if locationEngine.isStarted {
            return
        }

        isLocating = true
        self.locationDelegate = locationDelegate
        self.accuracy = accuracy

        // Set delegates to get location updates
        locationEngine.addLocationDelegate(locationDelegate: locationDelegate)
        locationEngine.addLocationStatusDelegate(locationStatusDelegate: self)

        // Without native permissions granted by user, the LocationEngine cannot be started
        if locationEngine.start(locationAccuracy: accuracy) == .missingPermissions {
            authorizeNativeLocationServices()
        }
    }

    // Does nothing when engine is already stopped.
    func stopLocating() {
        if !locationEngine.isStarted {
            return
        }

        // Remove delegates and stop location engine
        if let locationDelegate = locationDelegate {
            locationEngine.removeLocationDelegate(locationDelegate: locationDelegate)
        }
        locationEngine.removeLocationStatusDelegate(locationStatusDelegate: self)
        locationEngine.stop()
        isLocating = false
        locationUpdateDelegate = nil
        locationDelegate = nil
    }

    // Conforms to the LocationStatusDelegate protocol.
    func onStatusChanged(locationEngineStatus: LocationEngineStatus) {
        print("Location engine status changed: \(locationEngineStatus)")
    }

    // Conforms to the LocationStatusDelegate protocol.
    func onFeaturesNotAvailable(features: [LocationFeature]) {
        for feature in features {
            print("Location feature not available: \(feature)")
        }
    }
}

// A simple LocationDelegate implementation that calls a callback with the first received location
private class SimpleLocationDelegate: LocationDelegate {
    private let callback: (Location) -> Void
    private var hasReceivedLocation = false
    
    init(callback: @escaping (Location) -> Void) {
        self.callback = callback
    }
    
  func onLocationUpdated(_ location: Location) {
        if !hasReceivedLocation {
            hasReceivedLocation = true
            callback(location)
        }
    }
} 

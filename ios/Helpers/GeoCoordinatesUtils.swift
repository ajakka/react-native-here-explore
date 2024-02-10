import heresdk

func convertToGeoCoordinates(raw: NSDictionary) -> GeoCoordinates? {
    guard let latitude = raw["latitude"] as? Double,
          let longitude = raw["longitude"] as? Double else {
        return nil;
    }
    
    if let altitude = raw["altitude"] as? Double {
        return GeoCoordinates(latitude: latitude, longitude: longitude, altitude: altitude)
    } else {
        return GeoCoordinates(latitude: latitude, longitude: longitude)
    }
}

func convertToGeoCoordinatesList(raw: NSArray) -> [GeoCoordinates] {
    var geoCoordinates: [GeoCoordinates] = []
    
    for coordinate in raw {
        if let dict = coordinate as? NSDictionary,
           let geoCoord = convertToGeoCoordinates(raw: dict) {
            geoCoordinates.append(geoCoord)
        }
    }
    
    return geoCoordinates
}

func convertToGeoCircle(raw: NSDictionary) -> GeoCircle? {
    
    if let centerDict = raw["center"] as? NSDictionary,
       let center = convertToGeoCoordinates(raw: centerDict),
       let radiusInMeters = raw["radiusInMeters"] as? Double {
        return GeoCircle(
            center: center,
            radiusInMeters: radiusInMeters
        )
    }
    else {
        return nil
    }
}

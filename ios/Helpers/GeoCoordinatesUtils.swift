import heresdk

func toCoordinates(raw: NSDictionary) -> GeoCoordinates? {
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

func toCoordinatesList(raw: NSArray) -> [GeoCoordinates] {
    var geoCoordinates: [GeoCoordinates] = []
    for coordinate in raw {
        if let dict = coordinate as? NSDictionary,
           let geoCoord = toCoordinates(raw: dict) {
            geoCoordinates.append(geoCoord)
        }
    }
    return geoCoordinates
}

func fromCoordinates(_ coordinates: GeoCoordinates) -> [String: Any] {
    var map = [String: Any]()
    map["latitude"] = coordinates.latitude
    map["longitude"] = coordinates.longitude
    if let altitude = coordinates.altitude {
        map["altitude"] = altitude
    }
    return map
}

func fromCoordinatesList(_ coordinatesList: [GeoCoordinates]) -> [[String: Any]] {
    return coordinatesList.map { it in fromCoordinates(it)}
}

func toGeoCircle(raw: NSDictionary) -> GeoCircle? {
    if let centerDict = raw["center"] as? NSDictionary,
       let center = toCoordinates(raw: centerDict),
       let radiusInMeters = raw["radiusInMeters"] as? Double {
        return GeoCircle(center: center, radiusInMeters: radiusInMeters)
    }
    else {
        return nil
    }
}

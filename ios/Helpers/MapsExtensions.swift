import Foundation
import heresdk

func toCoordinates(raw: NSDictionary) -> GeoCoordinates? {
    guard let latitude = raw["latitude"] as? Double,
          let longitude = raw["longitude"] as? Double else {
        return nil
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
    var map: [String: Any] = [:]
    map["latitude"] = coordinates.latitude
    map["longitude"] = coordinates.longitude
    if let altitude = coordinates.altitude {
        map["altitude"] = altitude
    }
    return map
}

func fromCoordinatesList(_ coordinatesList: [GeoCoordinates]) -> [[String: Any]] {
    return coordinatesList.map { fromCoordinates($0) }
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

func convertZoomKind(kind: String) -> MapMeasure.Kind {
    switch kind {
    case "DISTANCE":
        return .distanceInMeters
    case "ZOOM_LEVEL":
        return .zoomLevel
    case "SCALE":
        return .scale
    default:
        return .zoomLevel
    }
}

func convertMapScheme(scheme: String) -> MapScheme {
    switch scheme {
    case "NORMAL_DAY":
        return .normalDay
    case "NORMAL_NIGHT":
        return .normalNight
    case "SATELLITE":
        return .satellite
    case "HYBRID_DAY":
        return .hybridDay
    case "HYBRID_NIGHT":
        return .hybridNight
    case "LITE_DAY":
        return .liteDay
    case "LITE_NIGHT":
        return .liteNight
    case "LITE_HYBRID_DAY":
        return .liteHybridDay
    case "LITE_HYBRID_NIGHT":
        return .liteHybridNight
    case "LOGISTICS_DAY":
        return .logisticsDay
    default:
        return .normalDay
    }
}

func convertRenderSizeUnit(scheme: String) -> RenderSize.Unit {
    switch scheme {
    case "PIXELS":
        return .pixels
    case "DENSITY_INDEPENDENT_PIXELS":
        return .densityIndependentPixels
    case "METERS":
        return .meters
    default:
        return .pixels
    }
}

func convertLineCap(scheme: String) -> LineCap {
    switch scheme {
    case "ROUND":
        return .round
    case "SQUARE":
        return .square
    case "BUTT":
        return .butt
    default:
        return .round
    }
}

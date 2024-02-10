import heresdk

func convertZoomKind(kind: String) -> MapMeasure.Kind {
    switch kind {
    case "DISTANCE":
        return .distance
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

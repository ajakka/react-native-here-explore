package com.hereexplore.features.map

import com.here.sdk.mapview.MapMeasure
import com.here.sdk.mapview.MapScheme

val mapSchemes = mapOf(
  "NORMAL_DAY" to MapScheme.NORMAL_DAY,
  "NORMAL_NIGHT" to MapScheme.NORMAL_NIGHT,
  "SATELLITE" to MapScheme.SATELLITE,
  "HYBRID_DAY" to MapScheme.HYBRID_DAY,
  "HYBRID_NIGHT" to MapScheme.HYBRID_NIGHT,
  "LITE_DAY" to MapScheme.LITE_DAY,
  "LITE_NIGHT" to MapScheme.LITE_NIGHT,
  "LITE_HYBRID_DAY" to MapScheme.LITE_HYBRID_DAY,
  "LITE_HYBRID_NIGHT" to MapScheme.LITE_HYBRID_NIGHT,
  "LOGISTICS_DAY" to MapScheme.LOGISTICS_DAY
)

val zoomKinds = mapOf(
  "DISTANCE" to MapMeasure.Kind.DISTANCE,
  "ZOOM_LEVEL" to MapMeasure.Kind.ZOOM_LEVEL,
  "SCALE" to MapMeasure.Kind.SCALE
)

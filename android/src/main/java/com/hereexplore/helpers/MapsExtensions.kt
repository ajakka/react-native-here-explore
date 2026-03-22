package com.hereexplore.helpers

import com.here.sdk.mapview.LineCap
import com.here.sdk.mapview.MapMeasure
import com.here.sdk.mapview.MapScheme
import com.here.sdk.mapview.RenderSize
import com.here.sdk.mapview.WatermarkStyle

fun safeMapScheme(value: String): MapScheme =
    enumValues<MapScheme>().find { it.name == value } ?: MapScheme.NORMAL_DAY

fun safeZoomKind(value: String): MapMeasure.Kind =
    enumValues<MapMeasure.Kind>().find { it.name == value } ?: MapMeasure.Kind.ZOOM_LEVEL

fun safeLineCap(value: String): LineCap =
    enumValues<LineCap>().find { it.name == value } ?: LineCap.ROUND

fun safeLineWidthUnit(value: String): RenderSize.Unit =
    enumValues<RenderSize.Unit>().find { it.name == value } ?: RenderSize.Unit.PIXELS

fun safeWatermarkStyle(value: String): WatermarkStyle? =
    enumValues<WatermarkStyle>().find { it.name == value }

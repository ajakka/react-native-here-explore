package com.hereexplore.helpers

import com.facebook.react.bridge.ReadableMap
import com.here.sdk.core.Color

class ColorParser {
  companion object {
    fun toHereColor(value: Double): Color {
      return Color.valueOf(value.toInt())
    }

    fun toHereColor(value: String): Color {
      return Color.valueOf(android.graphics.Color.parseColor(value))
    }

    fun toHereColor(value: ReadableMap?): Color {
      val r = (value?.getDouble("r") ?: 0.0).toFloat()
      val g = (value?.getDouble("g") ?: 0.0).toFloat()
      val b = (value?.getDouble("b") ?: 0.0).toFloat()
      val a = (value?.getDouble("a") ?: 0.0).toFloat()
      return Color.valueOf(r, g, b, a)
    }
  }
}

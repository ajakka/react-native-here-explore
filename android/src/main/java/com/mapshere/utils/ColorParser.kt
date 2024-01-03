package com.mapshere.utils

import com.here.sdk.core.Color

class ColorParser {
  companion object {
    fun toHereColor(value: String): Color {
      return Color.valueOf(android.graphics.Color.parseColor(value))
    }
  }
}

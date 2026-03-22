package com.hereexplore.helpers

import com.here.sdk.core.Color

class ColorParser {
  companion object {
    fun toHereColor(value: Int): Color {
      return Color.valueOf(value)
    }

    fun toHereColor(value: String): Color {
      return Color.valueOf(android.graphics.Color.parseColor(value))
    }
  }
}

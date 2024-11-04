package com.hereexplore.features.pin

import com.facebook.react.uimanager.ThemedReactContext
import com.facebook.react.uimanager.ViewGroupManager

class PinViewContentManager : ViewGroupManager<PinViewContent>() {
  companion object {
    const val NAME = "PinViewContent"
  }

  override fun getName() = NAME

  override fun createViewInstance(context: ThemedReactContext): PinViewContent {
    return PinViewContent(context)
  }
}

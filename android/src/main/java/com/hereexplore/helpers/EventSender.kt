package com.hereexplore.helpers

import android.content.Context
import com.facebook.react.bridge.WritableMap
import com.facebook.react.uimanager.ThemedReactContext
import com.facebook.react.uimanager.events.RCTEventEmitter

fun sendEvent(id: Int, context: Context, eventName: String, eventArgs: WritableMap) {
  val reactContext = context as? ThemedReactContext
  val jsModule = reactContext?.getJSModule(RCTEventEmitter::class.java)
  jsModule?.receiveEvent(id, eventName, eventArgs)
}

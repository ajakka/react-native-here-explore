package com.mapshere

import com.facebook.react.ReactPackage
import com.facebook.react.bridge.NativeModule
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.uimanager.ViewManager
import com.mapshere.components.MapsHereViewManager
import com.mapshere.modules.MapsHereConfigModule

class MapsHerePackage : ReactPackage {

  override fun createViewManagers(reactContext: ReactApplicationContext): List<ViewManager<*, *>> {
    val viewManagers: MutableList<ViewManager<*, *>> = ArrayList()
    viewManagers.add(MapsHereViewManager())
    return viewManagers
  }

  override fun createNativeModules(reactContext: ReactApplicationContext): MutableList<NativeModule> {
    val modules: MutableList<NativeModule> = ArrayList()
    modules.add(MapsHereConfigModule(reactContext))
    return modules
  }
}

package com.mapshere

import com.facebook.react.ReactPackage
import com.facebook.react.bridge.NativeModule
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.uimanager.ViewManager
import com.mapshere.components.MapsHereViewManager
import com.mapshere.components.arrow.ArrowViewManager
import com.mapshere.components.marker.MarkerViewManager
import com.mapshere.components.polygon.PolygonViewManager
import com.mapshere.components.polyline.PolylineViewManager
import com.mapshere.modules.MapsHereConfigModule

class MapsHerePackage : ReactPackage {

  override fun createViewManagers(reactContext: ReactApplicationContext): List<ViewManager<*, *>> {
    val viewManagers: MutableList<ViewManager<*, *>> = ArrayList()
    viewManagers.add(MapsHereViewManager())
    viewManagers.add(ArrowViewManager())
    viewManagers.add(PolygonViewManager())
    viewManagers.add(PolylineViewManager())
    viewManagers.add(MarkerViewManager())

    return viewManagers
  }

  override fun createNativeModules(reactContext: ReactApplicationContext): MutableList<NativeModule> {
    val modules: MutableList<NativeModule> = ArrayList()
    modules.add(MapsHereConfigModule(reactContext))
    return modules
  }
}

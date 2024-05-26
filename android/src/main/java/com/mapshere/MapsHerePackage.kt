package com.mapshere

import android.view.ViewGroup
import com.facebook.react.ReactPackage
import com.facebook.react.bridge.NativeModule
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.uimanager.ViewGroupManager
import com.facebook.react.uimanager.ViewManager
import com.mapshere.components.MapsHereViewManager
import com.mapshere.components.arrow.ArrowViewManager
import com.mapshere.components.marker.MarkerViewManager
import com.mapshere.components.polygon.PolygonViewManager
import com.mapshere.components.polyline.PolylineViewManager
import com.mapshere.modules.MapsHereConfigModule
import com.mapshere.modules.routing.RoutingModule

class MapsHerePackage : ReactPackage {

  override fun createViewManagers(reactContext: ReactApplicationContext): ArrayList<ViewGroupManager<out ViewGroup>> {
    return arrayListOf(
      MapsHereViewManager(),
      ArrowViewManager(),
      PolygonViewManager(),
      PolylineViewManager(),
      MarkerViewManager(),
    )
  }

  override fun createNativeModules(reactContext: ReactApplicationContext): MutableList<NativeModule> {
    return arrayListOf(
      RoutingModule(reactContext),
      MapsHereConfigModule(reactContext)
    )
  }
}

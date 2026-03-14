package com.hereexplore

import com.facebook.react.BaseReactPackage
import com.facebook.react.bridge.NativeModule
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.module.model.ReactModuleInfo
import com.facebook.react.module.model.ReactModuleInfoProvider
import com.facebook.react.uimanager.ViewManager

class HereExplorePackage : BaseReactPackage() {

  override fun getModule(name: String, reactContext: ReactApplicationContext): NativeModule? {
    return when (name) {
      ConfigModule.NAME -> ConfigModule(reactContext)
      RoutingModule.NAME -> RoutingModule(reactContext)
      else -> null
    }
  }

  override fun getReactModuleInfoProvider() = ReactModuleInfoProvider {
    mapOf(
      ConfigModule.NAME to ReactModuleInfo(
        name = ConfigModule.NAME,
        className = ConfigModule.NAME,
        canOverrideExistingModule = false,
        needsEagerInit = false,
        isCxxModule = false,
        isTurboModule = true
      ),
      RoutingModule.NAME to ReactModuleInfo(
        name = RoutingModule.NAME,
        className = RoutingModule.NAME,
        canOverrideExistingModule = false,
        needsEagerInit = false,
        isCxxModule = false,
        isTurboModule = true
      )
    )
  }

  override fun createViewManagers(reactContext: ReactApplicationContext): List<ViewManager<*, *>> {
    return listOf(
      MapsViewManager(),
      ArrowViewManager(),
      PolygonViewManager(),
      PolylineViewManager(),
      MarkerViewManager()
    )
  }
}

package com.hereexplore

import com.facebook.react.BaseReactPackage
import com.facebook.react.bridge.NativeModule
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.module.model.ReactModuleInfo
import com.facebook.react.module.model.ReactModuleInfoProvider
import com.facebook.react.uimanager.ViewManager
import com.hereexplore.modules.HEREConfig
import com.hereexplore.modules.Routing

class HereExplorePackage : BaseReactPackage() {

  override fun getModule(name: String, reactContext: ReactApplicationContext): NativeModule? {
    return when (name) {
      HEREConfig.NAME -> HEREConfig(reactContext)
      Routing.NAME -> Routing(reactContext)
      else -> null
    }
  }

  override fun getReactModuleInfoProvider() = ReactModuleInfoProvider {
    mapOf(
      HEREConfig.NAME to ReactModuleInfo(
        name = HEREConfig.NAME,
        className = HEREConfig.NAME,
        canOverrideExistingModule = false,
        needsEagerInit = false,
        isCxxModule = false,
        isTurboModule = true
      ),
      Routing.NAME to ReactModuleInfo(
        name = Routing.NAME,
        className = Routing.NAME,
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

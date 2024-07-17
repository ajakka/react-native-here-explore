package com.hereexplore.features.item

import android.content.Context
import com.facebook.react.views.view.ReactViewGroup
import com.hereexplore.features.map.MapsView

abstract class ItemView(context: Context?) : ReactViewGroup(context) {

  protected var parentMap: MapsView? = null

  abstract fun updateFeature()

  abstract fun removeFeature()

  fun assignToMap(map: MapsView) {
    parentMap = map
  }

  fun unassignMap() {
    parentMap = null
  }
}

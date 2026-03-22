package com.hereexplore

import android.content.Context
import com.facebook.react.views.view.ReactViewGroup

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

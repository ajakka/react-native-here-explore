package com.mapshere.components.item

import android.content.Context
import com.facebook.react.views.view.ReactViewGroup
import com.mapshere.components.MapsHereView

abstract class ItemView(context: Context?) : ReactViewGroup(context) {

  protected var parentMap: MapsHereView? = null

  abstract fun updateFeature()

  abstract fun removeFeature()

  fun assignToMap(map: MapsHereView) {
    parentMap = map
  }

  fun unassignMap() {
    parentMap = null
  }
}

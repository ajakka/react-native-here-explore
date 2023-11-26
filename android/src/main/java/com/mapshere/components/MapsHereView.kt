package com.mapshere.components

import android.content.Context
import android.util.AttributeSet
import com.here.sdk.mapview.MapView

class MapsHereView : MapView {
  constructor(context: Context?) : super(context)

  constructor(context: Context?, attrs: AttributeSet?) : super(context, attrs)

  constructor(
    context: Context?,
    attrs: AttributeSet?,
    defStyleAttr: Int
  ) : super(context, attrs, defStyleAttr)
}

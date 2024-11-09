package com.hereexplore.features.pin

import android.content.Context
import com.facebook.react.views.view.ReactViewGroup

class PinViewContent (context: Context) : ReactViewGroup(context) {
  /*
  * Fixes error "A catalyst view must have an explicit width and height given to it. This should normally happen as part of the standard catalyst UI framework"
  */
  override fun onMeasure(widthMeasureSpec: Int, heightMeasureSpec: Int) {
    // force the view to have same dimensions as fist child.
    // only one child is allowed
    val child = getChildAt(0);
    val cw = child?.measuredWidth ?: 0
    val ch = child?.measuredHeight ?: 0
    setMeasuredDimension(cw, ch)
  }
}

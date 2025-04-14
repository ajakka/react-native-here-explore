package com.hereexplore.helpers

import android.Manifest
import android.app.Activity
import android.content.pm.PackageManager
import android.os.Build
import androidx.core.app.ActivityCompat
import androidx.core.content.ContextCompat


/**
 * Convenience class to request the Android permissions as defined by manifest.
 */
class PermissionsRequestor(private val activity: Activity) {
  private var resultListener: ResultListener? = null

  interface ResultListener {
    fun permissionsGranted()
    fun permissionsDenied()
  }

  fun request(resultListener: ResultListener) {
    this.resultListener = resultListener

    val missingPermissions = permissionsToRequest
    if (missingPermissions.size == 0) {
      resultListener.permissionsGranted()
    } else {
      ActivityCompat.requestPermissions(activity, missingPermissions, PERMISSIONS_REQUEST_CODE)
    }
  }

  private val permissionsToRequest: Array<String>
    get() {
      val permissionList = ArrayList<String>()
      try {
        val packageName = activity.packageName
        val packageInfo = if (Build.VERSION.SDK_INT >= 33) {
          val flags = PackageManager.PackageInfoFlags.of(PackageManager.GET_PERMISSIONS.toLong())
          activity.packageManager.getPackageInfo(packageName, flags)
        } else {
          activity.packageManager.getPackageInfo(
            packageName,
            PackageManager.GET_PERMISSIONS
          )
        }

        if (packageInfo.requestedPermissions != null) {
          for (permission in packageInfo.requestedPermissions!!) {
            if (ContextCompat.checkSelfPermission(activity, permission) != PackageManager.PERMISSION_GRANTED) {
              if (Build.VERSION.SDK_INT == Build.VERSION_CODES.M && permission == Manifest.permission.CHANGE_NETWORK_STATE) {
                // Exclude CHANGE_NETWORK_STATE as it does not require explicit user approval.
                // This workaround is needed for devices running Android 6.0.0,
                // see https://issuetracker.google.com/issues/37067994
                continue
              }
              if (Build.VERSION.SDK_INT < Build.VERSION_CODES.Q &&
                permission == Manifest.permission.ACCESS_BACKGROUND_LOCATION
              ) {
                continue
              }
              permissionList.add(permission)
            }
          }
        }
      } catch (e: Exception) {
        e.printStackTrace()
      }
      return permissionList.toTypedArray<String>()
    }

  fun onRequestPermissionsResult(requestCode: Int, grantResults: IntArray) {
    if (resultListener == null) return

    // Request was cancelled.
    if (grantResults.isEmpty()) return

    if (requestCode == PERMISSIONS_REQUEST_CODE) {
      var allGranted = true
      for (result in grantResults) {
        allGranted = allGranted and (result == PackageManager.PERMISSION_GRANTED)
      }

      if (allGranted) {
        resultListener!!.permissionsGranted()
      } else {
        resultListener!!.permissionsDenied()
      }
    }
  }

  companion object {
    private const val PERMISSIONS_REQUEST_CODE = 42903222
  }
}

import React from 'react';
import { Platform } from 'react-native';
import { PERMISSIONS, requestMultiple, type Permission } from 'react-native-permissions';

export const useLocationPermission = () => {
  React.useEffect(() => {
    request();
  }, []);

  const request = async () => {
    const ANDROID_LOCATION_PERMISSIONS = [
      PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION,
      PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
    ];

    const IOS_LOCATION_PERMISSIONS = [
      PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
      PERMISSIONS.IOS.LOCATION_ALWAYS,
      PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
    ];

    const LOCATION_PERMISSIONS = Platform.select<Permission[]>({
      ios: IOS_LOCATION_PERMISSIONS,
      android: ANDROID_LOCATION_PERMISSIONS,
      default: [],
    });

    await requestMultiple(LOCATION_PERMISSIONS);
  };
};

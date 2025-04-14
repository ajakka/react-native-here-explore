import React from 'react';
import { checkMultiple, PERMISSIONS, requestMultiple, RESULTS } from 'react-native-permissions';

export const useLocationPermission = () => {
  React.useEffect(() => {
    request();
  }, []);

  const request = async () => {
    const ANDROID_LOCATION_PERMISSIONS = [
      PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION,
      PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
    ];

    const result = await checkMultiple(ANDROID_LOCATION_PERMISSIONS);
    if (
      result[PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION] === RESULTS.GRANTED &&
      result[PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION] === RESULTS.GRANTED
    ) {
      return;
    }

    await requestMultiple(ANDROID_LOCATION_PERMISSIONS);
  };
};

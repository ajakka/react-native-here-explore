import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { CarSVG, PedestrianSVG, ScooterSVG } from '@/components/icons';
import { useLocationPermission } from '@/hooks/useLocationPermission';
import type { ScreenNames, ScreenProps } from '@/navigation';
import type { GeoCoordinates, GeoPolyline, NavigationHandle } from 'react-native-here-navigate';
import { Navigation } from 'react-native-here-navigate';

export const NavigationScreenName: ScreenNames = 'Navigation';

const centerPoint: GeoCoordinates = { latitude: 30.4130643, longitude: -9.6126792 };

const geoPolyline: GeoPolyline = [
  // { latitude: 52.5561936, longitude: 13.3432207 },
  { latitude: 30.4130643, longitude: -9.6126792 },
];

export default function NavigationScreen(_: ScreenProps<'Navigation'>) {
  useLocationPermission();

  const { bottom } = useSafeAreaInsets();

  const navigationRef = React.useRef<NavigationHandle>(null);

  const [isNavigating, setIsNavigating] = useState(false);
  const [isSimulated, setIsSimulated] = useState(false);
  const [isCameraTracking, setIsCameraTracking] = useState(true);

  const handleUserLocationResolved = (userLocation: GeoCoordinates) => {
    navigationRef.current?.startNavigation({ geoPolyline: [userLocation, ...geoPolyline] });
  };

  const handleUserLocationNotFound = (message: string) => {
    console.error('User location not found', message);
  };

  const handleNavigationToggle = () => {
    if (isNavigating) {
      navigationRef.current?.stopNavigation();
    } else {
      navigationRef.current?.prefetchUserLocation();
    }
    setIsNavigating(!isNavigating);
  };

  const handleCameraTrackingToggle = () => {
    setIsCameraTracking(!isCameraTracking);
  };

  const handleSimulationToggle = () => {
    setIsSimulated(!isSimulated);
  };

  return (
    <View style={styles.container}>
      <Navigation
        ref={navigationRef}
        geoCoordinates={centerPoint}
        style={styles.map}
        mapScheme="SATELLITE"
        zoomValue={13.4}
        isSimulated={isSimulated}
        isCameraTrackingEnabled={isCameraTracking}
        isVoiceGuidanceEnabled={true}
        onUserLocationNotFound={(e) => handleUserLocationNotFound(e.nativeEvent.message)}
        onUserLocationResolved={(e) => handleUserLocationResolved(e.nativeEvent)}
      />
      <View style={[styles.controlsContainer, { paddingBottom: bottom + 16 }]}>
        <Text style={styles.title}>Navigation Controls</Text>
        <View style={styles.buttonsContainer}>
          <NavigationButton
            icon={<CarSVG color="white" width={24} height={24} />}
            title={isNavigating ? 'Stop' : 'Start'}
            onPress={handleNavigationToggle}
          />
          <NavigationButton
            icon={<PedestrianSVG color="white" width={24} height={24} />}
            title={isCameraTracking ? 'Tracking' : 'Free'}
            onPress={handleCameraTrackingToggle}
          />
          <NavigationButton
            icon={<ScooterSVG color="white" width={24} height={24} />}
            title={isSimulated ? 'Simulation' : 'Real'}
            onPress={handleSimulationToggle}
          />
        </View>
      </View>
    </View>
  );
}

const NavigationButton = ({ title, icon, onPress }: { title: string; icon: React.ReactNode; onPress: () => void }) => (
  <TouchableOpacity style={[styles.controlButton]} onPress={onPress}>
    <View style={styles.iconContainer}>{icon}</View>
    <Text style={styles.buttonText}>{title}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { flex: 1, marginBottom: -10 },
  controlsContainer: {
    backgroundColor: '#292F3A',
    padding: 8,
    borderTopStartRadius: 8,
    borderTopEndRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: {
    color: 'white',
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 16,
  },
  buttonsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  controlButton: {
    flex: 1,
    minWidth: 100,
    backgroundColor: '#3B4352',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  buttonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
  },
});

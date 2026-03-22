import React from 'react';
import { StyleSheet, View } from 'react-native';

import type { GeoCoordinates } from 'react-native-here-explore';
import type { RouteOption } from 'react-native-here-explore';
import { Map, Marker, Polyline, useRouting } from 'react-native-here-explore';

import RouteOptionsSelector from '../components/RouteOptionsSelector';

const centerPoint: GeoCoordinates = {
  latitude: 52.51967475,
  longitude: 13.36895715,
};

const waypoints: GeoCoordinates[] = [
  { latitude: 52.5561936, longitude: 13.3432207 },
  { latitude: 52.4841669, longitude: 13.3957046 },
];

export default function RoutesScreen() {
  const [routeOption, setRouteOption] =
    React.useState<RouteOption>('PedestrianOptions');

  const { route, calculate, cancel } = useRouting({ waypoints, routeOption });

  React.useEffect(() => {
    calculate();
    return () => cancel();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <Map
        geoCoordinates={centerPoint}
        style={styles.box}
        mapScheme="NORMAL_NIGHT"
        zoomValue={13.4}
        onMapTap={({ nativeEvent }) => {
          console.log('onMapTap', nativeEvent);
        }}
        onMapLongPress={({ nativeEvent }) => {
          console.log('onMapLongPress', nativeEvent);
        }}
      >
        {waypoints.map((waypoint, index) => (
          <Marker
            key={index}
            geoCoordinates={waypoint}
            size={{ width: 128, height: 128 }}
            anchor={{ vertical: 0.9 }}
            image={require('../assets/marker.png')}
          />
        ))}
        <Polyline
          lineType="SOLID"
          lineColor="#72A1F1"
          lineWidth={16}
          geoPolyline={route?.vertices ?? []}
        />
      </Map>

      <RouteOptionsSelector
        selectedRoute={routeOption}
        onRouteOptionPress={setRouteOption}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  box: { margin: -4 },
});

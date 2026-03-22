import React from 'react';
import { StyleSheet, View } from 'react-native';

import {
  Map,
  Marker,
  Polyline,
  useRouting,
  type GeoCoordinates,
  type RouteOption,
} from 'react-native-here-explore';

import type { ScreenNames, ScreenProps } from '../../navigation';
import RouteOptionsSelector from './components/RouteOptionsSelector';

export const RoutesScreenName: ScreenNames = 'Routes';

const centerPoint: GeoCoordinates = {
  latitude: 52.51967475,
  longitude: 13.36895715,
};

const waypoints: GeoCoordinates[] = [
  { latitude: 52.5561936, longitude: 13.3432207 },
  { latitude: 52.4841669, longitude: 13.3957046 },
];

export default function RoutesScreen(_: ScreenProps<'Routes'>) {
  const [routeOption, setRouteOption] =
    React.useState<RouteOption>('PedestrianOptions');

  const { route, calculate, cancel } = useRouting({ waypoints, routeOption });

  React.useEffect(() => {
    calculate();
    return () => {
      cancel();
    };
  }, [calculate, cancel]);

  return (
    <View style={{ flex: 1 }}>
      <Map
        geoCoordinates={centerPoint}
        testID="map"
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
            image={require('../../assets/marker.png')}
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
  addWaypoints: {
    position: 'absolute',
    top: 100,
    start: 0,
    padding: 16,
    backgroundColor: 'white',
    borderRadius: 8,
    marginStart: 16,
  },
  bottomSheet: {
    backgroundColor: '#292F3A',
    borderTopStartRadius: 4,
    borderTopEndRadius: 4,
  },
  title: {
    marginHorizontal: 16,
    marginVertical: 16,
    color: 'white',
    fontSize: 24,
    fontWeight: '600',
  },
  scrollView: {
    width: '100%',
    alignContent: 'center',
    marginBottom: 16,
  },
  pin_container: {
    padding: 15,
    backgroundColor: 'black',
    borderRadius: 10,
  },
  pin_text: {
    color: 'white',
    fontWeight: 'bold',
  },
  pin_arrow: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: 10,
    borderRightWidth: 10,
    borderBottomWidth: 10,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: 'black',
    transform: [{ rotate: '180deg' }],
    top: -1,
  },
});

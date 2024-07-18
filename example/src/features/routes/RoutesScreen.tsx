import React from 'react';
import { StyleSheet, View } from 'react-native';

import type { GeoCoordinates, GeoPolyline } from 'react-native-here-explore';
import { Map, Marker, Polyline } from 'react-native-here-explore';
import { useRouting, RouteOption } from 'react-native-here-explore';

import type { ScreenNames, ScreenProps } from '@/navigation';
import RouteOptionsSelector from './components/RouteOptionsSelector';

export const RoutesScreenName: ScreenNames = 'Routes';

const centerPoint: GeoCoordinates = {
  latitude: 52.51967475,
  longitude: 13.36895715,
};

const wayPoints: GeoCoordinates[] = [
  { latitude: 52.5561936, longitude: 13.3432207 },
  { latitude: 52.4841669, longitude: 13.3957046 },
];

export default function RoutesScreen(_: ScreenProps<'Routes'>) {
  const [vertices, setVertices] = React.useState<GeoPolyline>([]);
  const [route, setRoute] = React.useState<RouteOption>(
    RouteOption.pedestrian()
  );

  const { cancel, calculateRoute } = useRouting();
  React.useEffect(() => {
    runCalculateRoute();
    return () => void cancel();
  }, [route]);

  async function runCalculateRoute() {
    const data = await calculateRoute(wayPoints, route);
    if (!data.routingError && data.routes[0]) {
      setVertices(data.routes[0].vertices);
    }
  }

  return (
    <View style={{ flex: 1 }}>
      <Map
        style={styles.box}
        mapScheme="NORMAL_NIGHT"
        geoCoordinates={centerPoint}
        zoomValue={13.4}
      >
        {wayPoints.map((wayPoint) => (
          <Marker
            geoCoordinates={wayPoint}
            size={{ width: 128, height: 128 }}
            anchor={{ vertical: 0.9 }}
            image={require('@/assets/marker.png')}
          />
        ))}
        <Polyline
          lineType="SOLID"
          lineColor="#72A1F1"
          lineWidth={16}
          geoPolyline={vertices}
        />
      </Map>

      <RouteOptionsSelector
        selectedRoute={route}
        onRouteOptionPress={setRoute}
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
});

import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {
  Map,
  Polyline,
  RouteOption,
  useRouting,
  type GeoPolyline,
} from 'react-native-maps-here';

import { BottomSheet } from '@/components';
import type { ScreenNames, ScreenProps } from '@/navigation';

const wayPoints = [
  { latitude: 52.5561936, longitude: 13.3432207 },
  { latitude: 52.4831559, longitude: 13.3946936 },
];

const ICON_SIZE = { width: 50, height: 50 };

export const RoutesScreenName: ScreenNames = 'Routes';

export default function RoutesScreen(props: ScreenProps<'Routes'>) {
  //
  const [showWaypoints, setSetshowWaypoints] = React.useState(false);
  const [vertices, setVertices] = React.useState<GeoPolyline>([]);

  const { calculateRoute } = useRouting();

  React.useEffect(() => {
    async function runCalculateRoute() {
      const data = await calculateRoute(wayPoints, RouteOption.bicycle());
      console.log('runCalculateRoute data', data);

      if (!data.routingError && data.routes[0]) {
        console.log('vertices', data.routes[0].vertices.length);
        console.log('durationInSeconds', data.routes[0].durationInSeconds);

        setVertices(data.routes[0].vertices);
      }
    }

    runCalculateRoute();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <Map
        style={styles.box}
        mapScheme="NORMAL_NIGHT"
        geoCoordinates={{ latitude: 52.503938, longitude: 13.3667829 }}
        zoomValue={15}
      >
        <Polyline
          lineType="SOLID"
          lineColor="yellow"
          lineWidth={8.0}
          geoPolyline={vertices}
        />
      </Map>
      <BottomSheet />

      {/* <Pressable
        style={styles.addWaypoints}
        onPress={() => {
          setSetshowWaypoints(!showWaypoints);
        }}
      >
        <Text>Add way points</Text>
      </Pressable> */}
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    // width: '100%',
    // height: '100%',
    backgroundColor: 'green',
  },
  addWaypoints: {
    position: 'absolute',
    top: 100,
    start: 0,
    padding: 16,
    backgroundColor: 'white',
    borderRadius: 8,
    marginStart: 16,
  },
});

import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import {
  Map,
  Polyline,
  RouteOption,
  useRouting,
  type GeoPolyline,
} from 'react-native-maps-here';

import { BottomSheet } from '@/components';
import type { ScreenNames, ScreenProps } from '@/navigation';
import RoundButton from '@/components/RoundButton';

const wayPoints: GeoPolyline = [
  { latitude: 52.5561936, longitude: 13.3432207 },
  { latitude: 52.4831559, longitude: 13.3946936 },
];

export const RoutesScreenName: ScreenNames = 'Routes';

export default function RoutesScreen({ navigation }: ScreenProps<'Routes'>) {
  const [vertices, setVertices] = React.useState<GeoPolyline>([]);

  const { cancel, calculateRoute } = useRouting();
  const { top, left } = useSafeAreaInsets();

  React.useEffect(() => {
    async function runCalculateRoute() {
      const data = await calculateRoute(wayPoints, RouteOption.bicycle());
      if (!data.routingError && data.routes[0]) {
        setVertices(data.routes[0].vertices);
      }
    }

    runCalculateRoute();

    return () => void cancel();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <Map
        style={styles.box}
        mapScheme="NORMAL_NIGHT"
        geoCoordinates={{ latitude: 52.51967475, longitude: 13.36895715 }}
        zoomValue={13}
      >
        <Polyline
          lineType="SOLID"
          lineColor="#6cabae"
          lineWidth={12}
          geoPolyline={vertices}
        />
      </Map>
      <RoundButton
        text="Back"
        style={{ position: 'absolute', top: top + 16, marginStart: left + 24 }}
        onPress={() => navigation.goBack()}
      />
      <BottomSheet />
    </View>
  );
}

const styles = StyleSheet.create({
  box: {},
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

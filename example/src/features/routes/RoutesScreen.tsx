import { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import type { GeoCoordinates, GeoPolyline } from 'react-native-here-explore';
import {
  Map,
  Marker,
  Polyline,
  RouteOption,
  useRouting,
} from 'react-native-here-explore';

import { BicycleSVG, BusSVG, CarSVG, TruckSVG } from '@/components/icons';
import { ScooterSVG, TaxiSVG, PedestrianSVG } from '@/components/icons';
import RoundButton from '@/components/RoundButton';

import type { ScreenNames, ScreenProps } from '@/navigation';

const wayPoints: GeoCoordinates[] = [
  { latitude: 52.5561936, longitude: 13.3432207 },
  { latitude: 52.4841669, longitude: 13.3957046 },
];

const routeOptions = [
  {
    title: 'Pedestrian',
    image: <PedestrianSVG color="white" />,
    routeOption: RouteOption.pedestrian(),
  },
  {
    title: 'Bicycle',
    image: <BicycleSVG color="white" />,
    routeOption: RouteOption.bicycle(),
  },
  {
    title: 'Scooter',
    image: <ScooterSVG color="white" />,
    routeOption: RouteOption.scooter(),
  },
  {
    title: 'Car',
    image: <CarSVG color="white" />,
    routeOption: RouteOption.car(),
  },
  {
    title: 'Bus',
    image: <BusSVG color="white" />,
    routeOption: RouteOption.bus(),
  },
  {
    title: 'Taxi',
    image: <TaxiSVG color="white" />,
    routeOption: RouteOption.taxi(),
  },
  {
    title: 'Truck',
    image: <TruckSVG color="white" />,
    routeOption: RouteOption.truck(),
  },
];

export const RoutesScreenName: ScreenNames = 'Routes';

export default function RoutesScreen(props: ScreenProps<'Routes'>) {
  const { bottom } = useSafeAreaInsets();

  const [vertices, setVertices] = useState<GeoPolyline>([]);
  const [route, setRoute] = useState<RouteOption>(RouteOption.pedestrian());

  const { cancel, calculateRoute } = useRouting();
  useEffect(() => {
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
        geoCoordinates={{ latitude: 52.51967475, longitude: 13.36895715 }}
        zoomValue={13.4}
      >
        <Marker
          geoCoordinates={wayPoints[0]!}
          size={{ width: 128, height: 128 }}
          anchor={{ vertical: 0.9 }}
          image={require('@/assets/marker.png')}
        />
        <Marker
          geoCoordinates={wayPoints[1]!}
          size={{ width: 128, height: 128 }}
          anchor={{ vertical: 0.9 }}
          image={require('@/assets/marker.png')}
        />
        <Polyline
          lineType="SOLID"
          lineColor="#72A1F1"
          lineWidth={16}
          geoPolyline={vertices}
        />
      </Map>

      <View style={[styles.bottomSheet, { paddingBottom: bottom }]}>
        <Text style={styles.title}>Route Options</Text>
        <ScrollView
          horizontal={true}
          style={styles.scrollView}
          contentContainerStyle={{ paddingHorizontal: 16 }}
        >
          {routeOptions.map(({ title, image, routeOption }) => (
            <RoundButton
              key={title}
              title={title}
              image={image}
              onPress={() => setRoute(routeOption)}
              selected={route.equals(routeOption)}
            />
          ))}
        </ScrollView>
      </View>
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

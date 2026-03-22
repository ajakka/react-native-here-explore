import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import type { RouteOption } from 'react-native-here-explore';

import {
  BicycleSVG,
  BusSVG,
  CarSVG,
  TruckSVG,
  ScooterSVG,
  TaxiSVG,
  PedestrianSVG,
} from '../../../components/icons';
import RoundButton from '../../../components/RoundButton';

const RouteOptions: { title: string; image: React.ReactElement; routeOption: RouteOption }[] = [
  { title: 'Pedestrian', image: <PedestrianSVG color="white" />, routeOption: 'PedestrianOptions' },
  { title: 'Bicycle', image: <BicycleSVG color="white" />, routeOption: 'BicycleOptions' },
  { title: 'Scooter', image: <ScooterSVG color="white" />, routeOption: 'ScooterOptions' },
  { title: 'Car', image: <CarSVG color="white" />, routeOption: 'CarOptions' },
  { title: 'Bus', image: <BusSVG color="white" />, routeOption: 'BusOptions' },
  { title: 'Taxi', image: <TaxiSVG color="white" />, routeOption: 'TaxiOptions' },
  { title: 'Truck', image: <TruckSVG color="white" />, routeOption: 'TruckOptions' },
];

export type RouteOptionsSelectorProps = {
  selectedRoute: RouteOption;
  onRouteOptionPress: (routeOption: RouteOption) => void;
};

export default function RouteOptionsSelector({
  selectedRoute,
  onRouteOptionPress,
}: RouteOptionsSelectorProps) {
  const { bottom } = useSafeAreaInsets();

  return (
    <View style={[styles.bottomSheet, { paddingBottom: bottom }]}>
      <Text style={styles.title}>Route Options</Text>
      <ScrollView
        horizontal={true}
        style={styles.scrollView}
        contentContainerStyle={{ paddingHorizontal: 16 }}
      >
        {RouteOptions.map(({ title, image, routeOption }) => (
          <RoundButton
            key={title}
            title={title}
            image={image}
            onPress={() => onRouteOptionPress(routeOption)}
            selected={selectedRoute === routeOption}
          />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
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

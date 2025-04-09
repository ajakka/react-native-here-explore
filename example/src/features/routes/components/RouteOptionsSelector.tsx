import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { BicycleSVG, BusSVG, CarSVG, TruckSVG } from '@/components/icons';
import { ScooterSVG, TaxiSVG, PedestrianSVG } from '@/components/icons';
import RoundButton from '@/components/RoundButton';
import { RouteOption } from 'react-native-here-navigate';

const RouteOptions = [
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
            selected={selectedRoute.equals(routeOption)}
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

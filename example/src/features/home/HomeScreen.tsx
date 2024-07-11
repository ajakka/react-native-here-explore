import { Button, StyleSheet, View } from 'react-native';

import type { ScreenNames, ScreenProps } from '@/navigation';
import { PolylineScreenName, RoutesScreenName } from '@/features';

export const HomeScreenName: ScreenNames = 'Home';

export default function HomeScreen({ navigation }: ScreenProps<'Home'>) {
  return (
    <View style={[styles.container]}>
      <Button
        title="Polyline screen"
        onPress={() => navigation.navigate(PolylineScreenName)}
      />
      <View style={styles.margin} />
      <Button
        title="Routes screen"
        onPress={() => navigation.navigate(RoutesScreenName)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 8,
    // alignItems: 'center',
    justifyContent: 'center',
  },
  margin: { marginVertical: 4 },
});

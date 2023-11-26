import * as React from 'react';

import { StyleSheet, View } from 'react-native';
import { MapsHereView } from 'react-native-maps-here';

export default function App() {
  return (
    <View style={styles.container}>
      <MapsHereView
        style={styles.box}
        mapScheme="NORMAL_NIGHT"
        zoomValue={5}
        coordinates={{ lat: 31.6913827, lon: -8.4413898 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    width: '100%',
    height: '100%',
  },
});

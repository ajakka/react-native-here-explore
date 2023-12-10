import * as React from 'react';
import { StyleSheet, Text } from 'react-native';
import { MapsHereView } from 'react-native-maps-here';

export default function App() {
  return (
    // <Text>hello</Text>
    <MapsHereView
      style={styles.box}
      mapScheme="NORMAL_NIGHT"
      zoomValue={5}
      coordinates={{ lat: 31.6913827, lon: -8.4413898 }}
    />
  );
}

const styles = StyleSheet.create({
  box: {
    width: '100%',
    height: '100%',
  },
});

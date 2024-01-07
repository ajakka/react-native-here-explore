import * as React from 'react';
import { StyleSheet } from 'react-native';
import { MapsHereView, PolylineView } from 'react-native-maps-here';

export default function App() {
  return (
    <MapsHereView
      style={styles.box}
      mapScheme="NORMAL_NIGHT"
      zoomValue={11}
      coordinates={{ lat: 52.53032, lon: 13.37409 }}
    >
      <PolylineView
        lineColor="rgba(255, 255, 255, 255)"
        lineWidth={8.0}
        coordinates={[
          { lat: 52.53032, lon: 13.37409 },
          { lat: 52.5309, lon: 13.3946 },
          // { lat: 52.53894, lon: 13.39194 },
          // { lat: 52.54014, lon: 13.37958 },
        ]}
      />

      <PolylineView
        lineColor="green"
        lineWidth={8.0}
        coordinates={[
          { lat: 52.55032, lon: 13.44409 },
          { lat: 52.5509, lon: 13.4446 },
          { lat: 52.55894, lon: 13.44194 },
          { lat: 52.55014, lon: 13.44958 },
        ]}
      />

      <PolylineView
        lineColor="yellow"
        lineWidth={8.0}
        coordinates={[
          { lat: 52.63032, lon: 13.47409 },
          { lat: 52.6309, lon: 13.4946 },
          { lat: 52.63894, lon: 13.49194 },
          { lat: 52.64014, lon: 13.47958 },
        ]}
      />
    </MapsHereView>
  );
}

const styles = StyleSheet.create({
  box: {
    // width: '100%',
    // height: '100%',
    backgroundColor: 'green',
  },
});

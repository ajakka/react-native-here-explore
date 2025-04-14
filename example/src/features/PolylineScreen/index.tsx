import type { ScreenNames, ScreenProps } from '@/navigation';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Map, Polyline } from 'react-native-here-navigate';

export const PolylineScreenName: ScreenNames = 'Polyline';

export default function PolylineScreen(props: ScreenProps<'Polyline'>) {
  return (
    <View style={{ flex: 1 }}>
      <Map
        geoCoordinates={{ latitude: 52.51967475, longitude: 13.36895715 }}
        style={styles.box}
        mapScheme="NORMAL_NIGHT"
        zoomValue={13}
      >
        <Polyline
          lineType="SOLID"
          lineColor="#6cabae"
          lineWidth={12}
          geoPolyline={[
            { latitude: 52.5561936, longitude: 13.3432207 },
            { latitude: 52.4831559, longitude: 13.3946936 },
          ]}
        />
      </Map>
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

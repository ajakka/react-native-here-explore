import { useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { Map } from 'react-native-here-explore';
import type { ScreenNames, ScreenProps } from '../../navigation';

export const GulfOfGuineaScreenName: ScreenNames = 'GulfOfGuinea';

type Mode = 'geoCoordinates' | 'geoBox';

export default function GulfOfGuineaScreen(_: ScreenProps<'GulfOfGuinea'>) {
  const [mode, setMode] = useState<Mode>('geoCoordinates');

  return (
    <View style={styles.container}>
      <Text style={styles.label}>
        {mode === 'geoCoordinates'
          ? 'geoCoordinates — lat=0, lon=0 (Gulf of Guinea)'
          : 'geoBox — equatorial west Africa region'}
      </Text>
      {mode === 'geoCoordinates' ? (
        <Map
          geoCoordinates={{ latitude: 0, longitude: 0 }}
          mapScheme="NORMAL_DAY"
          zoomValue={4}
        />
      ) : (
        <Map
          geoBox={{
            southWestCorner: { latitude: -5, longitude: -5 },
            northEastCorner: { latitude: 5, longitude: 5 },
          }}
          mapScheme="NORMAL_DAY"
        />
      )}
      <View style={styles.toolbar}>
        <Button
          title={
            mode === 'geoCoordinates'
              ? 'Switch to geoBox'
              : 'Switch to geoCoordinates'
          }
          onPress={() =>
            setMode(mode === 'geoCoordinates' ? 'geoBox' : 'geoCoordinates')
          }
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  label: {
    textAlign: 'center',
    paddingVertical: 8,
    fontSize: 13,
  },
  toolbar: { padding: 16 },
});

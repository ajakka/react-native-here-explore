import { StyleSheet, View } from 'react-native';
import { Map, Polyline } from 'react-native-here-explore';

export default function PolylineScreen() {
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
          lineColor="#6CABAE"
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
});

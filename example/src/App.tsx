import * as React from 'react';
import { Alert, Image, ImageBase, StyleSheet } from 'react-native';
import { Arrow, Map, Marker, Polygon, Polyline } from 'react-native-maps-here';
import { Routing } from '../../src/components/RoutingView';

const originCoordinates = {
  latitude: 33.757043,
  longitude: -7.270303,
};
const destinationCoordinates = {
  latitude: 33.865833,
  longitude: -7.021998,
};
const wayPoints = [
  {
    latitude: 33.766877,
    longitude: -7.058795,
  },
  {
    latitude: 33.828499,
    longitude: -6.959031,
  },
];

export default function App() {
  return (
    <Map
      style={styles.box}
      mapScheme="NORMAL_NIGHT"
      // zoomValue={15}
      bearing={0}
      tilt={0}
      geoBox={{
        southWestCorner: { latitude: 33.819096, longitude: -7.320056 },
        northEastCorner: { latitude: 34.460004, longitude: -6.121828 },
      }}
      // geoCoordinates={{ latitude: 33.893085, longitude: -6.9812299 }}
      // watermarkStyle="LIGHT"
      // bearing={0}
      // tilt={0}
    >
      <Marker
        geoCoordinates={originCoordinates}
        image={{ uri: 'https://reactnative.dev/img/tiny_logo.png' }}
        size={{ width: 200, height: 200 }}
      />

      <Marker
        geoCoordinates={destinationCoordinates}
        image={require('./assets/tiny_logo.jpg')}
        // scale={1.5}
        size={{ width: 180, height: 180 }}
        anchor={{ horizontal: 0.5 }}
      />

      <Routing
        originCoordinates={originCoordinates}
        destinationCoordinates={destinationCoordinates}
        lineType={'SOLID'}
        lineColor={'yellow'}
        lineWidth={12.0}
        wayPoints={wayPoints}
        onSendMessageRoutingDetails={(data) =>
          console.log('routing details', data)
        }
      />

      {wayPoints.map((val, i) => {
        return (
          <Marker
            key={String(i)}
            geoCoordinates={{
              latitude: val.latitude,
              longitude: val.longitude,
            }}
            image={require('./assets/red_dot.png')}
            // scale={1.5}
            size={{ width: 120, height: 120 }}
            anchor={{ horizontal: 0.5 }}
          />
        );
      })}

      {/* <Arrow
          lineColor="red"
          lineWidth={8}
          geoPolyline={[
            { latitude: 52.55894, longitude: 13.24194 },
            { latitude: 52.48032, longitude: 13.34409 },
          ]}
        /> */}

      {/* <Polygon
          color="#FFFFFF55"
          outlineWidth={4}
          outlineColor="white"
          geoCoordinates={[
            { latitude: 52.45032, longitude: 13.44409 },
            { latitude: 52.55894, longitude: 13.34194 },
            { latitude: 52.66124, longitude: 13.44958 },
            { latitude: 52.55032, longitude: 13.55409 },
          ]}
        />

        <Polygon
          color="#FFFFFF55"
          outlineWidth={4}
          outlineColor="white"
          geoCircle={{
            center: { latitude: 52.45032, longitude: 13.44409 },
            radiusInMeters: 6000,
          }}
        /> */}

      {/* <Polyline
        lineType="SOLID"
        lineColor="yellow"
        lineWidth={8.0}
        geoPolyline={[
          { latitude: 52.63032, longitude: 13.47409 },
          { latitude: 52.6309, longitude: 13.4946 },
          { latitude: 52.63894, longitude: 13.49194 },
          { latitude: 52.64014, longitude: 13.47958 },
        ]}
      /> */}
    </Map>
  );
}

const styles = StyleSheet.create({
  box: {
    // width: '100%',
    // height: '100%',
    backgroundColor: 'green',
  },
});

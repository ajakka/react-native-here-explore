import * as React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import {
  Map,
  Marker,
  Polyline,
  RouteOption,
  useRouting,
  type GeoPolyline,
} from 'react-native-maps-here';
import type { ScreenNames, ScreenProps } from '@/navigation';

const originCoordinates = { latitude: 33.757043, longitude: -7.270303 };
const destinationCoordinates = { latitude: 33.865833, longitude: -7.021998 };

const wayPoints = [
  { latitude: 33.766877, longitude: -7.058795 },
  { latitude: 33.828499, longitude: -6.959031 },
];

const ICON_SIZE = { width: 50, height: 50 };

export const RoutesScreenName: ScreenNames = 'Routes';

export default function RoutesScreen(props: ScreenProps<'Routes'>) {
  //
  const [showWaypoints, setSetshowWaypoints] = React.useState(false);
  const [vertices, setVertices] = React.useState<GeoPolyline>([]);

  const { calculateRoute } = useRouting();

  React.useEffect(() => {
    async function runCalculateRoute() {
      const data = await calculateRoute(wayPoints, RouteOption.bicycle());
      console.log('runCalculateRoute data', data);

      if (!data.routingError && data.routes[0]) {
        console.log('vertices', data.routes[0].vertices.length);
        console.log('durationInSeconds', data.routes[0].durationInSeconds);

        setVertices(data.routes[0].vertices);
      }
    }

    runCalculateRoute();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <Map
        style={styles.box}
        mapScheme="NORMAL_NIGHT"
        bearing={0}
        tilt={0}
        geoBox={{
          southWestCorner: { latitude: 33.819096, longitude: -7.320056 },
          northEastCorner: { latitude: 34.460004, longitude: -6.121828 },
        }}
        // zoomValue={15}
        // geoCoordinates={{ latitude: 33.893085, longitude: -6.9812299 }}
        // watermarkStyle="LIGHT"
        // bearing={0}
        // tilt={0}
      >
        <Marker
          geoCoordinates={originCoordinates}
          image={{ uri: 'https://reactnative.dev/img/tiny_logo.png' }}
          size={ICON_SIZE}
        />

        <Marker
          geoCoordinates={destinationCoordinates}
          image={require('../../assets/tiny_logo.jpg')}
          anchor={{ horizontal: 0.5 }}
          size={ICON_SIZE}
          // scale={1.5}
        />

        <Polyline
          lineType="SOLID"
          lineColor="yellow"
          lineWidth={8.0}
          geoPolyline={vertices}
        />

        {/* <Routing
        originCoordinates={originCoordinates}
        destinationCoordinates={destinationCoordinates}
        lineType={'SOLID'}
        lineColor={'yellow'}
        lineWidth={12.0}
        wayPoints={wayPoints}
        onSendMessageRoutingDetails={(data) =>
          console.log('routing details', data)
        }
      /> */}

        {wayPoints.map((waypoint, i) => {
          return (
            <Marker
              key={String(i)}
              geoCoordinates={waypoint}
              image={require('../../assets/red_dot.png')}
              size={ICON_SIZE}
              anchor={{ horizontal: 0.5 }}
              // scale={1.5}
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
      <Pressable
        style={styles.addWaypoints}
        onPress={() => {
          setSetshowWaypoints(!showWaypoints);
        }}
      >
        <Text>Add way points</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    // width: '100%',
    // height: '100%',
    backgroundColor: 'green',
  },
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

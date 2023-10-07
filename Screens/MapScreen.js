import { Dimensions, StyleSheet, Text, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';

export const MapScreen = ({ route }) => {
  const { coordinates } = route.params;
  console.log('coordinates :>> ', coordinates);
  return (
    <View style={styles.container}>
      <MapView
        style={styles.mapStyle}
        region={{
          ...coordinates,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        showsUserLocation={true}
      >
        {coordinates && (
          <Marker
            title="I am here"
            coordinate={coordinates}
            description="Hello"
          />
        )}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 16,
    paddingRight: 16,
    backgroundColor: '#FFF',
  },
  mapStyle: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});

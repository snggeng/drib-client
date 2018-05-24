import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Animated,
} from 'react-native';
import { Container, Header, Left, Body, Right, Title } from 'native-base';
import { MapView} from 'expo';

export const getCurrentLocation = () => {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(position => resolve(position), e => reject(e));
  });
};

class HomeScreen extends Component {
  constructor(props) {
    super(props)
    this.map = null;
    this.state = {
      markers: [{latlng: {latitude: 37.40113, longitude: -122.0577}, title: 'car 1', description: 'Tesla'},
                {latlng: {latitude: 37.40501, longitude: -122.0771}, title: 'car 2', description: 'Honda'},
                {latlng: {latitude: 37.40501, longitude: -122.0500}, title: 'car 3', description: 'BMW'},
                {latlng: {latitude: 37.40123, longitude: -122.0587}, title: 'car 4', description: 'Tesla'}],
      region: {
          latitude: null,
          longitude: null,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
      },
    }
  }

  async componentDidMount() {
    console.log('comp will mount')
    return await getCurrentLocation().then( async (position) => {
      console.log('position', position)
      if (position) {
        await this.setState({
          region: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          },
        });
      }
    });
  }

  handleCenter = () => {
    console.log('handle center')
    const { latitude, longitude, latitudeDelta, longitudeDelta } = this.state.region;
    this.map.animateToRegion({
      latitude,
      longitude,
      latitudeDelta,
      longitudeDelta
    })
  }

  render() {
    const { region } = this.state;
    return (
      <Container>
        <Text style={styles.welcome}>
          Home Screen
        </Text>
        <MapView
          ref={map => {this.map = map}}
          onMapReady={() => setTimeout(this.handleCenter, 10)}
          style={{ flex: 1 }}
          initialRegion={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          showsMyLocationButton={true}
          showsUserLocation={true}
        >
        {this.state.markers.map((marker, index) => (
          <MapView.Marker
            key={index}
            coordinate={marker.latlng}
            title={marker.title}
            description={marker.description}
          >
            <Animated.View style={[styles.markerWrap]}>
              <Animated.View style={[styles.ring]} />
              <View style={styles.marker} />
            </Animated.View>
          </MapView.Marker>
        ))}
        </MapView>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#bb00cc',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    color: '#000000',
  },
  markerWrap: {
    alignItems: "center",
    justifyContent: "center",
  },
  marker: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "rgba(130,4,150, 0.9)",
  },
  ring: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "rgba(130,4,150, 0.3)",
    position: "absolute",
    borderWidth: 1,
    borderColor: "rgba(130,4,150, 0.5)",
  },
});

export default HomeScreen;
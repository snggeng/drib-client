import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Animated,
  TouchableHighlight,
} from 'react-native';
import ReactNativeComponentTree from 'react-native/Libraries/Renderer/shims/ReactNativeComponentTree';
import { Container, Header, Left, Body, Right, Title } from 'native-base';
import { MapView } from 'expo';
import { Actions } from 'react-native-router-flux';

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
      vehicles: [{
          id: 123,
          odometer: {
              distance: 123
          },
          vin: "5XXGN4A72EG347600",
          info: {
              make: "TESLA",
              model: "Model S",
              year: 2014
          },
          location: {
              latitude: 37.40113,
              longitude: -122.0577
          },
          battery: {
              percentRemaining: 0.3,
              range: 40.5
          }
      }, {
          id: 124,
          odometer: {
              distance: 124
          },
          vin: "5XXGSH2A72EG351230",
          info: {
              make: "HONDA",
              model: "Odyssey",
              year: 2015
          },
          location: {
              latitude: 37.40501,
              longitude: -122.0771
          },
          battery: {
              percentRemaining: 0.5,
              range: 40.5
          }
      }, {
          id: 125,
          odometer: {
              distance: 125
          },
          vin: "5XXJIJ2A72GS312524",
          info: {
              make: "BMW",
              model: "X5",
              year: 2018
          },
          location: {
              latitude: 37.40501,
              longitude: -122.0500
          },
          battery: {
              percentRemaining: 0.7,
              range: 45.5
          }
      }, {
          id: 126,
          odometer: {
              distance: 126
          },
          vin: "5XXREJ2Y72DS344433",
          info: {
              make: "CHRYSLER",
              model: "Pacifica",
              year: 2018
          },
          location: {
              latitude: 37.40123,
              longitude: -122.0587
          },
          battery: {
              percentRemaining: 0.9,
              range: 50.5
          }
      }],
      region: {
          latitude: null,
          longitude: null,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
      },
    }
  }

  async componentDidMount() {
    return await getCurrentLocation().then( async (position) => {
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
    const { latitude, longitude, latitudeDelta, longitudeDelta } = this.state.region;
    this.map.animateToRegion({
      latitude,
      longitude,
      latitudeDelta,
      longitudeDelta
    })
  }

  handlePress = (marker) => {
    // pass marker into vehicle info screen
    Actions.vehicle({ marker })
  }

  render() {
    const { region } = this.state;
    return (
      <Container>
        <Text style={styles.header}>
          D R I B
        </Text>
        <Text style={styles.subheader}>
          Enable Location Services
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
        {/* {this.state.vehicles.map((v, i) => (<Text>{v.vin}</Text>))} */}
        {this.state.vehicles.map((marker, index) => (
          <MapView.Marker
            key={index}
            id={index}
            coordinate={marker.location}
            title={marker.info.make}
            description={`${marker.info.model} ${marker.info.year}`}
            onCalloutPress={() => this.handlePress(marker, index)}
          >
            <Animated.View style={styles.markerWrap}>
              <Animated.View style={styles.ring} />
              <MapView.Callout tooltip marker={marker}>
                <TouchableHighlight underlayColor='#dddddd' marker={marker}>
                    <View style={styles.marker} marker={marker}>
                        <Text>{`${marker.info.make} \n ${marker.info.model} ${marker.info.year}`}</Text>
                    </View>
                </TouchableHighlight>
              </MapView.Callout>
            </Animated.View>
          </MapView.Marker>
        ))}
        </MapView>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    fontSize: 40,
    textAlign: 'center',
    color: '#000',
    backgroundColor: '#fff'
  },
  subheader: {
    fontSize: 20,
    textAlign: 'center',
    color: '#fff',
    backgroundColor: 'purple'
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
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Animated,
  TouchableHighlight,
  AsyncStorage,
} from 'react-native';
import ReactNativeComponentTree from 'react-native/Libraries/Renderer/shims/ReactNativeComponentTree';
import { Container, Header, Left, Body, Right, Title, Toast } from 'native-base';
import { MapView } from 'expo';
import { Actions } from 'react-native-router-flux';

export const getCurrentLocation = () => {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(position => resolve(position), e => reject(e));
  });
};

// {
//           id: 123,
//           odometer: {
//               distance: 123
//           },
//           vin: "5XXGN4A72EG347600",
//           info: {
//               make: "TESLA",
//               model: "Model S",
//               year: 2014
//           },
//           location: {
//               latitude: 37.40113,
//               longitude: -122.0577
//           },
//           battery: {
//               percentRemaining: 0.3,
//               range: 40.5
//           }
//       }, {
//           id: 124,
//           odometer: {
//               distance: 124
//           },
//           vin: "5XXGSH2A72EG351230",
//           info: {
//               make: "HONDA",
//               model: "Odyssey",
//               year: 2015
//           },
//           location: {
//               latitude: 37.40501,
//               longitude: -122.0771
//           },
//           battery: {
//               percentRemaining: 0.5,
//               range: 40.5
//           }
//       }, {
//           id: 125,
//           odometer: {
//               distance: 125
//           },
//           vin: "5XXJIJ2A72GS312524",
//           info: {
//               make: "BMW",
//               model: "X5",
//               year: 2018
//           },
//           location: {
//               latitude: 37.40501,
//               longitude: -122.0500
//           },
//           battery: {
//               percentRemaining: 0.7,
//               range: 45.5
//           }
//       }, {
//           id: 126,
//           odometer: {
//               distance: 126
//           },
//           vin: "5XXREJ2Y72DS344433",
//           info: {
//               make: "CHRYSLER",
//               model: "Pacifica",
//               year: 2018
//           },
//           location: {
//               latitude: 37.40123,
//               longitude: -122.0587
//           },
//           battery: {
//               percentRemaining: 0.9,
//               range: 50.5
//           }
//       }

class HomeScreen extends Component {
  constructor(props) {
    super(props)
    this.map = null;
    this.state = {
      vehicles: [],
      region: {
          latitude: null,
          longitude: null,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
      },
      showToast: false
    }
  }

  async componentDidMount() {
    await getCurrentLocation().then( async (position) => {
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
    let token
    try {
      token = await AsyncStorage.getItem('token')
      console.log(token)
    } catch(e) {
      console.log(e)
    }

    const vehicles = await fetch('https://b6301cca.ngrok.io' + '/vehicles', {
      headers: {
        'content-type': 'application/json',
        'authorization': `Bearer ${token}`
      }
    }).then(res => res.json())
    console.log(vehicles)
    await this.setState({vehicles})
    console.log(this.state)
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

  handlePress = async (marker) => {
    // Show toast
    Toast.show({
      text: "Fetching Car Information...",
      buttonText: "Okay",
      duration: 3000
    })
    // pass marker into vehicle info screen
    const vehicle = await fetch('https://b6301cca.ngrok.io' + '/vehicles/' + marker.id, {
      headers: {
        authorization: `bearer ${await AsyncStorage.getItem('token')}`
      },
    }).then(res => res.json())

    console.log(vehicle)
    // Navigate to vehicle screen
    Actions.vehicle({ marker: vehicle })
  }

  render() {
    const { region } = this.state;
    return (
      <Container>
        <Text style={styles.header}>
          D R I B
        </Text>
        <Text style={styles.subheader}>
          Find Your Ride
        </Text>
        <Text style={styles.subsubheader}>
          Tap on a marker to view a drib's information, and tap on the tooltip to make a reservation.
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
        {this.state.vehicles
            .filter(v => !v.reserved)
            .map((marker, index) => (
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
  subsubheader: {
    fontSize: 12,
    textAlign: 'center',
    color: '#fff',
    backgroundColor: 'grey'
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
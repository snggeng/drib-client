import React from 'react';
import { Router, Scene } from 'react-native-router-flux';
import { StyleSheet, Text } from 'react-native';
import { Root } from 'native-base';
import LoginScreen from './Screens/Login';
import HomeScreen from './Screens/Home';
import VehicleScreen from './Screens/Vehicle';
import ReservationScreen from './Screens/Reservation';
import TripScreen from './Screens/Trip';
import SummaryScreen from './Screens/Summary'

export default class App extends React.Component {
  async componentWillMount() {
    await Expo.Font.loadAsync({
      'Roboto': require('native-base/Fonts/Roboto.ttf'),
      'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
    });
  }
  
  render() {
    return (
      <Root>
       <Router>
        <Scene key="root">
            <Scene key="login"
              component={LoginScreen}
              title="Login"
              initial
            />
            <Scene
              key="home"
              component={HomeScreen}
              title="Home"
            />
            <Scene
              key="vehicle"
              component={VehicleScreen}
              title="Vehicle Information"
            />
            <Scene
              key="reservation"
              component={ReservationScreen}
              title="Reservation Information"
            />
            <Scene
              key="trip"
              component={TripScreen}
              title="Trip Information"
            />
            <Scene
              key="summary"
              component={SummaryScreen}
              title="Trip Summary"
            />
        </Scene>
      </Router>
      </Root>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

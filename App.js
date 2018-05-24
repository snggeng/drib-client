import React from 'react';
import { Router, Scene } from 'react-native-router-flux';
import { StyleSheet, Text } from 'react-native';
import LoginScreen from './Screens/Login';
import HomeScreen from './Screens/Home';

const TabIcon = ({ selected, title }) => {
  return (
    <Text style={{color: selected ? 'red' :'black'}}>{title}</Text>
  );
}

export default class App extends React.Component {
  async componentWillMount() {
    await Expo.Font.loadAsync({
      'Roboto': require('native-base/Fonts/Roboto.ttf'),
      'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
    });
  }
  
  render() {
    return (
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
        </Scene>
      </Router>
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

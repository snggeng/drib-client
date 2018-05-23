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
  render() {
    return (
       <Router>
        <Scene key="root">
          <Scene
            key="tabbar"
            tabs={true}
            tabBarStyle={{ backgroundColor: '#FFFFFF' }}
          >
          <Scene key="tab1" title="TAB1" icon={TabIcon}>
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

          <Scene key="tab2" title="TAB2" icon={TabIcon}>
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
          </Scene>
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

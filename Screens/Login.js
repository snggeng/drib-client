import React, { Component } from 'react';
import {
  StyleSheet,
  AsyncStorage,
} from 'react-native';
import { Container, Header, Content, Button, Text, Form, Item, Input } from 'native-base';
import { Actions } from 'react-native-router-flux';

const handleLogin = async (e) => {
  // get user token
  const user = await fetch('https://c39f00b9.ngrok.io/user', {
    method: 'post',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify({
      email: 'geng+customer@smartcar.com'
    })
  }).then((res) => {
    return res.json()
  }).then(data => AsyncStorage.setItem('token', data.token))
  .then(() => AsyncStorage.getItem('token'))
  .then(token => console.log(token))
  .catch(e => console.log(e))
  // navigate to home screen
  Actions.home()
}

const LoginScreen = () => {
  return (
    // <View style={styles.container}>
    //   <Text style={styles.welcome}
    //         onPress={() => Actions.home()} // New Code
    //   >
    //     Login Screen
    //   </Text>
    // </View>
    <Container>
      <Content>
        <Form>
          <Item>
            <Input placeholder="Username" />
          </Item>
          <Item last>
            <Input placeholder="Password" />
          </Item>
        </Form>
        <Button full primary onPress={() => handleLogin()}>
          <Text>Login</Text>
        </Button>
      </Content>
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#bb0000',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    color: '#ffffff',
  },
});

export default LoginScreen;
import React, { Component } from 'react';
import {
  StyleSheet
} from 'react-native';
import { Container, Header, Content, Button, Text, Form, Item, Input } from 'native-base';
import { Actions } from 'react-native-router-flux';

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
        <Button full primary>
          <Text onPress={() => Actions.home()}>Login</Text>
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
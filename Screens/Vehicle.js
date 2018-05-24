import React, { Component } from 'react';
import {
  StyleSheet
} from 'react-native';
import { Container, Header, Content, Button, Text, Form, Item, Input } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { Actions } from 'react-native-router-flux';

const VehicleScreen = () => {
  return (
    <Container>
      <Content>
        <Grid>
            <Col style={{ backgroundColor: '#635DB7', height: 200 }}>{this.props.marker.title}</Col>
            <Col style={{ backgroundColor: '#00CE9F', height: 200 }}></Col>
          </Grid>
      </Content>
    </Container>
  );
}

const styles = StyleSheet.create({

});

export default VehicleScreen;
import React, { Component } from 'react';
import {
  StyleSheet,
  Animated,
  View,
  Text,
  AsyncStorage,
} from 'react-native';
import { Container, Header, Content, Button, Item, Icon, Badge, Toast, Footer } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { MapView } from 'expo';
import { Actions } from 'react-native-router-flux';

class TripScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            tripStarted: true,
        }
    };

    // stop trip
    handleStopTrip = async () => {
        const {rid, marker } = this.props
        // Show toast
        Toast.show({
            text: "Trip stopped! Remember to stop ignition.",
            buttonText: "Okay",
            duration: 3000
        })
        // end reservation
        let token = await AsyncStorage.getItem('token')
        const response = await fetch('https://b6301cca.ngrok.io/vehicles/' + marker.id + '/reservation/' + rid.id, {
            headers: {
                'content-type': 'application/json',
                authorization: `bearer ${token}`
            },
            method: 'put',
            body: JSON.stringify({action: "END"})
        }).then(res => res.json())
        // navigate to summary screen
        Actions.summary()
        console.log('final res', response)
    }

    // start ignition
    handleStartIgnition = async () => {
        this.state.tripStarted ? Toast.show({
            text: "Ignition started.",
            buttonText: "Okay",
            duration: 3000
        }) : Toast.show({
            text: "Please start your trip first.",
            buttonText: "Okay",
            duration: 3000
        })
        if (this.state.tripStarted) {
            this.setState({ignitionStarted: true})
        }
        console.log('start ignition')
    }

    // stop ignition
    handleStopIgnition = async () => {
        this.state.tripStarted ? Toast.show({
            text: "Ignition stopped. Please end your trip!",
            buttonText: "Okay",
            duration: 3000
        }) : this.state.ignitionStarted ? 
        Toast.show({
            text: "Please start the ignition first",
            buttonText: "Okay",
            duration: 3000
        }) : Toast.show({
            text: "Please start your trip first",
            buttonText: "Okay",
            duration: 3000
        })
        console.log('stop ignition')
    }


    render() {
        const { marker, rid } = this.props
        return (
          <Container>
                <Content style={styles.content}>
                    <Text style={styles.header}>{`${marker.info.make} ${marker.info.model} ${marker.info.year}`}</Text>
                <Grid>
                  <Row>
                    <Col>
                        <Badge style={styles.badge}> 
                        <Icon type="FontAwesome" name="car" style={{fontSize: 40, margin: 'auto', textAlign: 'center'}} />
                        </Badge>
                    </Col>
                    <Col style={{paddingTop: 15}}>
                        <Icon type='FontAwesome' name='barcode' /><Text>Vin: {marker.vin}</Text>
                        <Icon type='FontAwesome' name='tachometer'/><Text>Distance: {marker.odometer.distance}</Text>
                    </Col>
                  </Row>
                  <Text style={{fontWeight: 'bold', textAlign: 'center', fontSize: 20, marginTop: 10}}>Car Controls</Text>
                  <Row>
                    <Col>
                        <Button large style={styles.controls} onPress={this.handleStartIgnition}>
                        <Text style={{ textAlign: 'center', marginLeft: 22, color: 'white'}}>
                        Start Ignition
                        </Text>
                        </Button>
                    </Col>
                    <Col>
                        <Button large style={styles.controls} onPress={this.handleStopIgnition}>
                        <Text style={{ textAlign: 'center',  marginLeft: 22, color: 'white'}}>
                        Stop Ignition
                        </Text>
                        </Button>
                    </Col>
                  </Row>
                </Grid>
                <Button full style={{backgroundColor: 'purple', marginTop: 40}}  onPress={this.handleStopTrip}>
                    <Text style={{color: 'white'}}>End My Trip</Text>
                </Button>
            </Content>
          </Container>
        );
    }
}

const styles = StyleSheet.create({
    content: {
        backgroundColor: '#fff'
    },
    badge: { 
        height: 100, 
        width: 100, 
        borderRadius: 50,
        backgroundColor: 'lightgrey',
        margin: 10, 
    },
    controls : {
        height: 100, 
        width: 100, 
        borderRadius: 50,
        marginLeft: 20,
        marginTop: 30,
        backgroundColor: "rgba(130,4,150, 0.3)",
        borderWidth: 4,
        borderColor: "rgba(130,4,150, 0.5)",
    },
    header: {
        fontSize: 30,
        fontWeight: 'bold',
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

export default TripScreen;
import React, { Component } from 'react';
import {
  StyleSheet,
  Animated,
  View,
  Text,
  AsyncStorage,
} from 'react-native';
import { Container, Header, Content, Button, Item, Icon, Badge, Toast, Card } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { MapView } from 'expo';
import { Actions } from 'react-native-router-flux';

class ReservationScreen extends Component {
    constructor(props) {
        super(props)
    };

    renderBatteryRemaining = (battery) => {
        switch(true) {
            case battery.percentRemaining === 0:
            return (<Icon type='FontAwesome' name='battery-empty'/>);
            break;
            case battery.percentRemaining <= 0.25:
            return (<Icon type='FontAwesome' name='battery-quarter'/>);
            break;
            case battery.percentRemaining <= 0.5:
            return (<Icon type='FontAwesome' name='battery-half'/>);
            break;
            case battery.percentRemaining < 1.0:
            return (<Icon type='FontAwesome' name='battery-three-quarters'/>);
            break;
            default:
            return (<Icon type='FontAwesome' name='battery-full'/>);
        }
    }

    handleLock = async () => {
        const {rid, marker } = this.props
        // show toast
        Toast.show({
            text: "Vehicle locked!",
            buttonText: "Okay",
            duration: 3000
        })
        // lock vehicle
        let token = await AsyncStorage.getItem('token')
        const response = await fetch('https://b6301cca.ngrok.io/vehicles/' + marker.id + '/action', {
            headers: {
                'content-type': 'application/json',
                authorization: `bearer ${token}`
            },
            method: 'post',
            body: JSON.stringify({
                action: "LOCK"
            })
        }).then(res => res.json())
        console.log('lock result', response)
    }

    handleUnlock = async () => {
        const {rid, marker } = this.props
        // show toast
        Toast.show({
            text: "Vehicle unlocked!",
            buttonText: "Okay",
            duration: 3000
        })
        // unlock vehicle
        let token = await AsyncStorage.getItem('token')
        const response = await fetch('https://b6301cca.ngrok.io/vehicles/' + marker.id + '/action', {
            headers: {
                'content-type': 'application/json',
                authorization: `bearer ${token}`
            },
            method: 'post',
            body: JSON.stringify({
                action: "UNLOCK"
            })
        }).then(res => res.json())
        console.log('unlock result', response)
    }

    // start Trip
    handleStartTrip = async () => {
        const {rid, marker } = this.props
        // Show toast
        Toast.show({
            text: "Trip started! Please start ignition.",
            buttonText: "Okay",
            duration: 3000
        })
        console.log(`marker ${marker.id} rid ${rid.id}`)
        // start reservation
        let token = await AsyncStorage.getItem('token')
        const response = await fetch('https://b6301cca.ngrok.io/vehicles/' + marker.id + '/reservation/' + rid.id, {
            headers: {
                'content-type': 'application/json',
                authorization: `bearer ${token}`
            },
            method: 'put',
            body: JSON.stringify({action: "START"})
        }).then(res => res.json())
        // show ignition buttons
        this.setState({ tripStarted: true })
        console.log('final res', response)
    }

    handleBeginTrip = async () => {
        const { rid, marker } = this.props
        // show toast
        Toast.show({
            text: "You're ready to drive!",
            buttonText: "Okay",
            duration: 3000
        })
        // Start Trip
        this.handleStartTrip()
        // navigate to trip screen
        Actions.trip({ marker, rid })
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
                  <Row>
                      <Col>
                        <Button full onPress={this.handleLock} style={{backgroundColor: "rgba(130,4,150, 0.3)",}}>
                            <Icon type='FontAwesome' name='lock'/>
                            <Text>Lock</Text>
                        </Button>
                      </Col>
                      <Col>
                        <Button full onPress={this.handleUnlock} style={{backgroundColor: "rgba(130,4,150, 0.3)",}}>
                            <Icon type='FontAwesome' name='unlock'/>
                            <Text>Unlock</Text>
                        </Button>
                      </Col>
                  </Row>
                  <Card style={{marginTop: 20, marginBottom: 20, paddingTop: 40, paddingBottom: 40}}>
                  <Text style={{fontWeight: 'bold', textAlign: 'center', marginBottom: 10}}>PLEASE NOTE</Text>
                  <Text>You have 10 minutes to locate and unlock your Drib - otherwise, your reservation will be released.</Text>
                  </Card>
                  <Button full primary onPress={this.handleBeginTrip} style={{backgroundColor: 'purple'}}><Text style={{color: 'white'}}>Begin Trip</Text></Button>
                </Grid>
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

export default ReservationScreen;
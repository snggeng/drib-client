import React, { Component } from 'react';
import {
  StyleSheet,
  Animated,
  View,
  Text,
  AsyncStorage,
} from 'react-native';
import { Container, Header, Content, Button, Item, Icon, Badge } from 'native-base';
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

          // start reservation
    handleStartReservation = async () => {
        const {rid, marker } = this.props
        console.log(`marker ${marker.id} rid ${rid.id}`)
        let token = await AsyncStorage.getItem('token')
        const response = await fetch('https://c39f00b9.ngrok.io/vehicles/' + marker.id + '/reservation/' + rid.id, {
            headers: {
                'content-type': 'application/json',
                authorization: `bearer ${token}`
            },
            method: 'put',
            body: JSON.stringify({action: "START"})
        }).then(res => res.json())
        console.log('final res', response)
    }

    handleStopReservation = async () => {
        const {rid, marker } = this.props
        let token = await AsyncStorage.getItem('token')
        const response = await fetch('https://c39f00b9.ngrok.io/vehicles/' + marker.id + '/reservation/' + rid.id, {
            headers: {
                'content-type': 'application/json',
                authorization: `bearer ${token}`
            },
            method: 'put',
            body: JSON.stringify({action: "END"})
        }).then(res => res.json())
        console.log('final res', response)
    }

    handleLock = async () => {
        const {rid, marker } = this.props
        let token = await AsyncStorage.getItem('token')
        const lockRes = await fetch('https://c39f00b9.ngrok.io/vehicles/' + marker.id + '/action', {
            headers: {
                'content-type': 'application/json',
                authorization: `bearer ${token}`
            },
            method: 'post',
            body: JSON.stringify({
                action: "LOCK"
            })
        }).then(res => res.json())
        console.log(lockRes)
    }

    handleUnlock = async () => {
        const {rid, marker } = this.props
        let token = await AsyncStorage.getItem('token')
        const lockRes = await fetch('https://c39f00b9.ngrok.io/vehicles/' + marker.id + '/action', {
            headers: {
                'content-type': 'application/json',
                authorization: `bearer ${token}`
            },
            method: 'post',
            body: JSON.stringify({
                action: "UNLOCK"
            })
        }).then(res => res.json())
        console.log(lockRes)
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
                    <Col>
                        <Row>
                        <Text>{marker.vin}</Text>
                        </Row>
                    </Col>
                  </Row>
                  <Row>
                  <Button large onPress={this.handleStartReservation}><Text>Start Trip</Text></Button>
                  <Button large onPress={this.handleStopReservation}><Text>Stop Trip</Text></Button>
                  <Button large onPress={this.handleLock}><Text>Lock</Text></Button>
                  <Button large onPress={this.handleUnlock}><Text>Unlock</Text></Button>
                  </Row>
                  <Row>
                    <Col style={{ backgroundColor: '#635DB7' }}> 
                        <Button><Text>Honk Horn</Text></Button>
                    </Col>
                    <Col style={{ backgroundColor: '#00CE9F' }}>
                        <Button><Text>Flash Lights</Text></Button>
                    </Col>
                    <Col style={{ backgroundColor: '#00CE9F' }}>
                        <Button><Text>Map to Drib</Text></Button>
                    </Col>
                  </Row>
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
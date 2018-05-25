import React, { Component } from 'react';
import {
  StyleSheet,
  Animated,
  View,
  Text,
  AsyncStorage,
} from 'react-native';
import { Container, Header, Content, Button, Item, Icon, Badge, Toast } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { MapView } from 'expo';
import { Actions } from 'react-native-router-flux';

class VehicleScreen extends Component {
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

    handleReserve = async () => {
        const token = await AsyncStorage.getItem('token')
        const { marker } = this.props
        // Show toast
        Toast.show({
            text: "Vehicle reserved!",
            buttonText: "Okay",
            duration: 3000
        })
        // create reservation
        const rid = await fetch('https://b6301cca.ngrok.io/vehicles/' + marker.id + '/reservation', {
            headers: {
                authorization: `bearer ${token}`
            },
            method: 'post',
            body: JSON.stringify({
                vehicleId: marker.id
            })
        }).then(res => res.json())
        // navigate to reservation
        Actions.reservation({ marker, rid })
        console.log('rid', rid)
    }

    render() {
        const { marker } = this.props
        return (
          <Container>
            <MapView
                style={{ height: 200 }}
                initialRegion={{
                    latitude: marker.location.latitude,
                    longitude: marker.location.longitude,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
                showsMyLocationButton={true}
                showsUserLocation={true}
                >
                    <MapView.Marker
                        key={1}
                        coordinate={marker.location}
                        title={marker.info.make}
                        marker={marker}
                        description={`${marker.info.model} ${marker.info.year}`}
                    >
                        <Animated.View style={styles.markerWrap}>
                        <Animated.View style={styles.ring} />
                        <View style={styles.marker}/>
                        </Animated.View>
                    </MapView.Marker>
                </MapView>
                <Content style={styles.content}>
                    <Text style={styles.subheader}>RESERVE THIS DRIB</Text>
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
                  <Button primary full style={{backgroundColor: 'purple'}} onPress={this.handleReserve}><Text style={{color: 'white'}}>Reserve</Text></Button>
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
        backgroundColor: "darkorchid"
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

export default VehicleScreen;
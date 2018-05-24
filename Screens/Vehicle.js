import React, { Component } from 'react';
import {
  StyleSheet,
  Animated,
  View,
} from 'react-native';
import { Container, Header, Content, Button, Text, Item, } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { MapView } from 'expo';
import { Actions } from 'react-native-router-flux';

class VehicleScreen extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        const { marker } = this.props
        return (
          <Container>
            <MapView
                style={{ flex: 1 }}
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
                <Content>
                    <Text style={styles.subheader}>RESERVE THIS DRIB</Text>
                    <Text style={styles.header}>{marker.title}</Text>
                <Grid>
                  <Col style={{ backgroundColor: '#635DB7', height: 200 }}> 
                    <Text>{`${marker.info.make} \n ${marker.info.model} ${marker.info.year}`}</Text>
                  </Col>
                  <Col style={{ backgroundColor: '#00CE9F', height: 200 }}>
                    <Text> {marker.battery.percentRemaining}</Text>
                  </Col>
                </Grid>
            </Content>
          </Container>
        );
    }
}

const styles = StyleSheet.create({
    header: {
        fontSize: 40,
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

export default VehicleScreen;
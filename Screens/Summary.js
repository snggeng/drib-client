import React, { Component } from 'react';
import {
  StyleSheet,
  Animated,
  View,
  Text,
  AsyncStorage,
} from 'react-native';
import { Container, Header, Content, Button, Item, Icon, Badge, Toast, Footer, Card } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { MapView } from 'expo';
import { Actions } from 'react-native-router-flux';

class SummaryScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            tripStarted: false,
        }
    };


    render() {
        const { marker, rid } = this.props
        return (
          <Container>
                <Content style={styles.content}>
                <Header>
                    <Text style={styles.header}>Thanks for using Drib!</Text>
                </Header>
                <Card style={{padding: 10}}>
                    <Text>START</Text>
                    <Text>Palo Alto</Text>
                    <Text>END</Text>
                    <Text>Mountain View</Text>
                </Card>
                {/* <Button full style={{backgroundColor: 'purple'}} onPress={this.handleStopTrip}>
                    <Text style={{color: 'white'}}>End My Trip</Text>
                </Button> */}
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
        // backgroundColor: '#fff'
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

export default SummaryScreen;
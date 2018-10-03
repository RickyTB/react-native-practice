import React, {Component, Fragment} from 'react';
import {Button, StyleSheet, View, Dimensions} from "react-native";
import MapView from 'react-native-maps';

class PickLocation extends Component {

    state = {
        focusedLocation: {
            latitude: -0.1786081,
            longitude: -78.4896321,
            latitudeDelta: 0.0122,
            longitudeDelta: Dimensions.get('window').width / Dimensions.get('window').height * 0.0122
        }
    };

    render() {
        return (
            <Fragment>
                <MapView initialRegion={this.state.focusedLocation} style={styles.map}/>
                <View style={styles.button}>
                    <Button title="Locate me" onPress={() => alert('Pick Location!')}/>
                </View>
            </Fragment>
        );
    }

}

const styles = StyleSheet.create({
    map: {
        width: '100%',
        height: 250
    },
    button: {
        margin: 8
    }
});

export default PickLocation;
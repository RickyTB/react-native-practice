import React, {Component} from 'react';
import {View, Image, Text, StyleSheet, TouchableOpacity, Platform} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {connect} from "react-redux";

import * as actions from '../../store/actions';

class PlaceDetail extends Component {

    constructor(props) {
        super(props);
        this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent);
    }

    onNavigatorEvent = event => {
        if (event.type === "NavBarButtonPress") {
            if (event.id === "deletePlaceButton") {
                this.placeDeletedHandler();
            }
        }
    };

    placeDeletedHandler = () => {
        this.props.onDeletePlace(this.props.selectedPlace.key);
        this.props.navigator.pop();
    };

    render() {
        return (
            <View style={styles.container}>
                <Image source={this.props.selectedPlace.image} style={styles.placeImage}/>
                <Text style={styles.placeName}>{this.props.selectedPlace.name}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        margin: 22,
        flex: 1,
        justifyContent: 'center'
    },
    placeImage: {
        maxWidth: '100%',
        height: '100%'
    },
    placeName: {
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 28
    }
});

export default connect(null, {
    onDeletePlace: actions.deletePlace
})(PlaceDetail);
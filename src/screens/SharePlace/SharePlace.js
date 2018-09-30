import React, {Component} from 'react';
import {connect} from "react-redux";
import {View, Button, StyleSheet, ScrollView} from "react-native";

import * as actions from '../../store/actions';
import MainText from "../../components/UI/MainText/MainText";
import HeadingText from "../../components/UI/HeadingText/HeadingText";
import PlaceInput from "../../components/PlaceInput/PlaceInput";
import PickImage from "../../components/PickImage/PickImage";
import PickLocation from "../../components/PickLocation/PickLocation";

class SharePlaceScreen extends Component {

    static navigatorStyle = {
        navBarButtonColor: 'orange'
    };

    state = {
        placeName: ''
    };

    constructor(props) {
        super(props);
        this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent);
    }

    onNavigatorEvent = event => {
        if (event.type === "NavBarButtonPress") {
            if (event.id === "sideDrawerToggle") {
                this.props.navigator.toggleDrawer({
                    side: 'left'
                });
            }
        }
    };

    placeAddedHandler = () => {
        if (this.state.placeName.trim() !== '') {
            this.props.onAddPlace(this.state.placeName);
        }
    };

    placeNameChangedHandler = value => {
        this.setState({placeName: value});
    };

    render() {
        return (
            <ScrollView>
                <View style={styles.container}>
                    <MainText>
                        <HeadingText>Share a place with us!</HeadingText>
                    </MainText>
                    <PickImage/>
                    <PickLocation/>
                    <PlaceInput placeName={this.state.placeName} onChangeText={this.placeNameChangedHandler}/>
                    <View style={styles.button}>
                        <Button title="Share the place!" onPress={this.placeAddedHandler}/>
                    </View>
                </View>
            </ScrollView>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center'
    },
    placeholder: {
        borderWidth: 1,
        borderColor: 'black',
        backgroundColor: '#eee',
        width: '80%',
        height: 150
    },
    button: {
        margin: 8
    }
});

export default connect(null, {
    onAddPlace: actions.addPlace
})(SharePlaceScreen);
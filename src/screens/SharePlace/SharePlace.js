import React, {Component} from 'react';
import {connect} from "react-redux";
import {Text, View} from "react-native";

import PlaceInput from '../../components/PlaceInput/PlaceInput';
import * as actions from '../../store/actions';

class SharePlaceScreen extends Component {

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

    placeAddedHandler = placeName => {
        this.props.onAddPlace(placeName)
    };

    render() {
        return (
            <View>
                <PlaceInput onPlaceAdded={this.placeAddedHandler}/>
            </View>
        );
    }

}

export default connect(null, {
    onAddPlace: actions.addPlace
})(SharePlaceScreen);
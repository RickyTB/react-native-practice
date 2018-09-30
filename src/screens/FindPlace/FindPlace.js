import React, {Component} from 'react';
import {Platform, Text, View, TouchableOpacity, StyleSheet} from "react-native";
import {connect} from "react-redux";

import PlaceList from '../../components/PlaceList/PlaceList';
import Icon from "react-native-vector-icons/Ionicons";

class FindPlaceScreen extends Component {

    static navigatorStyle = {
        navBarButtonColor: 'orange'
    };

    state = {
        placesLoaded: false
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

    itemSelectedHandler = key => {
        Icon.getImageSource(Platform.OS === "android" ? "md-trash" : "ios-trash", 30)
            .then(icon => {
                const selectedPlace = this.props.places.find(place => place.key === key);
                this.props.navigator.push({
                    screen: 'awesome-places.PlaceDetailScreen',
                    title: selectedPlace.name,
                    passProps: {
                        selectedPlace
                    },
                    navigatorButtons: {
                        rightButtons: [
                            {
                                icon: icon,
                                title: 'Delete',
                                id: 'deletePlaceButton'
                            }
                        ]
                    }
                });
            });
    };

    placesSearchHandler = () => {
        this.setState({placesLoaded: true});
    };

    render() {
        let content = (
            <TouchableOpacity onPress={this.placesSearchHandler}>
                <View style={styles.searchButton}>
                    <Text style={styles.searchButtonText}>Find Places</Text>
                </View>
            </TouchableOpacity>
        );

        if (this.state.placesLoaded) {
            content = (
                <PlaceList places={this.props.places} onItemSelected={this.itemSelectedHandler}/>
            );
        }

        return (
            <View style={this.state.placesLoaded ? null : styles.buttonContainer}>
                {content}
            </View>
        );
    }

}

const styles = StyleSheet.create({
    buttonContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    searchButton: {
        borderColor: 'orange',
        borderWidth: 3,
        borderRadius: 50,
        padding: 20
    },
    searchButtonText: {
        color: 'orange',
        fontWeight: 'bold',
        fontSize: 26
    }
});

const mapStateToProps = state => {
    return {
        places: state.places.places
    };
};

export default connect(mapStateToProps)(FindPlaceScreen);
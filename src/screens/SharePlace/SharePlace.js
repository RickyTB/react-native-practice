import React, {Component} from 'react';
import {connect} from "react-redux";
import {View, Button, StyleSheet, ScrollView} from "react-native";

import * as actions from '../../store/actions';
import MainText from "../../components/UI/MainText/MainText";
import HeadingText from "../../components/UI/HeadingText/HeadingText";
import PlaceInput from "../../components/PlaceInput/PlaceInput";
import PickImage from "../../components/PickImage/PickImage";
import PickLocation from "../../components/PickLocation/PickLocation";
import validate from '../../utility/validation';

class SharePlaceScreen extends Component {

    static navigatorStyle = {
        navBarButtonColor: 'orange'
    };

    state = {
        controls: {
            placeName: {
                value: '',
                valid: false,
                touched: false,
                validationRules: {
                    notEmpty: true
                }
            }
        }
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
        if (this.state.controls.placeName.valid) {
            this.props.onAddPlace(this.state.controls.placeName.value);
            this.setState(prevState => {
                return {
                    controls: {
                        ...prevState.controls,
                        placeName: {
                            ...prevState.controls.placeName,
                            value: '',
                            valid: false,
                            touched: false
                        }
                    }
                };
            })
        }
    };

    placeNameChangedHandler = value => {
        this.setState(prevState => {
            return {
                controls: {
                    ...prevState.controls,
                    placeName: {
                        ...prevState.controls.placeName,
                        value: value,
                        valid: validate(value, prevState.controls.placeName.validationRules),
                        touched: true
                    }
                }
            }
        });
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
                    <PlaceInput placeData={this.state.controls.placeName}
                                onChangeText={this.placeNameChangedHandler}/>
                    <View style={styles.button}>
                        <Button disabled={!this.state.controls.placeName.valid} title="Share the place!"
                                onPress={this.placeAddedHandler}/>
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
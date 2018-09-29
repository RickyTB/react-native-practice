import * as actionTypes from '../actions/actionTypes';

const initialState = {
    places: []
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_PLACE:
            return {
                ...state,
                places: state.places.concat({
                    key: `${Math.random()}`,
                    name: action.placeName,
                    image: {
                        uri: 'https://www.buenplan.co/pictures/events/u7GctIdHVw.jpg'
                    }
                })
            };
        case actionTypes.DELETE_PLACE:
            return {
                ...state,
                places: state.places.filter(place => place.key !== action.placeKey)
            };
        default:
            return state;
    }
};

export default reducer;
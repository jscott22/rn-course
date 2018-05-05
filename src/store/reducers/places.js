import {
  ADD_PLACE,
  DELETE_PLACE,
  SELECT_PLACE,
  DESELECT_PLACE
} from "../constants";

const initialState = {
  places: [],
  selectedPlace: null
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case ADD_PLACE:
      console.log(payload);
      return {
        ...state,
        places: state.places.concat({
          key: Math.random().toString(),
          name: payload,
          image: require("../../assets/place.jpg")
        })
      };
    case SELECT_PLACE:
      return {
        ...state,
        selectedPlace: state.places.find(p => p.key === payload)
      };
    case DELETE_PLACE:
      return {
        places: state.places.filter(
          place => place.key !== state.selectedPlace.key
        ),
        selectedPlace: null
      };
    case DESELECT_PLACE:
      return {
        ...state,
        selectedPlace: null
      };
    default:
      return state;
  }
};

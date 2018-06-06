import { SET_PLACES, REMOVE_PLACE } from "../constants";

const initialState = {
  places: []
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_PLACES:
      return {
        ...state,
        places: payload
      };
    case REMOVE_PLACE:
      return {
        ...state,
        places: state.places.filter(place => place.key !== payload)
      };
    default:
      return state;
  }
};

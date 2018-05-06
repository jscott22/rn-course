import { ADD_PLACE, DELETE_PLACE } from "../constants";

const initialState = {
  places: []
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
    case DELETE_PLACE:
      return {
        places: state.places.filter(place => place.key !== payload)
      };
    default:
      return state;
  }
};

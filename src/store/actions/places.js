import { ADD_PLACE, DELETE_PLACE } from "../constants";

export const addPlace = placeName => {
  console.log(placeName);
  return {
    type: ADD_PLACE,
    payload: placeName
  };
};

export const deletePlace = key => ({
  type: DELETE_PLACE,
  payload: key
});

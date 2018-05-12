import { ADD_PLACE, DELETE_PLACE } from "../constants";

export const addPlace = placeInfo => {
  return {
    type: ADD_PLACE,
    payload: placeInfo
  };
};

export const deletePlace = key => ({
  type: DELETE_PLACE,
  payload: key
});

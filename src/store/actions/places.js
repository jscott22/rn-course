import axios from "axios";
import * as firebase from "firebase";
import uuid from "uuid";

import { uiStartLoading, uiStopLoading, authGetToken } from "./";

import { SET_PLACES, REMOVE_PLACE } from "../constants";

export const deletePlace = key => async dispatch => {
  try {
    dispatch(removePlace(key));
    await axios.delete(
      `https://rn-course-1526065110578.firebaseio.com/places/${key}.json`
    );
  } catch (err) {
    alert("Something went wrong :(");
  }
};

export const removePlace = key => ({
  type: REMOVE_PLACE,
  payload: key
});

export const getPlaces = () => async (dispatch, getState) => {
  try {
    const token = await dispatch(authGetToken());
    const { data } = await axios.get(
      "https://rn-course-1526065110578.firebaseio.com/places.json?auth=" + token
    );
    if (data !== null) {
      const mapped = Object.keys(data).map(key => ({
        ...data[key],
        key: key,
        image: {
          uri: data[key].image
        }
      }));
      dispatch(setPlaces(mapped));
    }
  } catch (err) {
    alert("Something went wrong :(");
    console.error(err);
  }
};

export const setPlaces = places => ({
  type: SET_PLACES,
  payload: places
});

export const addPlace = ({ placeName, location, image }) => async dispatch => {
  try {
    dispatch(uiStartLoading());
    const imgResponse = await fetch(image.uri);
    const blob = await imgResponse.blob();

    const imageId = uuid.v4();

    const ref = firebase
      .storage()
      .ref()
      .child(imageId);

    const imageSnapshot = await ref.put(blob);
    const dbSnapshot = firebase.database().ref("/places");
    const newPlaceRef = dbSnapshot.push();

    await newPlaceRef.set({
      name: placeName,
      location,
      image: `https://firebasestorage.googleapis.com/v0/b/rn-course-1526065110578.appspot.com/o/${
        imageSnapshot.ref.name
      }?alt=media&token=${imageId}/`
    });
    dispatch(uiStopLoading());
  } catch (err) {
    alert("Something went wrong :(");
    console.warn(err);
    dispatch(uiStopLoading);
  }
};

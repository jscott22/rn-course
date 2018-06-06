import * as firebase from "firebase";
import { TRY_AUTH, AUTH_SET_TOKEN } from "../constants";

import { uiStartLoading, uiStopLoading } from "./ui";

import startMainTabs from "../../screens/MainTabs/startMainTabs";

export const tryAuth = ({ email, password }, authMode) => async dispatch => {
  try {
    dispatch(uiStartLoading());
    let user;

    if (authMode === "login") {
      user = await firebase.auth().signInWithEmailAndPassword(email, password);
    } else {
      const user = await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password);
    }
    const token = await firebase.auth().currentUser.getIdToken();
    dispatch(authSetToken(token));
    dispatch(uiStopLoading());
    startMainTabs();
  } catch (err) {
    dispatch(uiStopLoading());
    console.warn(err);
    alert("Auth failed, try again");
  }
};

export const authSetToken = token => ({
  type: AUTH_SET_TOKEN,
  payload: token
});

export const authGetToken = () => (dispatch, getState) => {
  return new Promise((resolve, reject) => {
    const token = getState().auth.token;
    if (!token) {
      reject();
    } else {
      resolve(token);
    }
  });
};

// export const authLogIn = ({ email, password }) => async dispatch => {
//   try {
//     dispatch(uiStartLoading());
//     const user = await firebase
//       .auth()
//       .signInWithEmailAndPassword(email, password);
//     const token = await firebase.auth().currentUser.getIdToken();
//     console.log(token);
//     dispatch(uiStopLoading());
//   } catch (err) {
//     dispatch(uiStopLoading());
//     console.error(err);
//     alert("Auth failed, try again");
//   }
// };

// export const authSignUp = ({ email, password }) => async dispatch => {
//   try {
//     dispatch(uiStartLoading());
//     const token = await firebase
//       .auth()
//       .createUserWithEmailAndPassword(email, password);
//     dispatch(uiStopLoading());
//   } catch (err) {
//     dispatch(uiStopLoading());
//     console.error(err);
//     alert("Auth failed, try again");
//   }
// };

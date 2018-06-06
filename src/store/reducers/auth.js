import { AUTH_SET_TOKEN } from "../constants";

export default (state = {}, { type, payload }) => {
  switch (type) {
    case AUTH_SET_TOKEN:
      return {
        ...state,
        token: payload
      };
    default:
      return state;
  }
};

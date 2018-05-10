import { TRY_AUTH } from "../constants";

export const tryAuth = authData => ({
  type: TRY_AUTH,
  payload: authData
});

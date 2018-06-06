import * as firebase from "firebase";

import credentials from "./credentials";

const config = {
  ...credentials
};

firebase.initializeApp(config);

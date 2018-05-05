import React from "react";
import { AppRegistry } from "react-native";
import { Provider } from "react-redux";
import { YellowBox } from "react-native";

import store from "./src/store";
import App from "./App";

YellowBox.ignoreWarnings([
  "Warning: componentWillMount is deprecated",
  "Warning: componentWillUpdate is deprecated",
  "Warning: componentWillReceiveProps is deprecated"
]);

const ReactNativeCourse = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

AppRegistry.registerComponent("rncourse", () => ReactNativeCourse);

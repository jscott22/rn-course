import { Navigation } from "react-native-navigation";
import { Provider } from "react-redux";
import store from "./src/store";

import AuthScreen from "./src/screens/AuthScreen";
import SharePlaceScreen from "./src/screens/SharePlaceScreen";
import FindPlaceScreen from "./src/screens/FindPlaceScreen";
import PlaceDetailScreen from "./src/screens/PlaceDetailScreen";
import SideDrawer from "./src/screens/SideDrawer";

import "./firebase";

console.disableYellowBox = true;

//Register Screens
Navigation.registerComponent(
  "awesome-places.AuthScreen",
  () => AuthScreen,
  store,
  Provider
);
Navigation.registerComponent(
  "awesome-places.SharePlaceScreen",
  () => SharePlaceScreen,
  store,
  Provider
);
Navigation.registerComponent(
  "awesome-places.FindPlaceScreen",
  () => FindPlaceScreen,
  store,
  Provider
);
Navigation.registerComponent(
  "awesome-places.PlaceDetailScreen",
  () => PlaceDetailScreen,
  store,
  Provider
);
Navigation.registerComponent("awesome-places.SideDrawer", () => SideDrawer);

//Start the App
Navigation.startSingleScreenApp({
  screen: {
    screen: "awesome-places.AuthScreen"
  }
});

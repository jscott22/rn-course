import { Platform } from "react-native";
import { Navigation } from "react-native-navigation";
import Icon from "react-native-vector-icons/Ionicons";

const startTabs = async () => {
  const mapIcon = await Icon.getImageSource(
    Platform.OS === "android" ? "md-map" : "ios-map",
    30
  );
  const shareIcon = await Icon.getImageSource(
    Platform.OS === "android" ? "md-share-alt" : "ios-share-alt",
    30
  );
  const menuIcon = await Icon.getImageSource(
    Platform.OS === "android" ? "md-menu" : "ios-menu",
    30
  );
  Navigation.startTabBasedApp({
    tabs: [
      {
        screen: "awesome-places.FindPlaceScreen",
        label: "Find Places",
        title: "Find Places",
        icon: mapIcon,
        navigatorButtons: {
          leftButtons: [
            {
              icon: menuIcon,
              title: "Menu",
              id: "sideDrawerToggle"
            }
          ]
        }
      },
      {
        screen: "awesome-places.SharePlaceScreen",
        label: "Share Place",
        title: "Share Place",
        icon: shareIcon,
        navigatorButtons: {
          leftButtons: [
            {
              icon: menuIcon,
              title: "Menu",
              id: "sideDrawerToggle"
            }
          ]
        }
      }
    ],
    drawer: {
      left: {
        screen: "awesome-places.SideDrawer"
      }
    }
  });
};

export default startTabs;

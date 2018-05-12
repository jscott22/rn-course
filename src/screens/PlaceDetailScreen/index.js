import React, { PureComponent } from "react";
import {
  View,
  Image,
  TouchableOpacity,
  Platform,
  Dimensions,
  StyleSheet
} from "react-native";
import MapView from "react-native-maps";
import Icon from "react-native-vector-icons/Ionicons";

import { connect } from "react-redux";

import PlaceName from "./PlaceName";
import PlaceImage from "./PlaceImage";
import DeleteButton from "./DeleteButton";
import SubContainer from "./SubContainer";
import PlaceDetailWrapper from "./PlaceDetailWrapper";

import { deletePlace } from "../../store/actions/places";

class PlaceDetailScreen extends PureComponent {
  state = {
    portrait: Dimensions.get("window").height > 500
  };

  componentDidMount = () => {
    Dimensions.addEventListener("change", this.setViewMode);
  };

  componentWillUnmount = () => {
    Dimensions.removeEventListener("change", this.setViewMode);
  };

  setViewMode = () => {
    Dimensions.get("window").height > 500
      ? this.setState({ portrait: true })
      : this.setState({ portrait: false });
  };

  handleDeletePlace = () => {
    this.props.deletePlace(this.props.selectedPlace.key);
    this.props.navigator.pop();
  };

  render() {
    const { selectedPlace, onRequestClosed } = this.props;

    return (
      <PlaceDetailWrapper portrait={this.state.portrait}>
        <SubContainer>
          <PlaceImage source={selectedPlace.image} />
        </SubContainer>
        <SubContainer>
          <MapView
            initialRegion={{
              ...this.props.selectedPlace.location,
              latitudeDelta: 0.0122,
              longitudeDelta:
                Dimensions.get("window").width /
                Dimensions.get("window").height *
                0.0122
            }}
            style={styles.map}
          >
            <MapView.Marker coordinate={this.props.selectedPlace.location} />
          </MapView>
        </SubContainer>
        <SubContainer>
          <View>
            <PlaceName>{selectedPlace.name}</PlaceName>
          </View>
          <View>
            <TouchableOpacity>
              <DeleteButton>
                <Icon
                  size={30}
                  name={Platform.OS === "android" ? "md-trash" : "ios-trash"}
                  color="red"
                  onPress={this.handleDeletePlace}
                />
              </DeleteButton>
            </TouchableOpacity>
          </View>
        </SubContainer>
      </PlaceDetailWrapper>
    );
  }
}

const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject
  }
});

const actions = {
  deletePlace
};

export default connect(null, actions)(PlaceDetailScreen);

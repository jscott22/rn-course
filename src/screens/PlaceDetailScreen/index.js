import React, { PureComponent } from "react";
import {
  Modal,
  View,
  Image,
  Text,
  Button,
  TouchableOpacity,
  Platform,
  Dimensions,
  ScrollView,
  StyleSheet
} from "react-native";
import styled, { css } from "styled-components";

import { connect } from "react-redux";

import Icon from "react-native-vector-icons/Ionicons";

import { deletePlace } from "../../store/actions/places";

const PlaceName = styled.Text`
  font-weight: bold;
  text-align: center;
  font-size: 28px;
`;

const PlaceImage = styled.Image`
  height: 200px;
  width: 100%;
`;

const DetailContainer = styled.ScrollView.attrs({});

const DeleteButton = styled.View`
  align-items: center;
`;

const SubContainer = styled.View`
  flex: 1;
`;

const PlaceDetailWrapper = styled.View`
  ${({ portrait }) => {
    if (portrait) {
      return css`
        flex-direction: column;
        margin-top: 40px;
        padding: 20px;
        flex: 1;
      `;
    }
    return css`
      flex-direction: row;
      margin-top: 40px;
      padding: 20px;
      flex: 1;
    `;
  }};
`;

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
      <PlaceDetailWrapper portrat={this.state.portrait}>
        <SubContainer>
          <PlaceImage source={selectedPlace.image} />
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

const actions = {
  deletePlace
};

export default connect(null, actions)(PlaceDetailScreen);

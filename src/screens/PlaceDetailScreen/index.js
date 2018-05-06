import React, { PureComponent } from "react";
import {
  Modal,
  View,
  Image,
  Text,
  Button,
  TouchableOpacity,
  Platform,
  Dimensions
} from "react-native";
import styled from "styled-components";

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

const DetailContainer = styled.View`
  margin-top: 40px;
  padding: 20px;
`;

const DeleteButton = styled.View`
  align-items: center;
`;

class PlaceDetailScreen extends PureComponent {
  handleDeletePlace = () => {
    this.props.deletePlace(this.props.selectedPlace.key);
    this.props.navigator.pop();
  };

  render() {
    const { selectedPlace, onRequestClosed } = this.props;

    return (
      <DetailContainer>
        {selectedPlace ? (
          <View>
            <PlaceImage source={selectedPlace.image} />
            <PlaceName>{selectedPlace.name}</PlaceName>
          </View>
        ) : (
          ""
        )}
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
          <Button title="Close" onPress={onRequestClosed} />
        </View>
      </DetailContainer>
    );
  }
}

const actions = {
  deletePlace
};

export default connect(null, actions)(PlaceDetailScreen);

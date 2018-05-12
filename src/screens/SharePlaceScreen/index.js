import React, { PureComponent } from "react";
import { View, Text, Button, TextInput, ScrollView, Image } from "react-native";
import { connect } from "react-redux";
import styled from "styled-components";

import PlaceInput from "../../components/PlaceInput";
import PickImage from "../../components/PickImage";
import PickLocation from "../../components/PickLocation";

import DefaultInput from "../../components/UI/DefaultInput";
import HeadingText from "../../components/UI/HeadingText";
import MainText from "../../components/UI/MainText";
import ButtonWithBackground from "../../components/UI/ButtonWithBackground";

import { addPlace } from "../../store/actions/places";

import validate from "../../util/validation";

const Container = styled.View`
  flex: 1;
  align-items: center;
`;

const PlaceHolder = styled.View`
  border: 1px black;
  background: lightgray;
  height: 150px;
  width: 80%;
`;

const ButtonContainer = styled.View`
  margin: 8px;
`;

class SharePlaceScreen extends PureComponent {
  state = {
    controls: {
      placeName: {
        value: "",
        valid: false,
        touched: false,
        validationRules: {
          notEmpty: true
        }
      },
      location: {
        value: null,
        valid: false
      }
    }
  };

  componentDidMount() {
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent);
  }

  onNavigatorEvent = event => {
    if (event.type === "NavBarButtonPress") {
      if (event.id === "sideDrawerToggle") {
        this.props.navigator.toggleDrawer({
          side: "left"
        });
      }
    }
  };

  handlePlaceNameChange = value => {
    this.setState(prevState => ({
      controls: {
        ...prevState.controls,
        placeName: {
          ...prevState.controls.placeName,
          value,
          valid: validate(value, prevState.controls.placeName.validationRules),
          touched: true
        }
      }
    }));
  };

  handlePlaceSubmit = () => {
    this.props.addPlace({
      placeName: this.state.controls.placeName.value,
      location: this.state.controls.location.value
    });
  };

  handleLocationSelect = location => {
    this.setState(prevState => ({
      controls: {
        ...prevState.controls,
        location: {
          value: location,
          valid: true
        }
      }
    }));
  };

  render() {
    return (
      <ScrollView>
        <Container>
          <MainText>
            <HeadingText>Share a Place with us!</HeadingText>
          </MainText>
          <PickImage />
          <PickLocation onLocationSelect={this.handleLocationSelect} />
          <PlaceInput
            placeData={this.state.controls.placeName}
            handleChangeText={this.handlePlaceNameChange}
          />
          <ButtonContainer>
            <ButtonWithBackground
              onPress={this.handlePlaceSubmit}
              disabled={
                !this.state.controls.placeName.valid ||
                !this.state.controls.location.valid
              }
            >
              Share!
            </ButtonWithBackground>
          </ButtonContainer>
        </Container>
      </ScrollView>
    );
  }
}

const actions = {
  addPlace
};

export default connect(null, actions)(SharePlaceScreen);

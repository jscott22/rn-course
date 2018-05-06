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
    placeName: ""
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

  handlePlaceNameChange = val => {
    this.setState({
      placeName: val
    });
  };

  handlePlaceSubmit = () => {
    if (this.state.placeName.trim() === "") {
      return;
    }

    this.props.addPlace(this.state.placeName);
    this.setState({ placeName: "" });
  };

  render() {
    return (
      <ScrollView>
        <Container>
          <MainText>
            <HeadingText>Share a Place with us!</HeadingText>
          </MainText>
          <PickImage />
          <PickLocation />
          <PlaceInput
            value={this.state.placeName}
            onChangeText={this.handlePlaceNameChange}
          />
          <ButtonContainer>
            <ButtonWithBackground onPress={this.handlePlaceSubmit}>
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

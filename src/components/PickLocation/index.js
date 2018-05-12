import React, { PureComponent } from "react";
import { View, Text, Button, Dimensions } from "react-native";
import MapView from "react-native-maps";

import ButtonContainer from "./ButtonContainer";
import Placeholder from "./Placeholder";
import Container from "./Container";
import StyledMapView from "./StyledMapView";

class PickLocation extends PureComponent {
  state = {
    focusedLocation: {
      latitude: 37.7900352,
      longitude: -122.4013726,
      latitudeDelta: 0.0122,
      longitudeDelta:
        Dimensions.get("window").width /
        Dimensions.get("window").height *
        0.0122
    },
    locationChosen: false
  };

  pickLocation = event => {
    const { latitude, longitude } = event.nativeEvent.coordinate;
    this.map.animateToRegion({
      ...this.state.focusedLocation,
      latitude,
      longitude
    });
    this.setState(prevState => ({
      focusedLocation: {
        ...prevState.focusedLocation,
        latitude,
        longitude
      },
      locationChosen: true
    }));
    this.props.onLocationSelect({
      latitude,
      longitude
    });
  };

  getLocation = () => {
    navigator.geolocation.getCurrentPosition(
      pos => {
        this.pickLocation({
          nativeEvent: {
            coordinate: {
              latitude: pos.coords.latitude,
              longitude: pos.coords.longitude
            }
          }
        });
      },
      err => {
        console.warn(err);
      }
    );
  };

  render() {
    return (
      <Container>
        <StyledMapView
          initialRegion={this.state.focusedLocation}
          onPress={this.pickLocation}
          innerRef={ref => (this.map = ref)}
        >
          {this.state.locationChosen ? (
            <MapView.Marker coordinate={this.state.focusedLocation} />
          ) : null}
        </StyledMapView>
        <ButtonContainer>
          <Button title="Locate Me" onPress={this.getLocation} />
        </ButtonContainer>
      </Container>
    );
  }
}

export default PickLocation;

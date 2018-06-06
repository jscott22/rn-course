import React, { PureComponent } from "react";
import { View, Text, TouchableOpacity, Animated } from "react-native";
import { connect } from "react-redux";

import { getPlaces } from "../../store/actions";

import PlaceList from "../../components/PlaceList";

import {
  SearchButton,
  SearchButtonText,
  ButtonContainer
} from "./SearchButton";

class FindPlaceScreen extends PureComponent {
  state = {
    placesLoaded: false,
    removeAnim: new Animated.Value(1),
    placesAnim: new Animated.Value(0)
  };

  componentDidMount() {
    this.props.getPlaces();
  }

  handleItemSelected = key => {
    const selectedPlace = this.props.places.find(place => place.key === key);

    this.props.navigator.push({
      screen: "awesome-places.PlaceDetailScreen",
      title: selectedPlace.name,
      passProps: {
        selectedPlace
      }
    });
  };

  handlePlacesSearch = () => {
    Animated.timing(this.state.removeAnim, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true
    }).start(() => {
      this.setState({ placesLoaded: true });
      this.handlePlacesLoaded();
    });
  };

  handlePlacesLoaded = () => {
    Animated.timing(this.state.placesAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true
    }).start();
  };

  render() {
    return this.state.placesLoaded ? (
      <Animated.View
        style={{
          opacity: this.state.placesAnim
        }}
      >
        <View>
          <PlaceList
            places={this.props.places}
            onItemSelected={this.handleItemSelected}
          />
        </View>
      </Animated.View>
    ) : (
      <ButtonContainer>
        <Animated.View
          style={{
            opacity: this.state.removeAnim,
            transform: [
              {
                scale: this.state.removeAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [12, 1]
                })
              }
            ]
          }}
        >
          <TouchableOpacity onPress={this.handlePlacesSearch}>
            <SearchButton>
              <SearchButtonText>Find Places</SearchButtonText>
            </SearchButton>
          </TouchableOpacity>
        </Animated.View>
      </ButtonContainer>
    );
  }
}

const mapStateToProps = ({ places: { places } }) => ({ places });

export default connect(
  mapStateToProps,
  { getPlaces }
)(FindPlaceScreen);

import React, { PureComponent } from "react";
import { View, Text, TouchableOpacity, Animated } from "react-native";
import { connect } from "react-redux";
import styled from "styled-components";

import PlaceList from "../../components/PlaceList";

const SearchButton = styled.View`
  border-color: orange;
  border-width: 3px;
  padding: 20px;
  border-radius: 50px;
`;

const SearchButtonText = styled.Text`
  color: orange;
  font-weight: bold;
  font-size: 26px;
`;

const ButtonContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;
const ListContainer = styled.View``;

class FindPlaceScreen extends PureComponent {
  state = {
    placesLoaded: false,
    removeAnim: new Animated.Value(1),
    placesAnim: new Animated.Value(0)
  };

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
        <ListContainer>
          <PlaceList
            places={this.props.places}
            onItemSelected={this.handleItemSelected}
          />
        </ListContainer>
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

export default connect(mapStateToProps)(FindPlaceScreen);

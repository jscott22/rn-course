import React, { PureComponent } from "react";
import { View, Text } from "react-native";
import { connect } from "react-redux";

import PlaceList from "../../components/PlaceList";

class FindPlaceScreen extends PureComponent {
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

  render() {
    return (
      <View>
        <PlaceList
          places={this.props.places}
          onItemSelected={this.handleItemSelected}
        />
      </View>
    );
  }
}

const mapStateToProps = ({ places: { places } }) => ({ places });

export default connect(mapStateToProps)(FindPlaceScreen);

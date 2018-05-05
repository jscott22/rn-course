import React, { Component } from "react";
import { View, Button, TextInput, StyleSheet } from "react-native";

export default class PlaceInput extends Component {
  state = {
    placeName: ""
  };

  placeNameChanged = val => {
    this.setState({
      placeName: val
    });
  };

  placeSubmitHandler = () => {
    if (this.state.placeName.trim() === "") {
      return;
    }

    this.props.onPlaceSubmit(this.state.placeName);
    this.setState({ placeName: "" });
  };

  render() {
    return (
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.placeInput}
          placeholder="An awesome place"
          value={this.state.placeName}
          onChangeText={this.placeNameChanged}
        />
        <Button
          style={styles.placeButton}
          title="Add"
          onPress={this.placeSubmitHandler}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%"
  },
  placeInput: {
    width: "70%"
  },
  placeButton: {
    width: "30%"
  }
});

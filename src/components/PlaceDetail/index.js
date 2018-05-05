import React from "react";
import {
  Modal,
  View,
  Image,
  Text,
  Button,
  StyleSheet,
  TouchableOpacity
} from "react-native";

import Icon from "react-native-vector-icons/Ionicons";

export default ({ selectedPlace, onRequestClosed, onItemDeleted }) => {
  return (
    <Modal
      onRequestClose={onRequestClosed}
      visible={selectedPlace !== null}
      animationType="slide"
    >
      <View style={styles.modalContainer}>
        {selectedPlace ? (
          <View>
            <Image source={selectedPlace.image} style={styles.placeImage} />
            <Text style={styles.placeName}>{selectedPlace.name}</Text>
          </View>
        ) : (
          ""
        )}
        <View>
          <TouchableOpacity>
            <View style={styles.deleteButton}>
              <Icon
                size={30}
                name="ios-trash"
                color="red"
                onPress={onItemDeleted}
              />
            </View>
          </TouchableOpacity>
          <Button title="Close" onPress={onRequestClosed} />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    marginTop: 40,
    padding: 20
  },
  placeImage: {
    height: 200,
    width: "100%"
  },
  placeName: {
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 28
  },
  deleteButton: {
    alignItems: "center"
  }
});

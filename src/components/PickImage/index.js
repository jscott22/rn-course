import React, { PureComponent } from "react";
import { View, Image, Button } from "react-native";
import ImagePicker from "react-native-image-picker";
import styled from "styled-components";

import placeholderImage from "../../assets/place.jpg";

const Container = styled.View`
  width: 100%;
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

const PreviewImage = styled.Image`
  width: 100%;
  height: 100%;
`;

class PickImage extends PureComponent {
  state = {
    pickedImage: null
  };

  handleImagePicked = () => {
    ImagePicker.showImagePicker({ title: "Pick an Image" }, res => {
      if (res.didCancel) {
        console.log("User cancelled!");
      } else if (res.error) {
        console.warn("Error:", res.error);
      } else {
        this.setState({
          pickedImage: { uri: res.uri }
        });

        this.props.onImagePicked({ uri: res.uri, base64: res.data });
      }
    });
  };

  render() {
    return (
      <Container>
        <PlaceHolder>
          <PreviewImage source={this.state.pickedImage} />
        </PlaceHolder>
        <ButtonContainer>
          <Button title="Pick Image" onPress={this.handleImagePicked} />
        </ButtonContainer>
      </Container>
    );
  }
}

export default PickImage;

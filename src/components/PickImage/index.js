import React, { PureComponent } from "react";
import { View, Image, Button } from "react-native";
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
  render() {
    return (
      <Container>
        <PlaceHolder>
          <PreviewImage source={placeholderImage} />
        </PlaceHolder>
        <ButtonContainer>
          <Button title="Pick Image" onPress={() => "pick image"} />
        </ButtonContainer>
      </Container>
    );
  }
}

export default PickImage;

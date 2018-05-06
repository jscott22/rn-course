import React, { PureComponent } from "react";
import { View, Text, Button } from "react-native";
import styled from "styled-components";

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

class PickLocation extends PureComponent {
  render() {
    return (
      <Container>
        <PlaceHolder>
          <Text>Map</Text>
        </PlaceHolder>
        <ButtonContainer>
          <Button title="Locate Me" onPress={() => "Pick location"} />
        </ButtonContainer>
      </Container>
    );
  }
}

export default PickLocation;

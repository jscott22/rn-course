import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import styled from "styled-components";

const StyledListItem = styled.View`
  width: 100%;
  padding: 10px;
  background-color: #eee;
  margin: 5px;
  flex-direction: row;
  align-items: center;
`;

const PlaceImage = styled.Image`
  margin-right: 8px;
  height: 30px;
  width: 30px;
`;

export default ({ placeName, placeImage, onItemPressed }) => (
  <TouchableOpacity onPress={onItemPressed}>
    <StyledListItem>
      <PlaceImage source={placeImage} />
      <Text>{placeName}</Text>
    </StyledListItem>
  </TouchableOpacity>
);

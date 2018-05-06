import React from "react";
import { Text } from "react-native";
import styled from "styled-components";

const StyledText = styled.Text`
  font-size: 28px;
  font-weight: bold;
`;

const DefaultInput = props => (
  <StyledText {...props}>{props.children} </StyledText>
);

export default DefaultInput;

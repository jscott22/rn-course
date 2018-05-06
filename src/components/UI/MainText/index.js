import React from "react";
import { Text } from "react-native";
import styled from "styled-components";

const MainText = styled.Text`
  color: black;
`;

const DefaultInput = props => <MainText {...props}>{props.children}</MainText>;

export default DefaultInput;

import React from "react";
import {
  TouchableOpacity,
  TouchableNativeFeedback,
  Text,
  View,
  Platform
} from "react-native";
import styled, { css } from "styled-components";

const ButtonContent = styled.View`
  padding: 10px;
  margin: 5px;
  border-radius: 5;
  border: 1px #aaa;
  background-color: #eee;
`;

const StyledText = styled.Text`
  color: black;
`;

const ButtonWithBackground = props => {
  const content = (
    <ButtonContent>
      <StyledText>{props.children}</StyledText>
    </ButtonContent>
  );

  if (Platform.OS === "android") {
    return (
      <TouchableNativeFeedback onPress={props.onPress}>
        {content}
      </TouchableNativeFeedback>
    );
  }

  return <TouchableOpacity onPress={props.onPress}>{content}</TouchableOpacity>;
};

export default ButtonWithBackground;

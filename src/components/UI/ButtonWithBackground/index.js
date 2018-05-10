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
  background-color: ${({ disabled }) => (disabled ? "#fff" : "#eee")};
`;

const StyledText = styled.Text`
  color: ${({ disabled }) => (disabled ? "#aaa" : "black")};
`;

const ButtonWithBackground = props => {
  const content = (
    <ButtonContent disabled={props.disabled}>
      <StyledText disabled={props.disabled}>{props.children}</StyledText>
    </ButtonContent>
  );

  if (props.disabled) return content;

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

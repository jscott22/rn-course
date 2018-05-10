import React from "react";
import { TextInput } from "react-native";
import styled, { css } from "styled-components";

const StyledInput = styled.TextInput`
  width: 100%;
  border-width: 1px;
  border-color: ${({ invalid }) => (invalid ? "red" : "#eee")};
  background-color: ${({ invalid }) => (invalid ? "#f9c0c0" : "white")};
  padding: 5px;
  margin: 8px 0;
`;

const DefaultInput = props => (
  <StyledInput
    underlineColorAndroid="transparent"
    {...props}
    onChangeText={props.handleChangeText}
  />
);

export default DefaultInput;

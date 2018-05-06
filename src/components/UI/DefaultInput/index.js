import React from "react";
import { TextInput } from "react-native";
import styled from "styled-components";

const StyledInput = styled.TextInput`
  width: 100%;
  border: 1px #eee;
  background: white;
  padding: 5px;
  margin: 8px 0;
`;

const DefaultInput = props => (
  <StyledInput underlineColorAndroid="transparent" {...props} />
);

export default DefaultInput;

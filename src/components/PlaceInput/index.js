import React, { Component } from "react";

import DefaultInput from "../UI/DefaultInput";

export default ({ value, onChangeText }) => (
  <DefaultInput
    placeholder="Add place"
    value={value}
    onChangeText={onChangeText}
  />
);

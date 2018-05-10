import React, { Component } from "react";

import DefaultInput from "../UI/DefaultInput";

export default ({ placeData, handleChangeText }) => (
  <DefaultInput
    placeholder="Add place"
    value={placeData.value}
    invalid={!placeData.valid && placeData.touched}
    handleChangeText={handleChangeText}
  />
);

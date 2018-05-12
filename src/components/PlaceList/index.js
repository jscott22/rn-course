import React from "react";
import { FlatList } from "react-native";
import styled from "styled-components";

import ListItem from "../ListItem";

const StyledFlatList = styled.FlatList`
  width: 100%;
`;

export default ({ places, onItemSelected }) => {
  return (
    <StyledFlatList
      data={places}
      renderItem={info => (
        <ListItem
          placeName={info.item.name}
          placeImage={info.item.image}
          onItemPressed={() => onItemSelected(info.item.key)}
        />
      )}
    />
  );
};

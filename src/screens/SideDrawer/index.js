import React, { PureComponent } from "react";
import {
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  Platform
} from "react-native";
import styled from "styled-components";
import Icon from "react-native-vector-icons/Ionicons";

const StyledDrawer = styled.View`
  padding-top: 10%;
  background-color: white;
  flex: 1;
`;

const DrawItem = styled.View`
  flex-direction: row;
  align-items: center;
  padding: 10px;
  background-color: #eee;
`;

const DrawItemText = styled.Text`
  margin-left: 10px;
`;

class SideDrawer extends PureComponent {
  render() {
    return (
      <StyledDrawer
        style={{
          width: Dimensions.get("window").width * 0.8
        }}
      >
        <TouchableOpacity>
          <DrawItem>
            <Icon
              name={Platform.OS === "android" ? "md-log-out" : "ios-log-out"}
              size={30}
              color="#bbb"
            />
            <DrawItemText>Sign Out</DrawItemText>
          </DrawItem>
        </TouchableOpacity>
      </StyledDrawer>
    );
  }
}

export default SideDrawer;

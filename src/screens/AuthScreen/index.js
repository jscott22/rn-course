import React, { PureComponent } from "react";
import { View, Text, Button, ImageBackground, Dimensions } from "react-native";
import styled from "styled-components";

import startMainTabs from "../MainTabs/startMainTabs";

import DefaultInput from "../../components/UI/DefaultInput";
import HeadingText from "../../components/UI/HeadingText";
import MainText from "../../components/UI/MainText";
import ButtonWithBackground from "../../components/UI/ButtonWithBackground";

import backgroundImage from "../../assets/background.jpg";

const AuthContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const InputContainer = styled.View`
  width: 80%;
`;

const StyledBackground = styled.ImageBackground`
  width: 100%;
  flex: 1;
`;

class AuthScreen extends PureComponent {
  static navigatorStyle = {
    navBarHidden: true
  };

  loginHander = () => {
    startMainTabs();
  };

  render() {
    let headingText = null;
    if (Dimensions.get("window").height > 500) {
      headingText = (
        <MainText>
          <HeadingText>Please Log In</HeadingText>
        </MainText>
      );
    }

    return (
      <StyledBackground source={backgroundImage}>
        <AuthContainer>
          {headingText}
          <ButtonWithBackground>Switch To Login</ButtonWithBackground>
          <InputContainer>
            <DefaultInput placeholder="Email" />
            <DefaultInput placeholder="Password" />
            <DefaultInput placeholder="Confirm Password" />
          </InputContainer>
          <ButtonWithBackground title="Submit" onPress={this.loginHander}>
            Submit
          </ButtonWithBackground>
        </AuthContainer>
      </StyledBackground>
    );
  }
}

export default AuthScreen;

import React, { PureComponent } from "react";
import { View, Text, Button, ImageBackground, Dimensions } from "react-native";
import styled, { css } from "styled-components";

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

const PasswordWrapper = styled.View`
  ${({ portrait }) => {
    if (portrait)
      return css`
        width: 100%;
      `;
    return css`
      width: 48%;
    `;
  }};
`;

const PasswordContainer = styled.View`
  ${({ portrait }) => {
    if (portrait)
      return css`
        flex-direction: column;
        justify-content: flex-start;
      `;
    return css`
      flex-direction: row;
      justify-content: space-between;
    `;
  }};
`;

class AuthScreen extends PureComponent {
  static navigatorStyle = {
    navBarHidden: true
  };

  state = {
    portrait: Dimensions.get("window").height > 500
  };

  componentDidMount = () => {
    Dimensions.addEventListener("change", this.setViewMode);
  };

  componentWillUnmount = () => {
    Dimensions.removeEventListener("change", this.setViewMode);
  };

  setViewMode = () => {
    Dimensions.get("window").height > 500
      ? this.setState({ portrait: true })
      : this.setState({ portrait: false });
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

    const { portrait } = this.state;

    return (
      <StyledBackground source={backgroundImage}>
        <AuthContainer>
          {headingText}
          <ButtonWithBackground>Switch To Login</ButtonWithBackground>
          <InputContainer>
            <DefaultInput placeholder="Email" />
            <PasswordContainer portrait={portrait}>
              <PasswordWrapper portrait={portrait}>
                <DefaultInput placeholder="Password" />
              </PasswordWrapper>
              <PasswordWrapper portrait={portrait}>
                <DefaultInput placeholder="Confirm Password" />
              </PasswordWrapper>
            </PasswordContainer>
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

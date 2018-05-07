import React, { PureComponent } from "react";
import { View, Text, Button, ImageBackground, Dimensions } from "react-native";
import styled, { css } from "styled-components";

import startMainTabs from "../MainTabs/startMainTabs";

import DefaultInput from "../../components/UI/DefaultInput";
import HeadingText from "../../components/UI/HeadingText";
import MainText from "../../components/UI/MainText";
import ButtonWithBackground from "../../components/UI/ButtonWithBackground";

import AuthContainer from "./AuthContainer";
import Background from "./Background";
import InputContainer from "./InputContainer";
import PasswordContainer from "./PasswordContainer";
import PasswordWrapper from "./PasswordWrapper";

import validate from "../../util/validation";

import backgroundImage from "../../assets/background.jpg";

class AuthScreen extends PureComponent {
  static navigatorStyle = {
    navBarHidden: true
  };

  state = {
    portrait: Dimensions.get("window").height > 500,
    controls: {
      email: {
        value: "",
        valid: false,
        validationRules: {
          isEmail: true
        }
      },
      password: {
        value: "",
        valid: false,
        validationRules: {
          minLength: 6
        }
      },
      confirmPassword: {
        value: "",
        valid: false,
        validationRules: {
          equalTo: "password"
        }
      }
    }
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

  updateInputState = (key, value) => {
    let connectedValue = {};
    if (this.state.controls[key].validationRules.equalTo) {
      const equalControl = this.state.controls[key].validationRules.equalTo;
      const equalValue = this.state.controls[equalControl].value;

      connectedValue = {
        ...connectedValue,
        equalTo: equalValue
      };
    }

    this.setState(prevState => ({
      ...prevState,
      controls: {
        ...prevState.controls,
        [key]: {
          ...prevState.controls[key],
          value,
          valid: validate(
            value,
            prevState.controls[key].validationRules,
            connectedValue
          )
        }
      }
    }));
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

    const { portrait, controls } = this.state;

    return (
      <Background source={backgroundImage}>
        <AuthContainer>
          {headingText}
          <ButtonWithBackground>Switch To Login</ButtonWithBackground>
          <InputContainer>
            <DefaultInput
              placeholder="Email"
              value={controls.email}
              handleChangeText={value => this.updateInputState("email", value)}
            />
            <PasswordContainer portrait={portrait}>
              <PasswordWrapper portrait={portrait}>
                <DefaultInput
                  placeholder="Password"
                  value={controls.password}
                  handleChangeText={value =>
                    this.updateInputState("password", value)
                  }
                />
              </PasswordWrapper>
              <PasswordWrapper portrait={portrait}>
                <DefaultInput
                  placeholder="Confirm Password"
                  value={controls.confirmPassword}
                  handleChangeText={value =>
                    this.updateInputState("confirmPassword", value)
                  }
                />
              </PasswordWrapper>
            </PasswordContainer>
          </InputContainer>
          <ButtonWithBackground title="Submit" onPress={this.loginHander}>
            Submit
          </ButtonWithBackground>
        </AuthContainer>
      </Background>
    );
  }
}

export default AuthScreen;

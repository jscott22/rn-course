import React, { PureComponent } from "react";
import {
  View,
  Text,
  Button,
  ImageBackground,
  Dimensions,
  Keyboard,
  TouchableWithoutFeedback,
  ActivityIndicator
} from "react-native";
import styled, { css } from "styled-components";
import { connect } from "react-redux";

import { tryAuth } from "../../store/actions";

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
    authMode: "login",
    controls: {
      email: {
        value: "",
        valid: false,
        validationRules: {
          isEmail: true
        },
        touched: false
      },
      password: {
        value: "",
        valid: false,
        validationRules: {
          minLength: 6
        },
        touched: false
      },
      confirmPassword: {
        value: "",
        valid: false,
        validationRules: {
          equalTo: "password"
        },
        touched: false
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

  switchAuthMode = () => {
    this.setState(prevState => {
      return {
        authMode: prevState.authMode === "login" ? "signUp" : "login"
      };
    });
  };

  loginHandler = () => {
    const authData = {
      email: this.state.controls.email.value,
      password: this.state.controls.password.value
    };
    this.props.tryAuth(authData, this.state.authMode);
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
      controls: {
        ...prevState.controls,
        [key]: {
          ...prevState.controls[key],
          value,
          valid: validate(
            value,
            prevState.controls[key].validationRules,
            connectedValue
          ),
          touched: true
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

    const { portrait, controls, authMode } = this.state;

    return (
      <Background source={backgroundImage}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <AuthContainer behavior="padding">
            {headingText}
            <ButtonWithBackground onPress={this.switchAuthMode}>
              {authMode === "signUp" ? "Switch to Login" : "Switch to Sign Up"}
            </ButtonWithBackground>
            <InputContainer>
              <DefaultInput
                placeholder="Email"
                value={controls.email.value}
                handleChangeText={value =>
                  this.updateInputState("email", value)
                }
                invalid={!controls.email.valid && controls.email.touched}
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="email-address"
              />
              <PasswordContainer portrait={portrait}>
                <PasswordWrapper portrait={portrait} authMode={authMode}>
                  <DefaultInput
                    placeholder="Password"
                    value={controls.password.value}
                    handleChangeText={value =>
                      this.updateInputState("password", value)
                    }
                    invalid={
                      !controls.password.valid && controls.password.touched
                    }
                    secureTextEntry
                  />
                </PasswordWrapper>
                {authMode === "signUp" ? (
                  <PasswordWrapper portrait={portrait} authMode={authMode}>
                    <DefaultInput
                      placeholder="Confirm Password"
                      value={controls.confirmPassword.value}
                      handleChangeText={value =>
                        this.updateInputState("confirmPassword", value)
                      }
                      invalid={
                        !controls.confirmPassword.valid &&
                        controls.confirmPassword.touched
                      }
                      secureTextEntry
                    />
                  </PasswordWrapper>
                ) : null}
              </PasswordContainer>
            </InputContainer>
            {this.props.isLoading ? (
              <ActivityIndicator />
            ) : (
              <ButtonWithBackground
                title="Submit"
                onPress={this.loginHandler}
                disabled={
                  !this.state.controls.email.valid ||
                  !this.state.controls.password.valid ||
                  (!this.state.controls.confirmPassword.valid &&
                    this.state.authMode === "signUp")
                }
              >
                Submit
              </ButtonWithBackground>
            )}
          </AuthContainer>
        </TouchableWithoutFeedback>
      </Background>
    );
  }
}

const mapStateToProps = state => ({
  isLoading: state.ui.isLoading
});

const actions = {
  tryAuth
};

export default connect(
  mapStateToProps,
  actions
)(AuthScreen);

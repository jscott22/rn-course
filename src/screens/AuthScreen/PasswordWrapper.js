import styled, { css } from "styled-components";

const PasswordWrapper = styled.View`
  ${({ portrait, authMode }) => {
    if (!portrait && authMode === "signUp") {
      return css`
        width: 48%;
      `;
    }
    return css`
      width: 100%;
    `;
  }};
`;

export default PasswordWrapper;

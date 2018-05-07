import styled, { css } from "styled-components";

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

export default PasswordWrapper;

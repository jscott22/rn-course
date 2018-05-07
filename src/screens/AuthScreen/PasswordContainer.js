import styled, { css } from "styled-components";

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

export default PasswordContainer;

import styled, { css } from "styled-components";

const PlaceDetailWrapper = styled.View`
  ${({ portrait }) => {
    if (portrait) {
      return css`
        flex-direction: column;
        margin-top: 40px;
        padding: 20px;
        flex: 1;
      `;
    }
    return css`
      flex-direction: row;
      margin-top: 40px;
      padding: 20px;
      flex: 1;
    `;
  }};
`;

export default PlaceDetailWrapper;

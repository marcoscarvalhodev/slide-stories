import styled from "styled-components";

interface Elements {
  opacityValue: number;
}

export const StyledSlideElements = styled.div<Elements>`
  display: grid;

  & > * {
    grid-area: 1/1;
    opacity: ${({opacityValue}) => opacityValue};
    visibility: none;
  }
`
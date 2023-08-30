import styled from "styled-components";

interface Elements {
  $opacity_value: number;
}

export const StyledSlideElements = styled.div<Elements>`
  display: grid;

  & > * {
    grid-area: 1/1;
    opacity: ${({$opacity_value}) => $opacity_value};
    visibility: none;
  }
`
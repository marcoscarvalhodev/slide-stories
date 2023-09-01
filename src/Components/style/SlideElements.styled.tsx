import styled from "styled-components";

interface Elemented {
  $slide: number;
}

export const StyledSlideElements = styled.div<Elemented>`
  display: grid;
  grid-area: 1/1;
  & > * {
    grid-area: 1/1;
    opacity: 0;
  }

  & > :nth-child(${({ $slide }) => $slide}) {
    opacity: 1;
    visibility: visible;
  }
`;
import styled from "styled-components";

export const StyledSlideControls = styled.div`
  grid-area: 1/1;
  display: grid;
  grid-template-columns: 1fr 1fr;

  & button {
    opacity: 0;
    appearance: none;
    -webkit-tap-highlight-color: rgba(0,0,0,0);
  }
`
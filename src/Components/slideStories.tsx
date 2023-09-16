import React from "react";
import GlobalStyles from "./style/Global";
import SlideControls from "./SlideControls";
import { SlideParameters } from "./SlideParameters";
import SlideElements from "./SlideElements";
import { StyledSlideContainer } from "./style/SlideContainer.styled";

const SlideStories = () => {
  const [slideIndex, setSlideIndex] = React.useState(1);
  const refContainer = React.useRef<HTMLDivElement>(null);
  const refElements = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (refContainer.current && refElements.current) {
      SlideParameters(refContainer.current, refElements.current);
    }
  });

  return (
    <>
      <GlobalStyles />
      <h1>Gorilla Stories</h1>
      <StyledSlideContainer ref={refContainer}>
        <SlideElements ref={refElements} slide={slideIndex} />

        {refElements && (
          <SlideControls
            slide={slideIndex}
            slideState={setSlideIndex}
            slideElements={refElements}
            slideContainer={refContainer}
          />
        )}
        
      </StyledSlideContainer>
    </>
  );
};

export default SlideStories;

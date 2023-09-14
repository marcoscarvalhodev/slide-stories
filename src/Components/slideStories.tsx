import React from "react";
import GlobalStyles from "./style/Global";
import { StyledSlide } from "./style/Slide.styled";
import { StyledSlideElements } from "./style/SlideElements.styled";
import SlideControls from "./SlideControls";
import { contentImage, contentVideo } from "../content";
import { SlideParameters } from "./SlideParameters";
import SlideElements from "./SlideElements";


const SlideStories = () => {
  const [slideIndex, setSlideIndex] = React.useState(1);
  const refContainer = React.useRef<HTMLDivElement>(null);
  const refElements = React.useRef<HTMLDivElement>(null);
  
  
  React.useEffect(() => {
    if (refContainer.current && refElements.current) {
      SlideParameters(
        refContainer.current,
        refElements.current
      );
    }

  });


  return (
    <>
      <GlobalStyles />
      <h1>Gorilla Stories</h1>
      <StyledSlide ref={refContainer}>

        <SlideElements ref={refElements} slide={slideIndex}/>

       {refElements && <SlideControls
          slide={slideIndex}
          slideState={setSlideIndex}
          slideElements={refElements}
          slideContainer={refContainer}
        />}

      </StyledSlide>

    </>
  );
};

export default SlideStories;

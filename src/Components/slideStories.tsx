import React from "react";
import GlobalStyles from "./style/Global";
import { StyledSlide } from "./style/Slide.styled";
import { StyledSlideElements } from "./style/SlideElements.styled";
import SlideControls from "./SlideControls";
import { contentImage, contentVideo } from "../content";
import { SlideParameters } from "./SlideParameters";


const SlideStories = () => {
  const [slideIndex, setSlideIndex] = React.useState(1);
  const refContainer = React.useRef(null);
  const refElements = React.useRef(null);
  

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
        <StyledSlideElements ref={refElements} $slide={slideIndex}>
          {contentImage.map((item, index) => {
            return (
              <img
                key={item.id}
                src={`./assets/images/${item.srcImage}`}
                alt={item.altImage}
                title={item.altImage}
              />
            );
          })}
          {contentVideo.map((item, index) => {
            return (
              <video
                autoPlay
                playsInline
                muted
                loop
                key={item.id}
                src={`./assets/videos/${item.srcVideo}`}
              ></video>
            );
          })}
        </StyledSlideElements>

        <SlideControls
          slide={slideIndex}
          slideState={setSlideIndex}
          slideElements={refElements.current}
        />
      </StyledSlide>

    </>
  );
};

export default SlideStories;

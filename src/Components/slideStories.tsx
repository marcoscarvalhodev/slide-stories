import React from "react";
import { StyledSlide } from "./style/Slide.styled";
import { StyledSlideElements } from "./style/SlideElements.styled";
import { StyledSlideControls } from "./style/SlideControls.styled";
import { contentImage, contentVideo } from "../content";
import GlobalStyles from "./style/Global";
import { SlideParameters } from "./SlideParameters";

const SlideStories = () => {
  const [active, setActive] = React.useState(false);
  const refContainer = React.useRef(null);
  const refElements = React.useRef(null);
  const refControls = React.useRef(null);
  

  React.useEffect(() => {
    if(refContainer.current && refElements.current && refControls.current) {
      SlideParameters(refContainer.current, refElements.current, refControls.current)
    }
  })

  return (
    <>
      <GlobalStyles />
      <h1>Gorilla Stories</h1>
      <StyledSlide ref={refContainer}>
        <StyledSlideElements ref={refElements} $opacity_value={!active ? 0 : 1}>
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
        <StyledSlideControls ref={refControls}></StyledSlideControls>
      </StyledSlide>
    </>
  );
};

export default SlideStories;

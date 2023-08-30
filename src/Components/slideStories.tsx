import React from "react";
import { StyledSlide } from "./style/Slide.styled";
import { StyledSlideElements } from "./style/SlideElements.styled";
import { StyledSlideControls } from "./style/SlideControls.styled";
import { contentImage, contentVideo } from "../content";
import GlobalStyles from "./style/Global";

const SlideStories = () => {
  const [active, setActive] = React.useState(false);
  

  return (
    <>
      <GlobalStyles />
      <h1>Gorilla Stories</h1>
      <StyledSlide>
        <StyledSlideElements opacityValue={!active ? 0 : 1 }>
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
        <StyledSlideControls></StyledSlideControls>
      </StyledSlide>
    </>
  );
};

export default SlideStories;

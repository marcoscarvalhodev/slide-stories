import React from 'react';
import { StyledSlideElements } from './style/SlideElements.styled';
import { contentImage, contentVideo } from "../content";

interface elementsProps {
  slide: number;
}

const SlideElements = React.forwardRef<HTMLDivElement, elementsProps>((props, ref) => {

  return (
    <StyledSlideElements ref={ref} $slide={props.slide}>
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
                playsInline
                loop
                key={item.id}
                src={`./assets/videos/${item.srcVideo}`}
              ></video>
            );
          })}


    </StyledSlideElements>
  )
})

export default SlideElements
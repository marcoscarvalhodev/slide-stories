import React from "react";
import { StyledSlideControls } from "./style/SlideControls.styled";
import SlideTimeout from "./slideTimeout";

interface propsControlled {
  controls: React.MutableRefObject<null>;
  slide: number;
  slideState: React.Dispatch<React.SetStateAction<number>>;
  slideElements: HTMLElement | null;

}

const SlideControls : React.FC<propsControlled> = ({
  controls,
  slide,
  slideState,
  slideElements,

}) => {

  
  React.useEffect(() => {
    const slide = new SlideTimeout(() => nextSlide(), 6000);

    return () => {
      slide.clear()
    }
  })  
  

  const elements = slideElements?.children

   function prevSlide() {
    if(elements)
    if(slide > 1) {
      slideState(slide -1)
    } else {
      slideState(elements?.length)
    }
   }

   const nextSlide = () => {
    slideState(slide + 1)
    if(elements)
    if(slide < elements?.length) {
      slideState(slide + 1)
    } else {
      slideState(1)
    }
    
   }

  
  return (
    <StyledSlideControls ref={controls}>
      <button onPointerUp={prevSlide}>Previous Slide</button>
      <button onPointerUp={nextSlide}>Next Slide</button>
    </StyledSlideControls>
  );
};

export default SlideControls;

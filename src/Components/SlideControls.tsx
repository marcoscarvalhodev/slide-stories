import React from "react";
import { StyledSlideControls } from "./style/SlideControls.styled";
import SlideTimeout from "./slideTimeout";
import Slide from "./Slide";

interface propsControlled {
  slide: number;
  slideState: React.Dispatch<React.SetStateAction<number>>;
  slideElements: HTMLElement | null;

}

const SlideControls : React.FC<propsControlled> = ({
  slide,
  slideState,
  slideElements,

}) => {

  const [paused, setPaused] = React.useState(false)
  const refControls = React.useRef(null);


  React.useEffect(() => {
    const slide = new SlideTimeout(() => nextSlide(), 6000);
    
    return () => {
      slide.clear()
    }
  }) 
  

  const elements = slideElements?.children

   function prevSlide() {
    if(paused) return
    if(elements)
    if(slide > 1) {
      slideState(slide -1)
    } else {
      slideState(elements?.length)
    }
   }

   const nextSlide = () => {
    if(paused) return
    slideState(slide + 1)
    if(elements)
    if(slide < elements?.length) {
      slideState(slide + 1)
    } else {
      slideState(1)
    }
    
   }

   let newSlide : SlideTimeout | null = null;
   const pauseSlide = () => {
    newSlide = new SlideTimeout(() => {setPaused(true);}, 300)
    
   }

   const continueSlide = () => {
    setPaused(false)
    newSlide?.clear();
   }

  
  return (
    <StyledSlideControls onPointerUp={continueSlide} onPointerDown={pauseSlide} ref={refControls}>
      <button onPointerUp={prevSlide}>Previous Slide</button>
      <button onPointerUp={nextSlide}>Next Slide</button>
    </StyledSlideControls>
  );
};

export default SlideControls;

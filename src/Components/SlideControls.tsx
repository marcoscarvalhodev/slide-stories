import React from "react";
import { StyledSlideControls } from "./style/SlideControls.styled";
import SlideTimeout from "./slideTimeout";
import Slide from "./Slide";

interface propsControlled {
  slide: number;
  slideState: React.Dispatch<React.SetStateAction<number>>;
  slideElements: React.RefObject<HTMLDivElement>;
  slideContainer: Element | undefined | null;
}

const SlideControls: React.FC<propsControlled> = ({
  slide,
  slideState,
  slideElements,
  slideContainer,
}) => {
  const [slideVerify, setSlideVerify] = React.useState(false);
  
  const refControls = React.useRef(null);
  const refTimeout = React.useRef<SlideTimeout | null>(null);
  const pausedTimeout = React.useRef<SlideTimeout | null>(null);

  const slideReplace = React.useRef<Slide | null>(null);

  React.useEffect(() => {
    if (slideElements.current) {
      slideReplace.current = new Slide(slideContainer, [
        ...slideElements.current.children,
      ]);
    }
  }, [slideContainer, slideElements]);

  let paused = false;//nesse caso o recomendado é usar um let ou mesmo um ref pois um state atualizaria o componente a todo momento e não funcionaria.
  

  const pauseSlide = () => {
    pausedTimeout.current = new SlideTimeout(() => {
      refTimeout.current?.pause();
      paused = true;
    }, 300);
  };
  

  const continueSlide = () => {
    pausedTimeout.current?.clear();
    if (paused) {
      paused = false;
      refTimeout.current?.continue();
    }
  };
  
  const prevSlide = () => {
    setSlideVerify(true);
    slideReplace.current?.prevSlide({ slide, slideState, paused});
  };

  function nextSlide() {
    setSlideVerify(true);
    slideReplace.current?.nextSlide({ slide, slideState, paused });
  }

  const autoSlide = () => {
    if (slideVerify) {
      refTimeout.current = new SlideTimeout(() => nextSlide(), 5000);
    }
  };

  React.useEffect(() => {
    autoSlide();

    return () => refTimeout.current?.clear();
  });

  return (
    <StyledSlideControls
      onPointerUp={continueSlide}
      onPointerDown={pauseSlide}
      ref={refControls}
    >
      <button onPointerUp={prevSlide}>Previous Slide</button>
      <button onPointerUp={nextSlide}>Next Slide</button>
    </StyledSlideControls>
  );
};

export default SlideControls;

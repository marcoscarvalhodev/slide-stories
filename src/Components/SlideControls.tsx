import React from "react";
import { StyledSlideControls } from "./style/SlideControls.styled";
import SlideTimeout from "./slideTimeout";
import Slide from "./Slide";

interface propsControlled {
  slide: number;
  slideState: React.Dispatch<React.SetStateAction<number>>;
  slideElements: React.RefObject<HTMLDivElement>;
  slideContainer: React.RefObject<HTMLDivElement>;
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
  const indexElement = slideReplace.current?.elements[slide - 1];

  console.log(indexElement)
  
  let paused = false; //nesse caso o recomendado é usar um let ou mesmo um ref pois um state atualizaria o componente a todo momento e não funcionaria.

  React.useEffect(() => {
    if (slideElements.current) {
      slideReplace.current = new Slide(slideContainer.current, [
        ...slideElements.current.children,
      ]);
    }

  }, [slideContainer, slideElements]);

  

  const pauseSlide = () => {
    pausedTimeout.current = new SlideTimeout(() => {
      refTimeout.current?.pause();
      paused = true;
      if(indexElement instanceof HTMLVideoElement) indexElement.pause();
    }, 300);
  };

  const continueSlide = () => {
    pausedTimeout.current?.clear();
    if (paused) {
      paused = false;
      refTimeout.current?.continue();
      if(indexElement instanceof HTMLVideoElement) indexElement.play();
    }
  };

  const prevSlide = () => {
    setSlideVerify(true);
    slideReplace.current?.prevSlide({ slide, slideState, paused });
  };

  const nextSlide = () => {
    setSlideVerify(true);
    slideReplace.current?.nextSlide({ slide, slideState, paused });
  }



  const autoSlide = (time: number) => {
    if (slideVerify) {
      refTimeout.current = new SlideTimeout(() => nextSlide(), time);
    }
    
  };

  function autoSlideVideo<T extends HTMLVideoElement>(video: T) {
    
    video.muted = true;
    video.play();

    if(indexElement instanceof HTMLVideoElement) {
      indexElement.currentTime = 0;
    }

    let firstPlay = true;

    video.addEventListener('playing', () => {
      if(firstPlay) autoSlide(video.duration * 1000);
      firstPlay = false;
    })
    
  }

  React.useEffect(() => {
    if (indexElement) {
      const video = indexElement;
      if (video instanceof HTMLVideoElement) {
        console.log(video)
        autoSlideVideo<HTMLVideoElement>(video);
      } else {
        autoSlide(5000);
      }
    }

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

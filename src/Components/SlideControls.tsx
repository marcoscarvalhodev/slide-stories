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
  const refControls = React.useRef(null);
  const refTimeout = React.useRef<SlideTimeout | null>(null);
  const pausedTimeout = React.useRef<SlideTimeout | null>(null);

  const slideReplace = React.useRef<Slide | null>(null);
  const elements = React.useRef<Element[] | undefined>(undefined)
  const indexElement = React.useRef<Element | undefined>(undefined);

  console.log(indexElement.current);

  let paused = false; //nesse caso o recomendado é usar um let ou mesmo um ref pois um state atualizaria o componente a todo momento e não funcionaria.

  React.useEffect(() => {
    if (slideElements.current) {
      slideReplace.current = new Slide(slideContainer.current, [
        ...slideElements.current.children,
      ]);
    }
  }, [slideContainer, slideElements, slide]);

  const pauseSlide = () => {
    pausedTimeout.current = new SlideTimeout(() => {
      refTimeout.current?.pause();
      paused = true;
      if (indexElement.current instanceof HTMLVideoElement)
        indexElement.current.pause();
    }, 300);
  };

  const continueSlide = () => {
    pausedTimeout.current?.clear();
    if (paused) {
      paused = false;
      refTimeout.current?.continue();
      if (indexElement.current instanceof HTMLVideoElement)
        indexElement.current.play();
    }
  };

  const prevSlide = () => {
    slideReplace.current?.prevSlide({ slide, slideState, paused });
  };

  const nextSlide = () => {
    slideReplace.current?.nextSlide({ slide, slideState, paused });
  };

  const autoSlide = (time: number) => {
    refTimeout.current = new SlideTimeout(() => nextSlide(), time);
  };

  const autoSlideVideo = <T extends HTMLVideoElement>(video: T) => {
    console.log(video);
    video.muted = true;
    video.play();

    if (indexElement.current instanceof HTMLVideoElement) {
      indexElement.current.currentTime = 0;
    }

    let firstPlay = true;

    video.addEventListener("playing", () => {
      if (firstPlay) autoSlide(video.duration * 1000);
      firstPlay = false;
    });
  };

  React.useEffect(() => {
    indexElement.current = slideReplace.current?.elements[slide - 1];
    const video = indexElement.current;

    if (video instanceof HTMLVideoElement) {
      autoSlideVideo<HTMLVideoElement>(video);
    } else {
      autoSlide(5000);
    }

    return () => refTimeout.current?.clear();
  });

  return (
    <>
      <StyledSlideControls
        onPointerUp={continueSlide}
        onPointerDown={pauseSlide}
        ref={refControls}
      >
        <button onPointerUp={prevSlide}>Previous Slide</button>
        <button onPointerUp={nextSlide}>Next Slide</button>
      </StyledSlideControls>

    </>
  );
};

export default SlideControls;

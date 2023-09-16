import React from "react";
import { StyledSlideThumbs } from "./style/SlideThumbs.styled";

interface thumbsProps {
  thumbs: React.RefObject<HTMLDivElement>;
  thumbsContainer: React.RefObject<HTMLDivElement>;
  slide: number;
  timeThumb: number | undefined;
  thumbPause: boolean;
}

const SlideThumbs = ({
  thumbs,
  thumbsContainer,
  slide,
  timeThumb,
  thumbPause,
}: thumbsProps) => {
  const [thumbState, setThumbState] = React.useState<number[]>([]);
  const refThumb = React.useRef<HTMLDivElement | null>(null);
  const [thumbElement, setThumbElement] = React.useState<HTMLDivElement>();
  const thumbRef = React.useRef<any>();
  const [thumbAlt, setThumbAlt] = React.useState<boolean>(false);

  React.useEffect(() => {
    if (refThumb.current instanceof HTMLDivElement) {
      const thumbConst = refThumb.current;
      setThumbElement(thumbConst);

      if (thumbElement) {
        Array.from(thumbElement.children).forEach((item) => {
          item.classList.remove("active");
        });
        Array.from(thumbElement.children)[slide - 1].classList.add("active");
      }
      /*console.log(Array.from(thumbConst.children)[2])*/
    }
  }, [slide, thumbs, thumbElement, timeThumb, thumbPause]);

  function thumbDown() {
    setTimeout(() => setThumbAlt(true), 300);
  }

  function thumbUp() {
    setThumbAlt(false);
  }

  React.useEffect(() => {
    thumbsContainer.current?.addEventListener("pointerdown", thumbDown);
    thumbsContainer.current?.addEventListener("pointerup", thumbUp);

    

    
  }, [thumbsContainer, setThumbState]);

  console.log(thumbAlt);

  React.useEffect(() => {
    if (thumbs.current) {
      const thumbsArray = [];
      for (let i = 0; i < thumbs.current.children.length; i++) {
        thumbsArray.push(i);
      }
      setThumbState(thumbsArray);
    }
  }, [thumbs]);

  return (
    <StyledSlideThumbs ref={refThumb} $time_thumb={timeThumb}>
      {thumbState &&
        thumbState.map((item) => {
          return (
            <span key={item}>
              <span
                className={`thumb-item ${thumbAlt ? "paused" : ""}`}
              ></span>
            </span>
          );
        })}
    </StyledSlideThumbs>
  );
};

export default SlideThumbs;

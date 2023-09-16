import React from "react";
import { StyledSlideThumbs } from "./style/SlideThumbs.styled";
import SlideThumbTimeout from "./SlideThumbTimeout";

interface thumbsProps {
  thumbs: React.RefObject<HTMLDivElement>;
  thumbsContainer: React.RefObject<HTMLDivElement>;
  slide: number;
  timeThumb: number | undefined;
}

const SlideThumbs = ({
  thumbs,
  thumbsContainer,
  slide,
  timeThumb,
  
}: thumbsProps) => {
  const [thumbState, setThumbState] = React.useState<number[]>([]);
  const refThumb = React.useRef<HTMLDivElement | null>(null);
  const [thumbElement, setThumbElement] = React.useState<HTMLDivElement>();
  const thumbRef = React.useRef<SlideThumbTimeout | null>(null);
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
      
    }
  }, [slide, thumbs, thumbElement]);
  
  const thumbDown = React.useCallback(() => {
    thumbRef.current = new SlideThumbTimeout(() => setThumbAlt(true), 300);
    
    
  }, [])

  React.useEffect(() => {
    return () => thumbRef.current?.clear();
  })

  function thumbUp() {
    setThumbAlt(false)
  }

  thumbsContainer.current?.addEventListener("pointerdown", thumbDown);
  thumbsContainer.current?.addEventListener("pointerup", thumbUp);

  console.log(thumbAlt)
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
              <span className={`thumb-item ${thumbAlt ? "paused" : ""}`}></span>
            </span>
          );
        })}
    </StyledSlideThumbs>
  );
};

export default SlideThumbs;

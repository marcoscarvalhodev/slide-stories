import styled from 'styled-components';

interface thumbProps {
  $time_thumb : number | undefined;
}

export const StyledSlideThumbs = styled.div<thumbProps>`
  display: flex;
  position: absolute;
  width: 100%;
  pointer-events: none;


& > span {
  flex: 1;
  display: block;
  height: 4px;
  background: rgba(255, 255, 255, 0.2);
  margin: 5px;
  border-radius: 4px;
  overflow: hidden;
  isolation: isolate;
}

& .active .thumb-item {
  display: block;
  height: inherit;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 4px;
  transform: translateX(-100%);
  animation: thumb ${({$time_thumb}) => $time_thumb ? $time_thumb / 1000 + 's' : 5 + 's' } forwards linear running;
}

& .thumb-item.paused {
  animation-play-state: paused;
}

@keyframes thumb {
  to {
    transform: initial;
  }
}

`
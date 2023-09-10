import React from "react";
import SlideTimeout from "./slideTimeout";

interface slideInterface {
  slide: number;
  slideState: React.Dispatch<React.SetStateAction<number>>;
  paused: boolean;
}

export default class Slide {
  container?: Element | null;
  elements?: Element[];
  time?: number;
  controls?: HTMLElement | null;
  timeout: SlideTimeout | null;
  constructor(
    container?: Element | null,
    elements?: Element[],
    time: number = 5000,
    controls?: HTMLElement | null
  ) {
    this.container = container;
    this.elements = elements;
    this.time = time;
    this.controls = controls;
    this.timeout = null;
  }
  controlTimeout() {}

  /*pause(controles: HTMLElement | null) {
    console.log(controles)
  }*/

  nextSlide({ slide, slideState, paused }: slideInterface) {
    if(paused) return;
    if (this.elements){
      if (slide < this.elements?.length) {
        slideState(slide + 1);
      } else {
        slideState(1);
      }}
    
  }

  prevSlide({ slide, slideState, paused }: slideInterface) {
    if(paused) return;
    if (this.elements) {
      if (slide > 1) {
        slideState(slide - 1);
      } else {
        slideState(this.elements?.length);
      }
    }
  }
}

import React from "react";
import SlideTimeout from "./slideTimeout";

export default class Slide {
  container?: Element;
  elements?: Element[];
  time?: number;
  controls?: HTMLElement | null;
  timeout: SlideTimeout | null;
  constructor(
    container?: Element,
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
  controlTimeout(nextSlide: () => void) {
    this.timeout?.clear()
    this.timeout = new SlideTimeout(() => nextSlide(), 6000)
  }

  pause(controles: HTMLElement | null) {
    console.log(controles)
  }


  
}

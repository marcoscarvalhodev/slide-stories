import React from "react";
import SlideTimeout from "./slideTimeout";

export default class Slide {
  container?: Element;
  elements?: Element[];
  time?: number;

  timeout: SlideTimeout | null;
  constructor(
    container?: Element,
    elements?: Element[],
    time: number = 5000,
    
  ) {
    this.container = container;
    this.elements = elements;
    this.time = time;
    this.timeout = null;
  }
  controlTimeout(nextSlide: () => void) {
    this.timeout?.clear()
    this.timeout = new SlideTimeout(() => nextSlide(), 6000)
  }
  
}

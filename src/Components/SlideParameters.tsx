import Slide from "./Slide";

export function SlideParameters<T extends HTMLElement>(
  container: T,
  elements: T,
  controls: T
) {
  if (container && elements && elements.children.length) {
    new Slide(container, Array.from(elements.children), controls, 6000);
  }
}

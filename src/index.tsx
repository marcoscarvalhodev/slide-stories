import React from "react";
import ReactDOM from "react-dom/client";
import SlideStories from "./Components/SlideStories";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <SlideStories />
  </React.StrictMode>
);

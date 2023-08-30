import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  body {
    font-family: sans-serif;
    margin: 20px;
  }

  img, video {
    display: block;
    max-width: 100%;
  }

  h1 {
    text-align: center;
    font-size: 1.5rem;
  }
`

export default GlobalStyles;
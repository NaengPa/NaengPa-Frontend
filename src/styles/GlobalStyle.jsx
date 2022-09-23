import { createGlobalStyle } from "styled-components";
import "./font/SUIT-Variable.css";

function setScreenSize() {
  let vh = window.innerHeight * 0.01;

  document.documentElement.style.setProperty("--vh", `${vh}px`);
}
setScreenSize();

window.addEventListener("resize", () => setScreenSize());

const GlobalStyle = createGlobalStyle`
* {
  box-sizing: border-box;
}
 body {
    font-family: 'suit variable', sans-serif;
    margin:0;
    padding:0;
  }

  a {
    text-decoration:none;
    color: #767676;
  }

  button{
    border: none;
    background: inherit;
    outline: none;
  }
  :root {
       --vh: 100%;
      }
      `;

export default GlobalStyle;

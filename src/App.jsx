import { useEffect } from "react";
import { ThemeProvider } from "styled-components";
import RootRoute from "./routes/route";
import GlobalStyle from "./styles/GlobalStyle";
import theme from "./theme/theme";

function App() {
  const setScreenSize = () => {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
  };
  useEffect(() => {
    setScreenSize();
  });

  return (
    <ThemeProvider theme={theme}>
      <RootRoute />
      <GlobalStyle />
    </ThemeProvider>
  );
}

export default App;

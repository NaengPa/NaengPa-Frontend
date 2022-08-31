import { ThemeProvider } from "styled-components";
import styled from "styled-components";
import RootRoute from "./routes/route";
import GlobalStyle from "./styles/GlobalStyle";
import theme from "./theme/theme";
import MainBg from "./components/MainBg";

function App() {
  return (
    <ThemeProvider theme={theme}>
      {/* <MainBg /> */}
      <RootRoute />
      <GlobalStyle />
    </ThemeProvider>
  );
}

export default App;

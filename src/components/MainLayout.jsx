import styled from "styled-components";
import backgroundImage from "../assets/naengPaBackground.png";
import theme from "../theme/theme";

const StyledMainLayout = styled.div`
  position: relative;
  width: 100%;
  max-width: 420px;
  background-color: ${theme.colors.WHITE};
  height: 100%;
  margin: auto;
  ::-webkit-scrollbar {
    display: none;
  }
  overflow-y: scroll;
`;

const LayoutWrapper = styled.div`
  width: 100%;
`;

const BackGroundImage = styled.img`
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const MainLayout = ({ children }) => {
  return (
    <LayoutWrapper backgroundImage={backgroundImage}>
      <BackGroundImage src={backgroundImage} alt=""></BackGroundImage>
      <StyledMainLayout>{children}</StyledMainLayout>
    </LayoutWrapper>
  );
};

export default MainLayout;

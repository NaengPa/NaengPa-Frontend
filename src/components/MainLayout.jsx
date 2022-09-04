import styled from "styled-components";

const StyledMainLayout = styled.div`
  position: relative;
  max-width: 420px;
  height: calc(var(--vh, 1vh) * 100);
  margin: auto;
`;

const MainLayout = ({ children }) => {
  return <StyledMainLayout>{children}</StyledMainLayout>;
};

export default MainLayout;

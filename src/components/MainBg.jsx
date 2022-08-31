import styled from "styled-components";

const MainBgContainer = styled.div`
  z-index: -1;
  position: fixed;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: ${(props) => props.theme.colors.PRIMARY_50};
`;

function MainBg() {
  return <MainBgContainer></MainBgContainer>;
}
export default MainBg;

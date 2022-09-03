import React, { useState } from "react";
import styled from "styled-components";
import GoBackButton from "../goBackButton";
import { ReactComponent as Arrow } from "../../assets/arrow.svg";

const HeaderBg = styled.div`
  width: 100%;
  max-width: 420px;
  height: 40px;
  position: fixed;
  top: 0;
  z-index: 100;
  display: flex;
  transition: background-color 0.1s ease-in;
  align-items: center;
  justify-content: space-between;
  background-color: ${({ isScroll }) => (isScroll ? "white" : "transparent")};
`;

const FixedGoBackButton = styled(GoBackButton)`
  display: flex;
  align-items: center;
  margin: 0 16px;
`;

const HeaderTitle = styled.span`
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 20px;
  text-align: center;
  color: ${(props) => props.theme.colors.GREY_90};
`;

const DummyComponent = styled(Arrow)`
  display: flex;
  align-items: center;
  margin: 0 16px;
  opacity: 0;
`;

function Header() {
  const [isScroll, setIsScroll] = useState(false);
  const changeColor = () => {
    if (window.scrollY >= 90) {
      setIsScroll(true);
    } else {
      setIsScroll(false);
    }
  };

  window.addEventListener("scroll", changeColor);
  console.log(isScroll);

  return (
    <HeaderBg isScroll={isScroll}>
      <FixedGoBackButton />
      <HeaderTitle>레시피 상세보기</HeaderTitle>
      <DummyComponent />
    </HeaderBg>
  );
}

export default Header;

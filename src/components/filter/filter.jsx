import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { ReactComponent as XButton } from "../../assets/x.svg";
import FilterCategory from "./filterCategory";
import { motion } from "framer-motion";
import filterItem from "../../Constant/constant";

const Filter = ({ handleClose, show, handleFilterClick }) => {
  const [clicked, setClicked] = useState(false);

  const handleClick = () => {
    handleClose();
    setClicked(true);
  };
  useEffect(() => {
    document.body.style.cssText = `
      position: fixed; 
      top: -${window.scrollY}px;
      overflow-y: scroll;
      width: 100%;`;
    return () => {
      const scrollY = document.body.style.top;
      document.body.style.cssText = "";
      window.scrollTo(0, parseInt(scrollY || "0", 10) * -1);
    };
  }, []); // 화면이 스크롤이 안되고 화면외에 클릭안되게
  const modalRef = useRef(); //화면 외부 클릭하면 창이 닫히게
  useEffect(() => {
    document.addEventListener("mousedown", clickModalOutside);

    return () => {
      document.removeEventListener("mousedown", clickModalOutside);
    };
  });

  const clickModalOutside = (event) => {
    if (show && !modalRef.current.contains(event.target)) {
      handleClose();
      setClicked(true);
    }
  };

  return (
    <Container show ref={modalRef}>
      <FilterContainer
        animate={{ x: clicked ? 400 : 0 }}
        transition={{ ease: "easeInOut", duration: 0.5 }}
      >
        <FilterHeader>
          <FilterText>필터</FilterText>
          <StyledMyIcon onClick={handleClick}></StyledMyIcon>
        </FilterHeader>
        <FilterMain>
          {filterItem.map((item) => (
            <FilterCategory
              handleFilterClick={handleFilterClick}
              filterItem={item}
            ></FilterCategory>
          ))}
        </FilterMain>
      </FilterContainer>
    </Container>
  );
};

export default Filter;

const Container = styled(motion.div)`
  border-radius: 20px 0px 0px 20px;
  z-index: 9999;
  height: calc(100vh - 64px); //calc 할떄는 내부에서 꼭 스페이스바를 해줘야된다.
  background-color: transparent;
  width: 80%;
  position: fixed;
  top: 0;
  transform: translateX(25%);
  transition: all 300ms ease-in;
  overflow: scroll;
  min-height: 100vh;
  width: 350px;
`;

const FilterContainer = styled(motion.div)`
  transform: translateX(100%);
  transition: all 300ms ease-in;
  background-color: white;
`;

const FilterHeader = styled.header`
  position: relative;
  padding-top: 22px;
  padding-bottom: 20px;
  text-align: center;
  border-bottom: 0.5px solid rgba(73, 73, 73, 0.4);
`;

const FilterText = styled.span`
  font-weight: 500;
  font-size: 18px;
`;

const StyledMyIcon = styled(XButton)`
  position: absolute;
  top: 26px;
  left: 24px;
  cursor: pointer;
`;

const FilterMain = styled.div`
  padding: 38px 20px;
`;

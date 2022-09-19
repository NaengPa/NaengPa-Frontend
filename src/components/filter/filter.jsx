import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { ReactComponent as XButton } from "../../assets/x.svg";
import FilterCategory from "./filterCategory";
import { motion } from "framer-motion";
import { useRecoilState, useRecoilValue } from "recoil";
import { filterStateAtom, navBarHeightAtom } from "../../atom";

const Filter = ({
  handleClose,
  show,
  handleFilterClick,
  filterFoodData,
  parentWidth,
}) => {
  const [clicked, setClicked] = useState(false);
  const [filterItemState, setFilterItemState] = useRecoilState(filterStateAtom);

  const handleClick = (e) => {
    handleClose();
    setClicked(true);
  };

  const handleFilter = (first, second) => {
    const filterItemCopy = JSON.parse(JSON.stringify(filterItemState));
    if (first !== 0) {
      filterItemCopy[first].category[second].isClicked === false
        ? (filterItemCopy[first].category[second].isClicked = true)
        : (filterItemCopy[first].category[second].isClicked = false);
    } else if (first === 0) {
      if (filterItemCopy[0].category[second].isClicked) {
        filterItemCopy[0].category[second].isClicked = false;
      } else {
        filterItemCopy[0].category[0].isClicked = false;
        filterItemCopy[0].category[1].isClicked = false;
        filterItemCopy[0].category[second].isClicked = true;
      }
    }
    setFilterItemState((prev) => [...filterItemCopy]);
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

  const navBarHeight = useRecoilValue(navBarHeightAtom);

  return (
    <Container
      parentWidth={parentWidth}
      navBarHeight={navBarHeight}
      show
      ref={modalRef}
    >
      <FilterContainer
        animate={{ x: clicked ? 400 : 0 }}
        transition={{ ease: "easeInOut", duration: 0.5 }}
      >
        <FilterHeader>
          <FilterText>필터</FilterText>
          <StyledMyIcon onClick={handleClick}></StyledMyIcon>
        </FilterHeader>
        <FilterMain>
          {filterItemState?.map((item, index) => (
            <FilterCategory
              handleFilter={handleFilter}
              firstIndex={index}
              filterFoodData={filterFoodData}
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
  z-index: 1200;
  height: 100%;
  min-height: calc(100vh - 56px);
  background-color: transparent;
  width: ${(props) => `${props.parentWidth * 0.7}px`};
  position: fixed;
  top: 0px;
  transform: ${(props) => `translateX(${props.parentWidth * 0.3}px)`};
  transition: all 300ms ease-in;
  overflow: scroll;
`;

const FilterContainer = styled(motion.div)`
  transform: translateX(100%);
  transition: all 300ms ease-in;
  height: 100%;
  min-height: calc(100vh - 56px);
  background-color: ${({ theme }) => theme.colors.WHITE};
  overflow-y: scroll;
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

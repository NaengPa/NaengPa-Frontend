import React, { useState } from "react";
import styled from "styled-components";

const FilterCategoryButton = ({
  item,
  filterItem,
  handleFilterClick,
  filterFoodData,
}) => {
  const [buttonClick, setButtonClick] = useState(false);
  const handleClick = (e) => {
    if (buttonClick === false) {
      setButtonClick(true);
    } else {
      setButtonClick(false);
    }
    handleFilterClick(e);
  };
  return (
    <ButtonWrapper
      filterItem={filterItem.title}
      buttonClick={buttonClick}
      onClick={handleClick}
      filterFoodData={filterFoodData}
    >
      {item}
    </ButtonWrapper>
  );
};

export default FilterCategoryButton;

const ButtonWrapper = styled.button`
  padding: 10px 15px;
  font-size: 14px;
  font-weight: 500;
  margin-right: 8px;
  margin-bottom: 10px;
  color: ${(props) =>
    props.buttonClick ? props.theme.colors.WHITE : props.theme.colors.GREY_50};
  border: 1px solid
    ${(props) =>
      props.buttonClick
        ? props.filterItem === "이건 빼고 싶어요"
          ? props.theme.colors.PINK_700
          : props.theme.colors.MAIN_COLOR
        : props.theme.colors.GREY_50};
  white-space: nowrap;
  background-color: ${(props) =>
    props.buttonClick
      ? props.filterItem === "이건 빼고 싶어요"
        ? props.theme.colors.PINK_700
        : props.theme.colors.MAIN_COLOR
      : "transparent"};
  border-radius: 50px;
  pointer-events: ${({ filterFoodData }) =>
    filterFoodData.clicked ? "none" : "all"};
`;

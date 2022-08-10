import React, { useState } from "react";
import styled from "styled-components";

const FilterCategoryButton = ({ item }) => {
  const [buttonClick, setButtonClick] = useState(false);
  const handleClick = () => {
    if (buttonClick === false) {
      setButtonClick(true);
    } else {
      setButtonClick(false);
    }
  };
  return (
    <ButtonWrapper buttonClick={buttonClick} onClick={handleClick}>
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
        ? props.theme.colors.MAIN_COLOR
        : props.theme.colors.GREY_50};
  white-space: nowrap;
  background-color: ${(props) =>
    props.buttonClick ? props.theme.colors.MAIN_COLOR : "transparent"};
  border-radius: 50px;
`;

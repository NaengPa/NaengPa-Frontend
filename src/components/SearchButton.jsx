import React from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { selectedIngredientAtom } from "../atom";

const SearchButton = ({ item, addListClick }) => {
  const [selectedIngredient, setSelectedIngredient] = useRecoilState(
    selectedIngredientAtom
  );
  const valid = selectedIngredient.includes(item);
  return (
    <Wrapper valid={valid} onClick={addListClick}>
      <FoodText>{item}</FoodText>
    </Wrapper>
  );
};

export default SearchButton;

const Wrapper = styled.button`
  white-space: nowrap;
  display: flex;
  align-items: center;
  padding: 8px 16px;
  height: 36px;
  border: 1px solid ${(props) => props.theme.colors.GREY_30};
  border-radius: 50px;

  font-style: normal;
  font-weight: 600;
  font-size: 13px;
  line-height: 20px;
  text-align: center;
  letter-spacing: -0.005em;
  color: ${(props) => props.theme.colors.GREY_60};
`;

const FoodText = styled.div``;

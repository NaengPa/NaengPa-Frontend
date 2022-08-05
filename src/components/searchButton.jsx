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
  flex-direction: row;
  margin-right: 10px;
  padding: 10px 15px;
  border-radius: 20px;
  border: 1px solid ${({ theme }) => theme.colors.MAIN_COLOR};
  font-size: 14px;
  height: 37px;
  margin-bottom: 10px;
`;

const FoodText = styled.div``;

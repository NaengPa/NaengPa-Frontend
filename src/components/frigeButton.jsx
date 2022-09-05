import React from "react";
import { propTypes } from "react-bootstrap/esm/Image";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { selectedIngredientAtom } from "../atom";

const FrigeButton = ({ item, handleAdd }) => {
  const [selectedIngredient, setSelectedIngredient] = useRecoilState(
    selectedIngredientAtom
  );
  const valid = selectedIngredient.includes(item);
  return (
    <Wrapper valid={valid} onClick={handleAdd}>
      <FoodText>{item}</FoodText>
    </Wrapper>
  );
};

export default FrigeButton;

const Wrapper = styled.button`
  white-space: nowrap;
  display: flex;
  align-items: center;
  flex-direction: row;
  padding: 8px 16px;
  border-radius: 50px;
  pointer-events: ${({ valid }) => (valid ? "none" : "auto")};
  border: 1px solid
    ${(props) =>
      props.valid
        ? props.theme.colors.MAIN_COLOR
        : props.theme.colors.PRIMARY_300};
  font-size: 14px;
  color: ${(props) => (props.valid ? "white" : props.theme.colors.PRIMARY_300)};
  background-color: ${(props) =>
    props.valid ? props.theme.colors.MAIN_COLOR : "transparent"};
  height: 36px;
`;

const FoodText = styled.div``;

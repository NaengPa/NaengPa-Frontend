import React from "react";
import styled from "styled-components";
import { ReactComponent as XButton } from "../assets/XButton.svg";
const FoodButton = ({ item, handleDelete }) => {
  return (
    <Wrapper onClick={handleDelete}>
      <FoodText>{item}</FoodText>
      <StyledMyIcon></StyledMyIcon>
    </Wrapper>
  );
};
export default FoodButton;
const Wrapper = styled.button`
  white-space: nowrap;
  display: flex;
  align-items: center;
  height: 36px;
  padding: 8px 16px;
  border-radius: 50px;
  background-color: ${({ theme }) => theme.colors.MAIN_COLOR};

  font-style: normal;
  font-weight: 600;
  font-size: 13px;
  line-height: 20px;
  text-align: center;
  letter-spacing: -0.005em;
  color: white;
`;

const StyledMyIcon = styled(XButton)`
  pointer-events: none;
`;

const FoodText = styled.div`
  margin-right: 8px;
  pointer-events: none;
`;

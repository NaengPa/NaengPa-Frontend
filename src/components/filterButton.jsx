import React from "react";
import styled from "styled-components";
import { ReactComponent as Filter } from "../assets/filter.svg";

const FilterButton = ({ handleShow }) => {
  return (
    <Wrapper onClick={handleShow}>
      <StyledMyIcon></StyledMyIcon>
    </Wrapper>
  );
};

export default FilterButton;

const Wrapper = styled.div``;

const StyledMyIcon = styled(Filter)`
  cursor: pointer;
`;

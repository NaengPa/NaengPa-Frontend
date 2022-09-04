import React from "react";
import styled from "styled-components";
import { ReactComponent as Arrow } from "../assets/arrow.svg";
import { useNavigate } from "react-router-dom";

const PreviousPageBtn = ({ ...rest }) => {
  const navigate = useNavigate();
  return (
    <Wrapper {...rest}>
      <StyledMyIcon onClick={() => navigate(-1)}> </StyledMyIcon>
    </Wrapper>
  );
};

export default PreviousPageBtn;

const Wrapper = styled.div``;

const StyledMyIcon = styled(Arrow)`
  cursor: pointer;
`;

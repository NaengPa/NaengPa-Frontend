import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const FindAndSignIn = () => {
  const navigate = useNavigate();
  const linkToSignIn = () => {
    navigate("/signin");
  };
  return (
    <Container>
      <SignIn onClick={linkToSignIn}>회원가입</SignIn>
    </Container>
  );
};

export default FindAndSignIn;

const Container = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 22px;
`;

const FindId = styled.button`
  font-weight: 500;
  color: ${({ theme }) => theme.colors.GREY_50};
  font-size: 14px;
  padding: 0 16px;
  border-right: 1px solid ${({ theme }) => theme.colors.GREY_20};
`;

const FindPassword = styled.button`
  font-weight: 500;
  color: ${({ theme }) => theme.colors.GREY_50};
  font-size: 14px;
  padding: 0 16px;
  border-right: 1px solid ${({ theme }) => theme.colors.GREY_20};
`;

const SignIn = styled.button`
  font-weight: 500;
  color: ${({ theme }) => theme.colors.GREY_50};
  font-size: 14px;
  padding: 0 16px;
`;

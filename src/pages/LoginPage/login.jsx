import React from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import FindAndSignIn from "./findAndSignIn";
import { ReactComponent as Kakao } from "../../assets/kakao.svg";

const Login = () => {
  const { handleSubmit } = useForm();
  const submitEvent = (e) => {
    e.preventDefault();
  };
  return (
    <Container>
      <MainTitle>
        냉파를 이용하기 위해<br></br> 로그인을 해주세요 🍳{" "}
      </MainTitle>
      <LoginForm onSubmit={handleSubmit(submitEvent)}>
        <LoginWrapper>
          <LoginTitle>아이디</LoginTitle>
          <LoginInput
            placeholder="naengpa@naengpa.com"
            type={"text"}
          ></LoginInput>
        </LoginWrapper>
        <PasswordWrapper>
          <PasswordTitle>비밀번호</PasswordTitle>
          <PasswordInput
            placeholder="**********"
            type={"password"}
          ></PasswordInput>
        </PasswordWrapper>
        <LoginButton>로그인</LoginButton>
        <FindAndSignIn></FindAndSignIn>
      </LoginForm>
      <KakaoLoginButton>
        <StyledMyIcon></StyledMyIcon>
        <KakaoTitle>카카오로 시작하기</KakaoTitle>
        <Empty></Empty>
      </KakaoLoginButton>
    </Container>
  );
};

export default Login;

const Container = styled.div`
  padding: 64px 16px 48px 16px;
  width: 100%;
  min-height: 100vh;
  input {
    outline: none;
    border: none;
    width: 100%;
    font-weight: 500;
    padding: 13.5px 0;
    border-bottom: 1px solid ${({ theme }) => theme.colors.GREY_30};
  }
  input::placeholder {
    color: ${({ theme }) => theme.colors.GREY_30};
    font-weight: 500;
  }
  button {
    cursor: pointer;
  }
`;

const MainTitle = styled.div`
  font-weight: 600;
  font-size: 24px;
  line-height: 30px;
`;

const LoginForm = styled.form`
  width: 100%;
  margin-top: 24px;
`;

const LoginWrapper = styled.div``;

const LoginTitle = styled.div`
  font-size: 13px;
`;

const PasswordWrapper = styled.div`
  margin-top: 32px;
`;

const PasswordTitle = styled.div`
  font-size: 13px;
`;

const LoginInput = styled.input``;

const PasswordInput = styled.input``;

const LoginButton = styled.button`
  margin-top: 32px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.WHITE};
  padding: 15px 0;
  width: 100%;
  border-radius: 5px;
  background-color: ${({ theme }) => theme.colors.MAIN_COLOR};
`;

const KakaoLoginButton = styled.button`
  background-color: ${({ theme }) => theme.colors.KAKAO};
  padding: 15px 16px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  border-radius: 5px;
  margin-top: 32px;
`;

const Empty = styled.div``;

const KakaoTitle = styled.div`
  font-weight: 600;
`;

const StyledMyIcon = styled(Kakao)`
  cursor: pointer;
`;

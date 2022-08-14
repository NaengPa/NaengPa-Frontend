import React from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import GoBackButton from "../../components/goBackButton";

const SignIn = () => {
  const handleSubmit = useForm();
  const submitEvent = (e) => {
    e.preventDefault();
  };
  return (
    <Container>
      <Header>
        <GoBackButton></GoBackButton>
        <MainTitle>회원가입</MainTitle>
        <Empty></Empty>
      </Header>
      <LoginForm onSubmit={handleSubmit}>
        <LoginWrapper>
          <LoginTitle>이메일</LoginTitle>
          <LoginInput placeholder="이메일 주소 입력" type={"text"}></LoginInput>
        </LoginWrapper>
        <NickNameWrapper>
          <NickNameTitle>닉네임</NickNameTitle>
          <NickNameInput
            placeholder="닉네임 입력"
            type={"text"}
          ></NickNameInput>
        </NickNameWrapper>
        <PasswordWrapper>
          <PasswordTitle>비밀번호</PasswordTitle>
          <PasswordInput
            placeholder="비밀번호 입력"
            type={"password"}
          ></PasswordInput>
        </PasswordWrapper>
        <SignInButton>회원가입</SignInButton>
      </LoginForm>
      <Empty></Empty>
    </Container>
  );
};

export default SignIn;

const Container = styled.div`
  padding: 0 16px;
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
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

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  padding: 10px 0;
`;

const MainTitle = styled.div`
  font-weight: 600;
`;

const Empty = styled.div``;

const LoginForm = styled.form``;
const LoginWrapper = styled.div`
  margin-bottom: 32px;
`;

const LoginTitle = styled.div`
  font-size: 13px;
`;

const LoginInput = styled.input``;

const PasswordWrapper = styled.div`
  margin-bottom: 32px;
`;

const PasswordTitle = styled.div`
  font-size: 13px;
`;

const PasswordInput = styled.input``;

const NickNameWrapper = styled.div`
  margin-bottom: 40px;
`;

const NickNameTitle = styled.div`
  font-size: 13px;
`;

const NickNameInput = styled.input``;

const SignInButton = styled.button`
  text-align: center;
  margin-top: 32px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.WHITE};
  padding: 15px 0;
  width: 100%;
  border-radius: 5px;
  background-color: ${({ theme }) => theme.colors.MAIN_COLOR};
`;

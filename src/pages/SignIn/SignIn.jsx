import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { getEmailCheck, getNicknameCheck } from "../../common/doubleCheck";

import { localSignIn } from "../../common/localLogin";
import PreviousPageBtn from "../../components/PreviousPageBtn";

const SignIn = () => {
  const [emailState, setEmailState] = useState(true);
  const [nickNameState, setNickNameState] = useState(true);
  const [passwordState, setPasswordState] = useState(true);
  const [currentPassword, setCurrentPassword] = useState("");
  const [passwordConfirmState, setPasswordConfirmState] = useState(true);
  const [emailCheckState, setEmailCheckState] = useState();
  const [nickNameCheckState, setNickNameCheckState] = useState();

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const localSignIns = async (e) => {
      const result = await localSignIn(e);
      if (result === "회원가입에 성공했습니다.") {
        navigate("/login");
      }
    };
    localSignIns(e);
  };

  const handleEmailBlur = async (e) => {
    const result = await getEmailCheck(e.target.value);
    if (
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        e.target.value
      )
    ) {
      setEmailState("good");
    } else if (
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        e.target.value
      ) === false
    ) {
      setEmailState(false);
    }
    setEmailCheckState(result);
  };

  const handleNicknameBlur = async (e) => {
    const result = await getNicknameCheck(e.target.value);
    if (e.target.value.length > 0) {
      setNickNameState("good");
    } else {
      setNickNameState(false);
    }
    setNickNameCheckState(result);
  };

  const handlePasswordBlur = (e) => {
    setCurrentPassword(e.target.value);
    if (/^[a-zA-Z\\d`~!@#$%^&*()-_=+]{6,16}$/.test(e.target.value)) {
      setPasswordState("good");
    } else if (e.target.value.length === 0) {
      setPasswordState("zero");
    } else {
      setPasswordState(false);
    }
  };

  const onChangePasswordConfirm = (e) => {
    if (e.target.value.length > 1 && e.target.value === currentPassword) {
      setPasswordConfirmState("good");
    } else {
      setPasswordConfirmState(false);
    }
  };

  return (
    <Container>
      <Header>
        <PreviousPageBtn />
        <MainTitle>회원가입</MainTitle>
        <Empty></Empty>
      </Header>
      <LoginForm onSubmit={handleSubmit}>
        <EmailWrapper>
          <EmailTitle>이메일</EmailTitle>
          <EmailInput
            emailState={emailState}
            placeholder="이메일 주소 입력"
            type={"text"}
            onBlur={handleEmailBlur}
          ></EmailInput>
          {emailCheckState ? (
            <EmailDuplicationErrorMessage>
              이미 사용중인 이메일 주소에요.
            </EmailDuplicationErrorMessage>
          ) : (
            ""
          )}
          {!emailState ? (
            <EmailErrorMessage>
              올바른 이메일 형식으로 입력해 주세요.
            </EmailErrorMessage>
          ) : (
            ""
          )}
        </EmailWrapper>
        <NickNameWrapper>
          <NickNameTitle>닉네임</NickNameTitle>
          <NickNameInput
            nickNameState={nickNameState}
            onBlur={handleNicknameBlur}
            placeholder="닉네임 입력"
            type={"text"}
          ></NickNameInput>
          {nickNameCheckState ? (
            <NickNameDuplicationErrorMessage>
              이미 사용 중인 닉네임이에요.
            </NickNameDuplicationErrorMessage>
          ) : (
            ""
          )}
          {!nickNameState ? (
            <NickNameErrorMessage>
              한글 1글자(영문 2글자) 이상의 닉네임으로 입력해 주세요.
            </NickNameErrorMessage>
          ) : (
            ""
          )}
        </NickNameWrapper>
        <PasswordWrapper>
          <PasswordTitle>비밀번호</PasswordTitle>
          <PasswordInput
            passwordState={passwordState}
            onBlur={handlePasswordBlur}
            placeholder="비밀번호 입력"
            type={"password"}
          ></PasswordInput>
          {!passwordState ? (
            <PasswordErrorMessage>
              영문, 숫자, 기호(!@#$%^&*+=-)를 조합하여 6~16 글자 사이의
              비밀번호를 입력해 주세요.
            </PasswordErrorMessage>
          ) : (
            ""
          )}
          {passwordState === "zero" ? (
            <PasswordErrorMessage>
              비밀번호를 입력해 주세요.
            </PasswordErrorMessage>
          ) : (
            ""
          )}
        </PasswordWrapper>
        <PasswordConfirmWrapper>
          <PasswordConfirmTitle>비밀번호 확인</PasswordConfirmTitle>
          <PasswordConfirmInput
            passwordConfirmState={passwordConfirmState}
            onChange={onChangePasswordConfirm}
            placeholder="비밀번호 재입력"
            type={"password"}
          ></PasswordConfirmInput>
          {!passwordConfirmState ? (
            <PasswordConfirmErrorMessage>
              비밀번호를 다시 확인해 주세요.
            </PasswordConfirmErrorMessage>
          ) : (
            ""
          )}
        </PasswordConfirmWrapper>
        <SignInButton
          disabled={
            (passwordState &&
              passwordConfirmState === "good" &&
              emailState &&
              nickNameState === "good") === true &&
            (emailCheckState || nickNameCheckState) === false
              ? false
              : true
          }
          isValid={
            (passwordState &&
              passwordConfirmState === "good" &&
              emailState &&
              nickNameState === "good") === true &&
            (emailCheckState || nickNameCheckState) === false
              ? true
              : false
          }
          // passwordState={passwordState}
          // passwordConfirmState={passwordConfirmState}
          // emailState={emailState}
          // nickNameState={nickNameState}
        >
          회원가입
        </SignInButton>
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
    width: 100%;
    font-weight: 500;
    padding: 13.5px 0;
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
const EmailWrapper = styled.div`
  margin-bottom: 32px;
`;

const EmailTitle = styled.div`
  font-size: 13px;
`;

const EmailInput = styled.input`
  border: none;
  border-bottom: 1px solid ${(props) => props.theme.colors.GREY_30};
`;

const EmailDuplicationErrorMessage = styled.div`
  font-size: 13px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.ORANGE_900};
`;

const EmailErrorMessage = styled.div`
  font-size: 13px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.ORANGE_900};
`;

const NickNameErrorMessage = styled.div`
  font-size: 13px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.ORANGE_900};
`;

const NickNameDuplicationErrorMessage = styled.div`
  font-size: 13px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.ORANGE_900};
`;

const PasswordErrorMessage = styled.div`
  font-size: 13px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.ORANGE_900};
`;

const PasswordConfirmErrorMessage = styled.div`
  font-size: 13px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.ORANGE_900};
`;

const PasswordWrapper = styled.div`
  margin-bottom: 32px;
`;

const PasswordTitle = styled.div`
  font-size: 13px;
`;

const PasswordInput = styled.input`
  border: none;
  border-bottom: 1px solid ${(props) => props.theme.colors.GREY_30};
`;

const PasswordConfirmWrapper = styled.div`
  margin-bottom: 32px;
`;

const PasswordConfirmTitle = styled.div`
  font-size: 13px;
`;

const PasswordConfirmInput = styled.input`
  border: none;
  border-bottom: 1px solid ${(props) => props.theme.colors.GREY_30};
`;

const NickNameWrapper = styled.div`
  margin-bottom: 40px;
`;

const NickNameTitle = styled.div`
  font-size: 13px;
`;

const NickNameInput = styled.input`
  border: none;
  border-bottom: 1px solid ${(props) => props.theme.colors.GREY_30};
`;

const SignInButton = styled.button`
  text-align: center;
  margin-top: 32px;
  font-weight: 600;
  padding: 15px 0;
  width: 100%;
  border-radius: 5px;
  color: ${(props) =>
    props.isValid ? props.theme.colors.WHITE : props.theme.colors.GREY_10};

  background-color: ${(props) =>
    props.isValid ? props.theme.colors.MAIN_COLOR : props.theme.colors.GREY_30};
  transition: all 300ms ease-in-out;
`;

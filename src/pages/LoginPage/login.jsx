import React from "react";
import styled from "styled-components";
import FindAndSignIn from "./findAndSignIn";
import { ReactComponent as Kakao } from "../../assets/kakao.svg";
import GoBackButton from "../../components/GoBackButton";
import { useState } from "react";
import { getKakaoLogin, getLoginInfo } from "../../common/kakaoLogin";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { pageStateAtom } from "../../atom";
import { useRecoilState } from "recoil";

const Login = () => {
  const [emailState, setEmailState] = useState(false);
  const [passwordState, setPasswordState] = useState(false);
  const [pageState, setPageState] = useRecoilState(pageStateAtom);
  const navigate = useNavigate();

  useEffect(() => {
    const KakaoUrl = window.location.search.split("=")[1];
    // if (!window.location.search) return;
    const postUrl = async () => {
      const result = await getKakaoLogin(KakaoUrl);

      localStorage.setItem("token", result);
      navigate(-3);
      // navigate(`http://localhost:3000${pageState}`);
    };

    if (KakaoUrl) {
      postUrl();
    }
  });

  const a = process.env.NODE_ENV;
  console.log(a);

  console.log(window.location.href.split(":")[0]);

  const redirectUri =
    window.location.href.split(":")[1] === "//localhost"
      ? "http://localhost:3000/login"
      : "https://naengdev.netlify.app/login";

  const onChangeEmail = (e) => {
    const inputLen = e.target.value.length;
    if (inputLen > 2) {
      setEmailState(true);
    } else {
      setEmailState(false);
    }
    console.log(e.target.value);
  };

  const onChangePassword = (e) => {
    console.log(typeof e.target.value);
    const inputLen = e.target.value.length;
    if (inputLen > 2) {
      setPasswordState(true);
    } else {
      setPasswordState(false);
    }
    console.log(e.target.value);
  };

  const handleSubmit = (e) => {
    console.log("hihi");
    e.preventDefault();
  };

  return (
    <Container>
      <GoBackButton></GoBackButton>
      <MainContainer>
        <MainTitle>
          냉파를 이용하기 위해<br></br> 로그인을 해주세요 🍳{" "}
        </MainTitle>
        <LoginForm onSubmit={handleSubmit}>
          <LoginWrapper>
            <LoginTitle>아이디</LoginTitle>
            <LoginInput
              onChange={onChangeEmail}
              name="email"
              placeholder="naengpa@naengpa.com"
              type={"text"}
            ></LoginInput>
          </LoginWrapper>
          <PasswordWrapper>
            <PasswordTitle>비밀번호</PasswordTitle>
            <PasswordInput
              onChange={onChangePassword}
              name="password"
              placeholder="**********"
              type={"password"}
            ></PasswordInput>
          </PasswordWrapper>
          <LoginButton
            disabled={passwordState && emailState ? false : true}
            passwordState={passwordState}
            emailState={emailState}
          >
            로그인
          </LoginButton>
          <FindAndSignIn></FindAndSignIn>
        </LoginForm>
      </MainContainer>
      <KakaoLoginButton
        href={`https://kauth.kakao.com/oauth/authorize?client_id=e01c4cdbad44d2771897f26308c77ef1&redirect_uri=${redirectUri}&response_type=code`}
      >
        <StyledMyIcon></StyledMyIcon>
      </KakaoLoginButton>
    </Container>
  );
};

export default Login;

const Container = styled.div`
  padding: 20px 16px 48px 16px;
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

const MainContainer = styled.div``;

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

const LoginInput = styled.input`
  &:focus {
    border-bottom: 1px solid ${({ theme }) => theme.colors.MAIN_COLOR};
  }
  caret-color: ${({ theme }) => theme.colors.MAIN_COLOR};
`;

const PasswordInput = styled.input`
  &:focus {
    border-bottom: 1px solid ${({ theme }) => theme.colors.MAIN_COLOR};
  }
  caret-color: ${({ theme }) => theme.colors.MAIN_COLOR};
`;

const LoginButton = styled.button`
  margin-top: 32px;
  font-weight: 600;
  color: ${(props) =>
    props.passwordState && props.emailState
      ? props.theme.colors.WHITE
      : props.theme.colors.GREY_10};

  background-color: ${(props) =>
    props.passwordState && props.emailState
      ? props.theme.colors.MAIN_COLOR
      : props.theme.colors.GREY_30};
  transition: all 300ms ease-in-out;
  padding: 15px 0;
  width: 100%;
  border-radius: 5px;
`;

const KakaoLoginButton = styled.a`
  background-color: ${({ theme }) => theme.colors.KAKAO};
  width: 100%;
  margin-top: 32px;
  margin-bottom: 40px;
  cursor: pointer;
  border-radius: 5px;
`;

const StyledMyIcon = styled(Kakao)`
  cursor: pointer;
  width: 100%;
`;

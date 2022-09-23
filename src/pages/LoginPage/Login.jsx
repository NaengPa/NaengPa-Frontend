import React from "react";
import styled from "styled-components";
import FindAndSignIn from "./FindAndSignIn";
import { ReactComponent as Kakao } from "../../assets/kakao.svg";
import { useState } from "react";
import { getKakaoLogin, getLoginInfo } from "../../common/kakaoLogin";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { myFrigeAtom } from "../../atom";
import { useRecoilState } from "recoil";
import { localLogin } from "../../common/localLogin";
import PreviousPageBtn from "../../components/PreviousPageBtn";
import { getFrigeIrdnt } from "../../common/axios";
import LoadingPortal from "../../components/LoadingPortal";
import LoadingScreen from "../../components/LoadingScreen";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [emailState, setEmailState] = useState(false);
  const [passwordState, setPasswordState] = useState(false);
  const [myFrige, setMyFrige] = useRecoilState(myFrigeAtom);
  const navigate = useNavigate();

  useEffect(() => {
    const KakaoUrl = window.location.search.split("=")[1];
    const postUrl = async () => {
      await getKakaoLogin(KakaoUrl);
    };

    const getFrige = async () => {
      const result = await getFrigeIrdnt(
        JSON.parse(localStorage.getItem("userInfo")).email
      );
      setMyFrige(result);
    };

    if (KakaoUrl) {
      const loginFn = async () => {
        setLoading(true);
        await postUrl();
        const result = await getLoginInfo(localStorage.getItem("token"));
        localStorage.setItem("userInfo", JSON.stringify(result));
        await getFrige();
        setLoading(false);
        navigate("/");
      };
      loginFn();
    }
  });

  const redirectUri =
    window.location.href.split(":")[1] === "//localhost"
      ? "http://localhost:3000/login"
      : "https://naengpa.netlify.app/login";

  const onChangeEmail = (e) => {
    const inputLen = e.target.value.length;
    if (inputLen > 2) {
      setEmailState(true);
    } else {
      setEmailState(false);
    }
  };

  const onChangePassword = (e) => {
    const inputLen = e.target.value.length;
    if (inputLen > 2) {
      setPasswordState(true);
    } else {
      setPasswordState(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const localLogins = async (e) => {
      const result = await localLogin(e);
      localStorage.setItem("token", result.accessToken);
      localStorage.setItem("refreshToken", result.accessToken);
      getInfos();
      navigate("/");
    };
    const getInfos = async () => {
      const result = await getLoginInfo(localStorage.getItem("token"));
      localStorage.setItem("userInfo", JSON.stringify(result));
    };
    localLogins(e);
  };

  return loading ? (
    <LoadingPortal>{<LoadingScreen />}</LoadingPortal>
  ) : (
    <Container>
      <PreviousPageBtn />
      <MainContainer>
        <MainTitle>
          이 서비스에는<br></br>로그인이 필요해요 🍳{" "}
        </MainTitle>
        <LoginForm onSubmit={handleSubmit}>
          <LoginWrapper>
            <LoginTitle>이메일</LoginTitle>
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
              placeholder="******"
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
  padding: 20px 16px 56px 16px;
  width: 100%;
  height: calc(var(--vh, 1vh) * 100);
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
  font-size: 14px;
  background-color: ${(props) =>
    props.passwordState && props.emailState
      ? props.theme.colors.MAIN_COLOR
      : props.theme.colors.GREY_30};
  transition: all 300ms ease-in-out;
  padding: 15px 0;
  width: 100%;
  font-size: 14px;
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

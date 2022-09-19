import React, { useCallback, useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { ReactComponent as Home } from "../assets/navHome.svg";
import { ReactComponent as community } from "../assets/navCommunity.svg";
import { ReactComponent as mypage } from "../assets/navMypage.svg";
import { ReactComponent as refrigerator } from "../assets/navRefrigerator.svg";
import { ReactComponent as search } from "../assets/navSearch.svg";
import { css } from "styled-components";
import { useSetRecoilState } from "recoil";
import { navBarHeightAtom } from "../atom";
import { useRef } from "react";

const Navigation = () => {
  const [, updateState] = useState();
  const forceUpdate = useCallback(() => updateState({}), []);
  const setNavBarHeight = useSetRecoilState(navBarHeightAtom);

  const containerRef = useRef();
  const values = containerRef.current?.offsetHeight;
  setNavBarHeight(values);

  return (
    <Container ref={containerRef}>
      <Link className="link" to={{ pathname: "/" }} onClick={forceUpdate}>
        <StyledMyIconHome
          isActive={window.location.pathname === "/" ? true : false}
        />
        <HomeText isActive={window.location.pathname === "/" ? true : false}>
          홈
        </HomeText>
      </Link>
      <Link className="link" to={{ pathname: "/search" }} onClick={forceUpdate}>
        <StyledMyIconSearch
          isActive={
            window.location.pathname === "/search" ||
            window.location.pathname.indexOf("/detail") !== -1
              ? true
              : false
          }
        />
        <SearchText
          isActive={
            window.location.pathname === "/search" ||
            window.location.pathname.indexOf("/detail") !== -1
              ? true
              : false
          }
        >
          검색
        </SearchText>
      </Link>
      <Link
        className="link"
        to={{ pathname: "/myfrige" }}
        onClick={forceUpdate}
      >
        <StyledMyIconRefrigerator
          isActive={
            window.location.pathname === "/myfrige" ||
            window.location.pathname === "/frige"
              ? true
              : false
          }
        />
        <FrigeText
          isActive={
            window.location.pathname === "/myfrige" ||
            window.location.pathname === "/frige"
              ? true
              : false
          }
        >
          내 냉장고
        </FrigeText>
      </Link>
      <Link
        className="link"
        to={{ pathname: "/community" }}
        onClick={forceUpdate}
      >
        <StyledMyIconCommunity
          isActive={
            window.location.pathname === "/community" ||
            window.location.pathname === "/write"
              ? true
              : false
          }
        />
        <CommunityText
          isActive={
            window.location.pathname === "/community" ||
            window.location.pathname === "/write"
              ? true
              : false
          }
        >
          커뮤니티
        </CommunityText>
      </Link>
      <Link className="link" to={{ pathname: "/mypage" }} onClick={forceUpdate}>
        <StyledMyIconMypage
          isActive={window.location.pathname === "/mypage" ? true : false}
        />
        <MyPageText
          isActive={window.location.pathname === "/mypage" ? true : false}
        >
          마이페이지
        </MyPageText>
      </Link>
    </Container>
  );
};

export default Navigation;
const Container = styled.div`
  width: 100%;
  position: fixed;
  padding: 8px 16px 8px 25.5px;
  left: 50%;
  transform: translateX(-50%);
  bottom: 0;
  height: 56px;
  background-color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 2000;
  max-width: 420px;
  .link {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;

const HomeText = styled.div`
  color: ${(props) =>
    props.isActive
      ? props.theme.colors.MAIN_COLOR
      : props.theme.colors.GREY_30};
  font-size: 10px;
  margin-top: 4px;
  font-weight: 600;
`;

const SearchText = styled.div`
  color: ${(props) =>
    props.isActive
      ? props.theme.colors.MAIN_COLOR
      : props.theme.colors.GREY_30};
  font-size: 10px;
  margin-top: 4px;
  font-weight: 600;
`;

const FrigeText = styled.div`
  color: ${(props) =>
    props.isActive
      ? props.theme.colors.MAIN_COLOR
      : props.theme.colors.GREY_30};
  font-size: 10px;
  margin-top: 4px;
  font-weight: 600;
`;

const CommunityText = styled.div`
  color: ${(props) =>
    props.isActive
      ? props.theme.colors.MAIN_COLOR
      : props.theme.colors.GREY_30};
  font-size: 10px;
  margin-top: 4px;
  font-weight: 600;
`;

const MyPageText = styled.div`
  color: ${(props) =>
    props.isActive
      ? props.theme.colors.MAIN_COLOR
      : props.theme.colors.GREY_30};
  font-size: 10px;
  margin-top: 4px;
  font-weight: 600;
`;

const StyledMyIconHome = styled(Home)`
  ${(props) =>
    props.isActive &&
    css`
      path {
        stroke: ${(props) => props.theme.colors.MAIN_COLOR};
      }
    `}
`;
const StyledMyIconCommunity = styled(community)`
  ${(props) =>
    props.isActive &&
    css`
      path {
        stroke: ${(props) => props.theme.colors.MAIN_COLOR};
      }
    `}
`;
const StyledMyIconMypage = styled(mypage)`
  ${(props) =>
    props.isActive &&
    css`
      path {
        stroke: ${(props) => props.theme.colors.MAIN_COLOR};
      }
    `}
`;
const StyledMyIconRefrigerator = styled(refrigerator)`
  ${(props) =>
    props.isActive &&
    css`
      path {
        stroke: ${(props) => props.theme.colors.MAIN_COLOR};
      }
    `}
`;
const StyledMyIconSearch = styled(search)`
  ${(props) =>
    props.isActive &&
    css`
      path {
        stroke: ${(props) => props.theme.colors.MAIN_COLOR};
      }
    `}
`;

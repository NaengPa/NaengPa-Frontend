import React, { useCallback, useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { ReactComponent as Home } from "../assets/icon_home.svg";
import { ReactComponent as community } from "../assets/icon_community.svg";
import { ReactComponent as mypage } from "../assets/icon_mypage.svg";
import { ReactComponent as refrigerator } from "../assets/icon_refrigerator.svg";
import { ReactComponent as search } from "../assets/icon_search.svg";
import { css } from "styled-components";

const Navigation = () => {
  const [, updateState] = useState();
  const forceUpdate = useCallback(() => updateState({}), []);

  return (
    <Container>
      <Link to={{ pathname: "/" }} onClick={forceUpdate}>
        <StyledMyIconHome
          isActive={window.location.pathname === "/" ? true : false}
        />
      </Link>
      <Link to={{ pathname: "/search" }} onClick={forceUpdate}>
        <StyledMyIconSearch
          isActive={
            window.location.pathname === "/search" ||
            window.location.pathname.indexOf("/detail") !== -1
              ? true
              : false
          }
        />
      </Link>
      <Link to={{ pathname: "/myfrige" }} onClick={forceUpdate}>
        <StyledMyIconRefrigerator
          isActive={
            window.location.pathname === "/myfrige" ||
            window.location.pathname === "/frige"
              ? true
              : false
          }
        />
      </Link>
      <Link to={{ pathname: "/community" }} onClick={forceUpdate}>
        <StyledMyIconCommunity
          isActive={window.location.pathname === "/community" ? true : false}
        />
      </Link>
      <Link to={{ pathname: "/mypage" }} onClick={forceUpdate}>
        <StyledMyIconMypage
          isActive={window.location.pathname === "/mypage" ? true : false}
        />
      </Link>
    </Container>
  );
};

export default Navigation;
const Container = styled.div`
  width: 100%;
  position: fixed;
  padding: 22px 30px;
  left: 50%;
  transform: translateX(-50%);
  bottom: 0;
  height: 64px;
  background-color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 1056;
  max-width: 420px;
`;

const StyledMyIconHome = styled(Home)`
  ${(props) =>
    props.isActive &&
    css`
      path {
        stroke: #2e8cfe;
      }
    `}
`;
const StyledMyIconCommunity = styled(community)`
  ${(props) =>
    props.isActive &&
    css`
      path {
        stroke: #2e8cfe;
      }
    `}
`;
const StyledMyIconMypage = styled(mypage)`
  ${(props) =>
    props.isActive &&
    css`
      path {
        stroke: #2e8cfe;
      }
    `}
`;
const StyledMyIconRefrigerator = styled(refrigerator)`
  ${(props) =>
    props.isActive &&
    css`
      path {
        stroke: #2e8cfe;
      }
    `}
`;
const StyledMyIconSearch = styled(search)`
  ${(props) =>
    props.isActive &&
    css`
      path {
        stroke: #2e8cfe;
      }
    `}
`;

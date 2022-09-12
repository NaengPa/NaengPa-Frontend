import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { ReactComponent as XButton } from "../../assets/X_InActive.svg";
import KakaoShare from "./kakaoShare";
import LinkShare from "./linkShare";
import FacebookShare from "./facebookShare";

const ShareModal = ({ show, setShowModal, recipeDetail }) => {
  useEffect(() => {
    // setFilterItemState(filterItem);
    document.body.style.cssText = `
      position: fixed; 
      top: -${window.scrollY}px;
      overflow-y: scroll;
      width: 100%;`;
    return () => {
      const scrollY = document.body.style.top;
      document.body.style.cssText = "";
      window.scrollTo(0, parseInt(scrollY || "0", 10) * -1);
    };
  }, []); // 화면이 스크롤이 안되고 화면외에 클릭안되게
  const modalRef = useRef(); //화면 외부 클릭하면 창이 닫히게
  useEffect(() => {
    document.addEventListener("mousedown", clickModalOutside);

    return () => {
      document.removeEventListener("mousedown", clickModalOutside);
    };
  });

  const clickModalOutside = (event) => {
    if (!modalRef.current.contains(event.target)) {
      setShowModal(false);
    }
  };

  return (
    <Container>
      <ModalBackground></ModalBackground>
      <ModalContainer ref={modalRef}>
        <ModalHeader>
          <EmptySpcae />
          <ModalText>공유하기</ModalText>
          <StyledMyIcon onClick={() => setShowModal(false)}></StyledMyIcon>
        </ModalHeader>
        <ModalMain>
          <ShareWrapper>
            <LinkShare></LinkShare>
            <ShareTitle>링크 공유</ShareTitle>
          </ShareWrapper>
          <ShareWrapper>
            <KakaoShare recipeDetail={recipeDetail}></KakaoShare>
            <ShareTitle>카카오톡</ShareTitle>
          </ShareWrapper>
          <ShareWrapper>
            <FacebookShare></FacebookShare>
            <ShareTitle>페이스북</ShareTitle>
          </ShareWrapper>
        </ModalMain>
      </ModalContainer>
    </Container>
  );
};

export default ShareModal;

const Container = styled.div`
  position: absolute;
  z-index: 1000;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  padding: 16px;
`;

const ModalBackground = styled.div`
  position: absolute;
  z-index: 1001;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: black;
  opacity: 0.5;
`;

const ModalContainer = styled.div`
  width: calc(100% - 32px);
  height: 200px;
  background-color: ${({ theme }) => theme.colors.WHITE};
  position: absolute;
  top: 300px;
  z-index: 1002;
  padding: 16px;
  border-radius: 4px;
`;

const EmptySpcae = styled.div`
  width: 32px;
  height: 32px;
`;

const ModalHeader = styled.div`
  display: flex;
  width: calc(100% + 16 * 2);
  margin: 0 -16px 0 -16px;
  justify-content: space-between;
  border-bottom: 1px solid ${({ theme }) => theme.colors.GREY_70};
`;

const ModalText = styled.div`
  font-weight: 600;
  text-align: center;
`;

const ModalMain = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 35px 19px 35px 19px;
`;

const ShareWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ShareTitle = styled.div`
  margin-top: 19px;
  color: ${({ theme }) => theme.colors.GREY_70};
  font-size: 13px;
  font-weight: 600;
`;

const StyledMyIcon = styled(XButton)`
  cursor: pointer;
`;
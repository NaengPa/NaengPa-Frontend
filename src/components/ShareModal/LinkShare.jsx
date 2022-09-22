import React from "react";
import styled from "styled-components";
import { ReactComponent as LinkShareButton } from "../../assets/linkShare.svg";

const LinkShare = () => {
  const handleLinkCopy = () => {
    const result = async () => {
      const currentUrl = window.location.href;
      await navigator.clipboard.writeText(currentUrl); // 클립보드 복사 로직
      alert("클립보드에 복사되었습니다.");
    };
    result();
  };

  return (
    <Container onClick={handleLinkCopy}>
      <LinkShareButton></LinkShareButton>
    </Container>
  );
};

export default LinkShare;

const Container = styled.div`
  width: 45px;
  height: 45px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.MAIN_COLOR};
  cursor: pointer;
`;

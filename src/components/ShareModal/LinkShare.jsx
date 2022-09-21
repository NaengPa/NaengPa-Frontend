import React from "react";
import styled from "styled-components";
import { ReactComponent as LinkShareButton } from "../../assets/linkShare.svg";

const LinkShare = () => {
  const handleLinkCopy = () => {
    const textarea = document.createElement("textarea");
    const currentUrl = window.location.href;
    textarea.value = currentUrl;
    textarea.style.top = 0;
    textarea.style.left = 0;
    textarea.style.position = "fixed";

    document.body.appendChild(textarea);
    textarea.focus();
    textarea.select();
    document.execCommand("copy");
    document.body.removeChild(textarea);
    alert("클립보드에 복사되었습니다.");
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

import styled from "styled-components";
import CommunityArticle from "../../components/CommunityArticle";
import ArticleWriteBtn from "../../components/ArticleWriteBtn";
import { getArticle } from "../../common/axios";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { articleAtom, articleDeleteAtom } from "../../atom";
import ArticleDeleteModal from "../../components/ArticleDeleteModal";

const CommunityWrapper = styled.div`
  padding: 40px 16px 56px 16px;
  background-color: #ffffff;
  overflow-y: scroll;
  height: 100vh;
  ::-webkit-scrollbar {
    display: none;
  }
  width: 100%;
  max-width: 420px;
`;

const CommunityTitle = styled.span`
  font-weight: 600;
  font-size: 24px;
  line-height: 30px;
  color: ${(props) => props.theme.colors.GREY_90};
  white-space: pre-wrap;
  margin-bottom: 16px;
`;

const BtnContainer = styled.div`
  position: fixed;
  display: ${(props) => (props.width ? "flex" : "none")};
  left: calc(50vw - 70px + ${(props) => props.width / 2}px);
  z-index: 30;
`;

function Community() {
  const [article, setArticle] = useRecoilState(articleAtom);
  const isDeleteModalOpen = useRecoilValue(articleDeleteAtom);
  const communityRef = useRef();

  const get = async () => {
    if (localStorage.getItem("userInfo")) {
      const result = await getArticle(
        JSON.parse(localStorage.getItem("userInfo")).email
      );
      setArticle(result);
    } else {
      const result = await getArticle();
      setArticle(result);
    }
  };

  useEffect(() => {
    get();
  }, []);

  return (
    <>
      {isDeleteModalOpen ? <ArticleDeleteModal /> : null}
      <CommunityWrapper ref={communityRef}>
        <CommunityTitle>
          내가 만든 냉파 레시피{"\n"}자랑해봐요 👀
        </CommunityTitle>
        {article.map((item) => (
          <CommunityArticle {...item} key={item.id} />
        ))}
        <BtnContainer width={communityRef.current?.offsetWidth}>
          <ArticleWriteBtn />
        </BtnContainer>
      </CommunityWrapper>
    </>
  );
}

export default Community;

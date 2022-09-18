import styled from "styled-components";
import CommunityArticle from "../../components/CommunityPage/CommunityArticle";
import ArticleWriteBtn from "../../components/CommunityPage/ArticleWriteBtn";
import { getArticle } from "../../common/axios";
import { useLayoutEffect, useRef, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { articleAtom, articleDeleteAtom } from "../../atom";

import ArticleDeleteModal from "../../components/CommunityPage/ArticleDeleteModal";
import LoadingScreen from "../../components/LoadingScreen";
import LoadingPortal from "../../components/LoadingPortal";
import ShareModal from "../../components/ShareModal/shareModal";

const CommunityWrapper = styled.div`
  padding: 40px 16px 56px 16px;
  background-color: #ffffff;
  overflow-y: scroll;
  height: calc(var(--vh, 1vh) * 100);
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
  const [isLoading, setIsLoading] = useState(false);
  // const [showModal, setShowModal] = useState(false);
  const communityRef = useRef();

  console.log(article);
  const get = async () => {
    if (localStorage.getItem("userInfo")) {
      setIsLoading(true);
      const result = await getArticle(
        JSON.parse(localStorage.getItem("userInfo")).email
      );
      setArticle(result);
      setIsLoading(false);
    } else {
      setIsLoading(true);
      const result = await getArticle();
      setArticle(result);
      setIsLoading(false);
    }
  };

  useLayoutEffect(() => {
    console.log(article);
    get();
  }, []);

  return (
    <>
      <LoadingPortal>{isLoading ? <LoadingScreen /> : null}</LoadingPortal>
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

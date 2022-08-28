import styled from "styled-components";
import CommunityArticle from "../../components/CommunityArticle";
import ArticleWriteBtn from "../../components/ArticleWriteBtn";
import { getArticle } from "../../common/axios";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import {
  articleAtom,
  articleDeleteAtom,
  articleDeleteIdAtom,
} from "../../atom";
import ArticleDeleteModal from "../../components/ArticleDeleteModal";

const CommunityWrapper = styled.div`
  padding: 10vh 16px 56px 16px;
  overflow-y: scroll;
  height: 100vh;
  ::-webkit-scrollbar {
    display: none;
  }
  width: 100%;
`;

const CommunityTitle = styled.span`
  font-weight: 600;
  font-size: 24px;
  line-height: 30px;
  color: #132029;
  white-space: pre-wrap;
`;

function Community() {
  const [article, setArticle] = useRecoilState(articleAtom);
  const [deleteArticleId, setDeleteArticleId] =
    useRecoilState(articleDeleteIdAtom);
  const [isDeleteModalOpen, setIsDeleteModalOpen] =
    useRecoilState(articleDeleteAtom);

  useEffect(() => {
    async function get() {
      const result = await getArticle();
      setArticle(result);
    }
    get();
  }, []);
  console.log(isDeleteModalOpen);
  console.log(article);
  return (
    <>
      {isDeleteModalOpen ? (
        <ArticleDeleteModal
          isDeleteModalOpen={isDeleteModalOpen}
          setIsDeleteModalOpen={setIsDeleteModalOpen}
        />
      ) : null}
      <CommunityWrapper>
        <CommunityTitle>내가 만든 냉파 레시피{"\n"}자랑해봐요</CommunityTitle>
        {article.map((item) => (
          <CommunityArticle {...item} key={item.id} />
        ))}
        <ArticleWriteBtn />
      </CommunityWrapper>
    </>
  );
}

export default Community;

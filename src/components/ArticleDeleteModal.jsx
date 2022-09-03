import { useEffect } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { articleAtom, articleDeleteAtom, articleDeleteIdAtom } from "../atom";
import { deleteArticle } from "../common/axios";

const DeleteModalWrapper = styled.div`
  position: absolute;
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
`;

const DeleteModalContainer = styled.div`
  width: 301px;
  height: 188px;
  background: ${(props) => props.theme.colors.GREY_5};
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  justify-content: center;
  z-index: 102;
`;

const DeleteModalTitle = styled.span`
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 20px;
  text-align: center;
  color: ${(props) => props.theme.colors.GREY_90};
  white-space: pre-wrap;
`;

const DeleteModalEmoji = styled.span`
  font-style: normal;
  font-weight: 600;
  font-size: 45px;
  line-height: 56px;
`;

const DeleteModalDimmer = styled.div`
  position: absolute;
  background: #3030305a;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  width: 100%;
  height: 100vh;
  z-index: 101;
`;

const DeleteBtnContainer = styled.div`
  display: flex;
  gap: 16px;
  margin-top: 20px;
`;
const DeleteBtn = styled.button`
  width: 120px;
  height: 40px;
  background: ${(props) => props.theme.colors.MAIN_COLOR};
  border-radius: 5px;
  font-weight: 600;
  font-size: 16px;
  line-height: 20px;
  text-align: center;
  color: #ffffff;
`;

const CancelBtn = styled.button`
  width: 120px;
  height: 40px;
  background: ${(props) => props.theme.colors.GREY_30};
  border-radius: 5px;
  font-weight: 600;
  font-size: 16px;
  line-height: 20px;
  text-align: center;
  color: #ffffff;
`;

function ArticleDeleteModal() {
  const [deleteArticleId, setDeleteArticleId] =
    useRecoilState(articleDeleteIdAtom);
  const setIsDeleteModalOpen = useSetRecoilState(articleDeleteAtom);
  const [article, setArticle] = useRecoilState(articleAtom);

  const handleModal = (e) => {
    setDeleteArticleId("");
    setIsDeleteModalOpen(false);
  };

  useEffect(() => {
    return () => handleModal();
  }, []);
  //TODO 기록 남기기. 언마운트 시점에 모달을 사라지게 만듦

  const onDeleteBtnClick = (e) => {
    setArticle(
      (prev) => prev.filter((item) => item.id !== deleteArticleId)

      // let targetArticle;
      // article.forEach((item) => {
      //   if (item.id === deleteArticleId) {
      //     targetArticle = article.indexOf(item);
      //   }
      // });

      // const copiedArticle = [...article];
      // copiedArticle.splice(article.indexOf(targetArticle) - 1, 1);
      // console.log(copiedArticle);
      // return copiedArticle;
      //TODO-Done 삭제하는 방식을 index로 하면 여러개 삭제할 경우 꼬이게됨. 다른 방법을 찾자. 기록하기
    );
    deleteArticle(
      deleteArticleId,
      JSON.parse(localStorage.getItem("userInfo")).email
    );
    setDeleteArticleId("");
    handleModal();
  };

  return (
    <DeleteModalWrapper>
      <DeleteModalDimmer onClick={handleModal} />
      <DeleteModalContainer>
        <DeleteModalEmoji>🤔</DeleteModalEmoji>
        <DeleteModalTitle>
          삭제된 글은 복구할 수 없어요.{"\n"}정말 삭제할까요?
        </DeleteModalTitle>
        <DeleteBtnContainer>
          <CancelBtn onClick={handleModal}>취소</CancelBtn>
          <DeleteBtn onClick={onDeleteBtnClick}>삭제</DeleteBtn>
        </DeleteBtnContainer>
      </DeleteModalContainer>
    </DeleteModalWrapper>
  );
}
export default ArticleDeleteModal;

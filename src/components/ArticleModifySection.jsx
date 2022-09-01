import { useRef } from "react";
import { Link } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { ReactComponent as Edit } from "../assets/edit.svg";
import { ReactComponent as ArticleDeleteIcon } from "../assets/articleDelete.svg";
import { articleDeleteAtom, articleDeleteIdAtom } from "../atom";

const RightIconsContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;
const DeleteBtn = styled.button`
  display: none;
`;

function ArticleModifySection({ id, nickname, imgs, content }) {
  const setDeleteArticleId = useSetRecoilState(articleDeleteIdAtom);
  const setIsDeleteModalOpen = useSetRecoilState(articleDeleteAtom);
  const deleteBtn = useRef();

  const onDeleteIconClick = () => {
    deleteBtn.current.click();
  };

  const onDeleteBtnClick = (event) => {
    event.preventDefault();
    setDeleteArticleId(id);
    setIsDeleteModalOpen((prev) => !prev);
  };

  return (
    <RightIconsContainer>
      <Link
        to={{ pathname: "/edit" }}
        state={{ nickname: nickname, imgs: imgs, content: content, id: id }}
      >
        <Edit />
      </Link>
      <DeleteBtn ref={deleteBtn} onClick={onDeleteBtnClick} />
      <ArticleDeleteIcon onClick={onDeleteIconClick} />
    </RightIconsContainer>
  );
}
export default ArticleModifySection;

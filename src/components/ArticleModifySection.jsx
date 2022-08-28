import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { ReactComponent as Edit } from "../assets/Write.svg";
import { ReactComponent as Xicon } from "../assets/X_InActive.svg";
import { articleDeleteAtom } from "../atom";
import ArticleDeleteModal from "./ArticleDeleteModal";

const RightIconsContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;
const DeleteBtn = styled.button`
  display: none;
`;

function ArticleModifySection({ id }) {
  const [isDeleteModalOpen, setIsDeleteModalOpen] =
    useRecoilState(articleDeleteAtom);
  const deleteBtn = useRef();

  const onDeleteIconClick = () => {
    deleteBtn.current.click();
  };

  const onDeleteBtnClick = (event) => {
    event.preventDefault();
    setIsDeleteModalOpen(id);
  };

  return (
    <>
      <RightIconsContainer>
        <Link to={{ pathname: "/edit" }}>
          <Edit />
        </Link>
        <DeleteBtn ref={deleteBtn} onClick={onDeleteBtnClick} />
        <Xicon onClick={onDeleteIconClick} />
      </RightIconsContainer>
      {/* 
      {isDeleteModalOpen ? (
        <ArticleDeleteModal
          isDeleteModalOpen={isDeleteModalOpen}
          setIsDeleteModalOpen={setIsDeleteModalOpen}
        />
      ) : null} */}
    </>
  );
}
export default ArticleModifySection;

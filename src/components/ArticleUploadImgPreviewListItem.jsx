import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { ReactComponent as DeleteBtnIcon } from "../assets/delete.svg";
import { articleImgAtom, articlePreviewImgAtom } from "../atom";

const UploadImgPreviewListItemContainer = styled.div`
  display: flex;
  position: relative;
  margin-right: 4px;
`;

const PreviewImg = styled.img`
  width: 56px;
  height: 56px;
  border-radius: 5px;
  object-fit: cover;
`;

const DeleteBtn = styled.button`
  position: absolute;
  right: -4px;
  top: -4px;
  width: 18px;
  height: 18px;
  min-width: 18px;
  min-height: 18px;
  background: #0091ff;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

function ArticleUploadImgPreviewListItem({ imgData, idx }) {
  const setImgList = useSetRecoilState(articleImgAtom);
  const setPreviewImgList = useSetRecoilState(articlePreviewImgAtom);

  const onDeleteClick = (event) => {
    setImgList((prev) => {
      const copiedList = [...prev];
      copiedList.splice(idx, 1);
      return copiedList;
    });
    setPreviewImgList((prev) => {
      const copiedList = [...prev];
      copiedList.splice(idx, 1);
      return copiedList;
    });
  };

  return (
    <UploadImgPreviewListItemContainer>
      <PreviewImg src={URL.createObjectURL(imgData)} />
      <DeleteBtn onClick={onDeleteClick}>
        <DeleteBtnIcon />
      </DeleteBtn>
    </UploadImgPreviewListItemContainer>
  );
}
export default ArticleUploadImgPreviewListItem;

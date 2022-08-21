import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { ReactComponent as DeleteBtnIcon } from "../../assets/delete.svg";
import { articleImgAtom } from "../../atom";

const ImgPreviewListItemContainer = styled.div`
  display: flex;
  position: relative;
`;

const PreviewImg = styled.img`
  width: 56px;
  height: 56px;
  border-radius: 5px;
`;

const DeleteBtn = styled.button`
  position: absolute;
  right: -4px;
  top: -4px;
  width: 18px;
  height: 18px;
  background: #0091ff;
  border-radius: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

function ImgPreviewListItem({ imgData, idx }) {
  const setImgList = useSetRecoilState(articleImgAtom);

  const onDeleteClick = (event) => {
    setImgList((prev) => {
      const copiedList = [...prev];
      copiedList.splice(idx, 1);
      return copiedList;
    });
  };

  return (
    <ImgPreviewListItemContainer>
      <PreviewImg src={URL.createObjectURL(imgData)} />
      <DeleteBtn onClick={onDeleteClick}>
        <DeleteBtnIcon />
      </DeleteBtn>
    </ImgPreviewListItemContainer>
  );
}
export default ImgPreviewListItem;

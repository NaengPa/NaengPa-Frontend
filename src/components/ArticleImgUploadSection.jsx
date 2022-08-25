import { useRef } from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { articleImgAtom } from "../atom";
import ArticleUploadImgPreviewList from "./ArticleUploadImgPreviewList";
import { ReactComponent as ImgUploadIcon } from "../assets/Picture.svg";

const ImgUploadSectionWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const Input = styled.input`
  display: none;
`;

const ImgUploadBtn = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-width: 56px;
  height: 56px;
  border: 1px solid #b6c4cf;
  border-radius: 5px;
  margin: 10px 8px 0 0;
  cursor: pointer;
`;

const ImgUploadCnt = styled.span`
  font-weight: 600;
  font-size: 14px;
  line-height: 17px;
  text-align: center;
  color: #132029;
`;

function ArticleImgUploadSection() {
  const [imgList, setImgList] = useRecoilState(articleImgAtom);
  const ImgUploadInput = useRef();
  // const formData = new FormData();
  const onImgChange = (event) => {
    event.preventDefault();
    [...event.target.files].forEach((element) => {
      setImgList((prev) => [...prev, element]);
    });
    event.target.value = "";
  };

  const onImgUploadBtnClick = (event) => {
    ImgUploadInput.current.click();
  };

  return (
    <ImgUploadSectionWrapper>
      <Input
        type="file"
        accept="image/*"
        multiple
        max={10 - imgList.length}
        ref={ImgUploadInput}
        onChange={onImgChange}
      />
      <ImgUploadBtn onClick={onImgUploadBtnClick}>
        {/* TODO: 10장되면 비활성상태 */}
        <ImgUploadIcon />
        <ImgUploadCnt>{imgList.length}/10</ImgUploadCnt>
      </ImgUploadBtn>
      <ArticleUploadImgPreviewList />
    </ImgUploadSectionWrapper>
  );
}

export default ArticleImgUploadSection;

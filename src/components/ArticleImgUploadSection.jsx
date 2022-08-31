import { useRef } from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { articleImgAtom, articlePreviewImgAtom } from "../atom";
import ArticleUploadImgPreviewList from "./ArticleUploadImgPreviewList";
import { ReactComponent as ImgUploadIcon } from "../assets/camera.svg";

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
  border: 1px solid ${(props) => props.theme.colors.GREY_30};
  border-radius: 5px;
  margin: 10px 8px 0 0;
  cursor: pointer;
`;

const ImgUploadCnt = styled.span`
  font-weight: 600;
  font-size: 14px;
  line-height: 17px;
  text-align: center;
  color: ${(props) => props.theme.colors.GREY_90};
`;

function ArticleImgUploadSection() {
  const [imgList, setImgList] = useRecoilState(articleImgAtom);
  const [previewImgList, setPreviewImgList] = useRecoilState(
    articlePreviewImgAtom
  );
  const ImgUploadInput = useRef();
  const onImgChange = (event) => {
    event.preventDefault();
    [...event.target.files].forEach((element) => {
      let reader = new FileReader();
      reader.readAsDataURL(element);
      reader.onloadend = () => {
        setPreviewImgList((prev) => [...prev, element]);
        setImgList((prev) => [...prev, reader.result]);
      };
      console.log(previewImgList);
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

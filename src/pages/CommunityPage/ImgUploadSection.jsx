import { useEffect, useRef } from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { articleImgAtom } from "../../atom";
import ImgPreviewList from "./ImgPreviewList";

const ImgUploadSectionWrapper = styled.div`
  display: flex;
`;

const Input = styled.input`
  display: none;
`;

function ImgUploadSection() {
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
      <Input type="file" multiple ref={ImgUploadInput} onChange={onImgChange} />
      <button onClick={onImgUploadBtnClick}>dd</button>
      <ImgPreviewList />
    </ImgUploadSectionWrapper>
  );
}

export default ImgUploadSection;

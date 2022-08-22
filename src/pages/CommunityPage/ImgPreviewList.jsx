import { useRecoilValue } from "recoil";
import { articleImgAtom } from "../../atom";
import ImgPreviewListItem from "./ImgPreviewListItem";
import styled from "styled-components";

const ImgPreviewListWrapper = styled.div`
  display: flex;
  overflow-x: scroll;
  gap: 10px;
  padding-top: 10px;
  ::-webkit-scrollbar {
    display: none;
  }
`;

function ImgPreviewList() {
  const imgList = useRecoilValue(articleImgAtom);
  return (
    <ImgPreviewListWrapper>
      {imgList.map((item, idx) => {
        return <ImgPreviewListItem imgData={item} key={idx} idx={idx} />; //TODO: unique한 key 부여하기
      })}
    </ImgPreviewListWrapper>
  );
}
export default ImgPreviewList;

import { useRecoilValue } from "recoil";
import { articlePreviewImgAtom } from "../atom";
import ArticleUploadImgPreviewListItem from "./ArticleUploadImgPreviewListItem";
import styled from "styled-components";

const UploadImgPreviewListWrapper = styled.div`
  display: flex;
  overflow-x: scroll;
  gap: 10px;
  padding-top: 10px;
  ::-webkit-scrollbar {
    display: none;
  }
`;

function ArticleUploadImgPreviewList() {
  const imgPreviewList = useRecoilValue(articlePreviewImgAtom);
  console.log(imgPreviewList);
  return (
    <UploadImgPreviewListWrapper>
      {imgPreviewList.map((item, idx) => {
        return (
          <ArticleUploadImgPreviewListItem imgData={item} key={idx} idx={idx} />
        ); //TODO: unique한 key 부여하기
      })}
    </UploadImgPreviewListWrapper>
  );
}
export default ArticleUploadImgPreviewList;

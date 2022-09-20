import { useRecoilValue } from "recoil";
import { articlePreviewImgAtom } from "../../atom";
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

  return (
    <UploadImgPreviewListWrapper>
      {imgPreviewList.map((item, idx) => {
        return (
          <ArticleUploadImgPreviewListItem imgData={item} key={idx} idx={idx} />
        );
      })}
    </UploadImgPreviewListWrapper>
  );
}
export default ArticleUploadImgPreviewList;

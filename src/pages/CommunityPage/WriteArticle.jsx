import styled from "styled-components";
import GoBackButton from "../../components/goBackButton";
import ArticleUploadBtn from "./ArticleUploadBtn";
import ImgUploadSection from "./ImgUploadSection";

const WriteArticleWrapper = styled.div`
  padding: 10vh 16px 16px 16px;
  overflow-y: scroll;
  height: 100vh;
  ::-webkit-scrollbar {
    display: none;
  }
`;

const WriteArticleHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const Title = styled.h1`
  margin: 0;
`;

function WriteArticle() {
  return (
    <WriteArticleWrapper>
      <WriteArticleHeader>
        <GoBackButton />
        <Title>글쓰기</Title>
        <ArticleUploadBtn />
      </WriteArticleHeader>
      <ImgUploadSection />
    </WriteArticleWrapper>
  );
}

export default WriteArticle;

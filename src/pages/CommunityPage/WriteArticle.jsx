import styled from "styled-components";
import GoBackButton from "../../components/goBackButton";
import ArticleUploadBtn from "../../components/ArticleUploadBtn";
import Divider from "../../components/Divider";
import ArticleImgUploadSection from "../../components/ArticleImgUploadSection";
import ArticleTextInput from "../../components/ArticleTextInput";

const WriteArticleWrapper = styled.div`
  padding: 10vh 16px 16px 16px;
  overflow-y: hidden;
  height: 100vh;
  ::-webkit-scrollbar {
    display: none;
  }
`;

const WriteArticleHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 40px;
`;
const Title = styled.h1`
  margin: 0;
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 20px;
  color: #132029;
`;

function WriteArticle() {
  return (
    <WriteArticleWrapper>
      <WriteArticleHeader>
        <GoBackButton />
        <Title>글쓰기</Title>
        <ArticleUploadBtn />
      </WriteArticleHeader>
      <ArticleImgUploadSection />
      <Divider />
      <ArticleTextInput />
    </WriteArticleWrapper>
  );
}

export default WriteArticle;

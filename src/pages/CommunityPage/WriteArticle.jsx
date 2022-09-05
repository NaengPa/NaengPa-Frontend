import styled from "styled-components";
import ArticleUploadBtn from "../../components/CommunityPage/ArticleUploadBtn";
import Divider from "../../components/CommunityPage/Divider";
import ArticleImgUploadSection from "../../components/CommunityPage/ArticleImgUploadSection";
import ArticleTextInput from "../../components/CommunityPage/ArticleTextInput";
import PreviousPageBtn from "../../components/PreviousPageBtn";

const WriteArticleWrapper = styled.div`
  padding: 0 16px 16px 16px;
  background-color: #ffffff;
  overflow-y: hidden;
  height: calc(var(--vh, 1vh) * 100);
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
  color: ${(props) => props.theme.colors.GREY_90};
`;

function WriteArticle() {
  return (
    <WriteArticleWrapper>
      <WriteArticleHeader>
        <PreviousPageBtn />
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

import styled from "styled-components";
import GoBackButton from "../../components/GoBackButton";
import ArticleUploadBtn from "../../components/CommunityPage/ArticleUploadBtn";
import Divider from "../../components/CommunityPage/Divider";
import ArticleImgUploadSection from "../../components/CommunityPage/ArticleImgUploadSection";
import ArticleTextInput from "../../components/CommunityPage/ArticleTextInput";

const WriteArticleWrapper = styled.div`
  padding: 10vh 16px 16px 16px;
  background-color: #ffffff;
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
  color: ${(props) => props.theme.colors.GREY_90};
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

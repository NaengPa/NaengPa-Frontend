import styled from "styled-components";
import GoBackButton from "../../components/goBackButton";
import ArticleUploadBtn from "../../components/ArticleUploadBtn";
import { useLocation } from "react-router-dom";
import ArticleImgCarousel from "../../components/ArticleImgCarousel";
import ArticleEditInput from "../../components/ArticleEditInput";

const EditArticleWrapper = styled.div`
  padding: 10vh 16px 16px 16px;
  overflow-y: scroll;
  height: 100vh;
  ::-webkit-scrollbar {
    display: none;
  }
`;

const EditArticleHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 40px;
  margin-bottom: 16px;
`;
const Title = styled.h1`
  margin: 0;
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 20px;
  color: ${(props) => props.theme.colors.GREY_90};
`;

const UserContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 8px;
`;

const UserProfileImg = styled.img`
  width: 40px;
  height: 40px;
  background: ${(props) => props.theme.colors.GREY_30};
  border-radius: 50%;
  object-fit: cover;
`;

const UserId = styled.span`
  font-weight: 600;
  font-size: 16px;
  line-height: 20px;
  color: ${(props) => props.theme.colors.GREY_90};
  margin-left: 8px;
`;

function EditArticle() {
  const location = useLocation();
  console.log(location);
  const nickname = location.state.nickname;
  const imgs = location.state.imgs;
  const content = location.state.content;
  return (
    <EditArticleWrapper>
      <EditArticleHeader>
        <GoBackButton />
        <Title>게시글 수정</Title>
        <ArticleUploadBtn />
      </EditArticleHeader>

      <UserContainer>
        <UserProfileImg src="https://image.ytn.co.kr/general/jpg/2021/0311/202103110915014429_d.jpg" />
        <UserId>{nickname}</UserId>
      </UserContainer>
      <ArticleImgCarousel imgs={imgs} />
      <ArticleEditInput content={content} />
    </EditArticleWrapper>
  );
}

export default EditArticle;

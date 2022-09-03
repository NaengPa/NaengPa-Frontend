import styled from "styled-components";

import { useLocation } from "react-router-dom";
import ArticleImgCarousel from "../../components/CommunityPage/ArticleImgCarousel";
import ArticleEditInput from "../../components/CommunityPage/ArticleEditInput";
import ArticleEditCompleteBtn from "../../components/CommunityPage/ArticleEditCompleteBtn";
import PreviousPageBtn from "../../components/PreviousPageBtn";

const EditArticleWrapper = styled.div`
  padding: 10vh 16px 16px 16px;
  background-color: #ffffff;
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
  const nickname = location.state.nickname;
  const imgs = location.state.imgs;
  const content = location.state.content;
  const id = location.state.id;
  return (
    <EditArticleWrapper>
      <EditArticleHeader>
        <PreviousPageBtn />
        <Title>게시글 수정</Title>
        <ArticleEditCompleteBtn id={id} />
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

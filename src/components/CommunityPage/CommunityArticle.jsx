import styled from "styled-components";
import { ReactComponent as Share } from "../../assets/shareBlack.svg";
import ArticleImgCarousel from "./ArticleImgCarousel";
import ArticleModifySection from "./ArticleModifySection";
import ArticleLike from "./ArticleLike";

const ArticleContainer = styled.div`
  width: 100%;
  padding: 16px 0;
`;

const ArticleHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const UserContainer = styled.div`
  display: flex;
  align-items: center;
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

const ArticleActionContainer = styled.div`
  margin: 8px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ArticleText = styled.span`
  display: flex;
  width: 100%;
  font-weight: 600;
  font-size: 13px;
  line-height: 20px;
  letter-spacing: -0.005em;
  color: ${(props) => props.theme.colors.GREY_90};
  margin-bottom: 16px;
`;

function CommunityArticle({
  content,
  email,
  id,
  imgUrl,
  imgs,
  likeYn,
  likes,
  nickname,
  recipeId,
}) {
  return (
    <ArticleContainer>
      <ArticleHeader>
        <UserContainer>
          <UserProfileImg src={imgUrl} />
          <UserId>{nickname}</UserId>
        </UserContainer>
        {email === JSON.parse(localStorage.getItem("userInfo"))?.email ? (
          <ArticleModifySection
            id={id}
            nickname={nickname}
            imgs={imgs}
            content={content}
          />
        ) : null}
      </ArticleHeader>

      <ArticleImgCarousel imgs={imgs} />

      <ArticleActionContainer>
        <ArticleLike likeYn={likeYn} likes={likes} id={id} />
        <Share />
      </ArticleActionContainer>
      <ArticleText>{content}</ArticleText>
    </ArticleContainer>
  );
}

export default CommunityArticle;

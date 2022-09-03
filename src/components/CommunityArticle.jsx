import styled from "styled-components";
import { ReactComponent as Like } from "../assets/heartInactiveBlack.svg";
import { ReactComponent as Share } from "../assets/shareBlack.svg";

import ReferredRecipeCard from "./ReferredRecipeCard";
import ArticleImgCarousel from "./ArticleImgCarousel";
import ArticleModifySection from "./ArticleModifySection";

const ArticleContainer = styled.div`
  width: 100%;
  padding: 16px 0;
`;

const ArticleHeader = styled.div`
  margin-top: 16px;
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

const LikeContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const LikeCount = styled.span`
  margin: 0;
  font-weight: 600;
  font-size: 14px;
  line-height: 17px;
  color: ${(props) => props.theme.colors.GREY_90};
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
    <>
      <ArticleHeader>
        <UserContainer>
          <UserProfileImg src="https://image.ytn.co.kr/general/jpg/2021/0311/202103110915014429_d.jpg" />
          <UserId>{nickname}</UserId>
        </UserContainer>
        <ArticleModifySection
          id={id}
          nickname={nickname}
          imgs={imgs}
          content={content}
        />
      </ArticleHeader>

      <ArticleImgCarousel imgs={imgs} />

      <ArticleActionContainer>
        <LikeContainer>
          <Like />
          <LikeCount>{likes}</LikeCount>
        </LikeContainer>
        <Share />
      </ArticleActionContainer>
      <ArticleText>{content}</ArticleText>
      {recipeId !== 0 && <ReferredRecipeCard />}
    </>
  );
}

export default CommunityArticle;
import styled from "styled-components";
import { ReactComponent as Like } from "../assets/Heart_InActive.svg";
import { ReactComponent as Share } from "../assets/share.svg";
import { ReactComponent as Bookmark } from "../assets/Bookmark_InActive.svg";
import ReferredRecipeCard from "./ReferredRecipeCard";
import { propTypes } from "react-bootstrap/esm/Image";
import ArticleImgCarousel from "./ArticleImgCarousel";

const ArticleUserContainer = styled.div`
  margin-top: 16px;
`;

const UserProfileImg = styled.img`
  width: 40px;
  height: 40px;
  background: #b6c4cf;
  border-radius: 50%;
  object-fit: cover;
`;

const UserId = styled.span`
  font-weight: 600;
  font-size: 16px;
  line-height: 20px;
  color: #132029;
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
  color: #132029;
`;

const RightIconsContainer = styled.div`
  display: flex;
  gap: 8px;
`;

const ArticleText = styled.span`
  display: flex;
  width: 100%;
  font-weight: 600;
  font-size: 13px;
  line-height: 20px;
  letter-spacing: -0.005em;
  color: #132029;
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
      <ArticleUserContainer>
        <UserProfileImg src="https://image.ytn.co.kr/general/jpg/2021/0311/202103110915014429_d.jpg" />
        <UserId>{nickname}</UserId>
      </ArticleUserContainer>

      <ArticleImgCarousel imgs={imgs} />

      <ArticleActionContainer>
        <LikeContainer>
          <Like />
          <LikeCount>{likes}</LikeCount>
        </LikeContainer>
        <RightIconsContainer>
          <Share />
          <Bookmark />
        </RightIconsContainer>
      </ArticleActionContainer>
      <ArticleText>{content}</ArticleText>
      {recipeId !== 0 && <ReferredRecipeCard />}
    </>
  );
}

export default CommunityArticle;

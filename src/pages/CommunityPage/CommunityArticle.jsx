import styled from "styled-components";
import { ReactComponent as Like } from "../../assets/Heart_InActive.svg";
import { ReactComponent as Share } from "../../assets/share.svg";
import { ReactComponent as Bookmark } from "../../assets/Bookmark_InActive.svg";
import ReferredRecipeCard from "./ReferredRecipeCard";

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

const ArticleImg = styled.img`
  width: 100%;
  height: 310px;
  background: #b6c4cf;
  border-radius: 5px;
  object-fit: cover;
  margin-top: 8px;
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

function CommunityArticle() {
  return (
    <>
      <ArticleUserContainer>
        <UserProfileImg src="https://image.ytn.co.kr/general/jpg/2021/0311/202103110915014429_d.jpg" />
        <UserId>asdfasd</UserId>
      </ArticleUserContainer>
      <ArticleImg src="https://image.ytn.co.kr/general/jpg/2021/0311/202103110915014429_d.jpg" />
      <ArticleActionContainer>
        <LikeContainer>
          <Like />
          <LikeCount>123</LikeCount>
        </LikeContainer>
        <RightIconsContainer>
          <Share />
          <Bookmark />
        </RightIconsContainer>
      </ArticleActionContainer>
      <ArticleText>
        마침 집에 배도 있고 샤인머스캣을 선물로 받아서 오눅레시피 샤인머스캣과
        배로 짓는 과일 샐러드 만들어 봤어요. 올리브유랑 후추가 달달하고 탱탱한
        샤인머스캣이랑 너무 잘 어울렸어요.
      </ArticleText>
      <ReferredRecipeCard />
    </>
  );
}

export default CommunityArticle;

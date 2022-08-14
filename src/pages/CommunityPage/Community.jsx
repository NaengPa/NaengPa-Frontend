import styled from "styled-components";
import CommunityArticle from "./CommunityArticle";

const CommunityWrapper = styled.div`
  padding: 10vh 16px 64px 16px;
`;

const CommunityTitle = styled.span`
  font-weight: 600;
  font-size: 24px;
  line-height: 30px;
  color: #132029;
  white-space: pre-wrap;
`;

function Community() {
  return (
    <CommunityWrapper>
      <CommunityTitle>내가 만든 냉파 레시피{"\n"}자랑해봐요</CommunityTitle>
      <CommunityArticle />
      <CommunityArticle />
      <CommunityArticle />
    </CommunityWrapper>
  );
}

export default Community;

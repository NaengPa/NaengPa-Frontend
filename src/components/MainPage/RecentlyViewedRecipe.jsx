import styled from "styled-components";
import ViewedRecipeImgList from "./ViewedRecipeImgList";

const RecentlyViewedRecipeHeader = styled.div`
  width: 100%;
  padding: 0 23px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 9px;
`;

const Title = styled.p`
  font-weight: 700;
  font-size: 20px;
  line-height: 140%;
  letter-spacing: -0.03em;
  color: #181818;
  margin: 0;
`;

const ViewedRecipeImgContainer = styled.div`
  display: flex;
  overflow-x: scroll;
  padding-left: 23px;
  width: 100%;
  ::-webkit-scrollbar {
    display: none;
  }
`;

function RecentlyViewedRecipe() {
  return (
    <>
      <RecentlyViewedRecipeHeader>
        <Title>최근 본 레시피</Title>
      </RecentlyViewedRecipeHeader>
      <ViewedRecipeImgContainer>
        <ViewedRecipeImgList />
      </ViewedRecipeImgContainer>
    </>
  );
}

export default RecentlyViewedRecipe;

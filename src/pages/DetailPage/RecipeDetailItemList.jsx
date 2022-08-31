import RecipeDetailItem from "./RecipeDetailItem";
import styled from "styled-components";

const Subtitle = styled.span`
  font-style: normal;
  font-weight: 600;
  font-size: 13px;
  line-height: 20px;
  letter-spacing: -0.005em;
  color: ${(props) => props.theme.colors.GREY_50};
  margin: 0;
  margin-bottom: 9px;
`;

const RecipeDetailItemListContainer = styled.div`
  padding: 0 16px;
`;

function RecipeDetailItemList({ recipeDescription }) {
  return (
    <RecipeDetailItemListContainer>
      <Subtitle>레시피</Subtitle>
      {recipeDescription?.map((item) => {
        return (
          <RecipeDetailItem
            description={item.cookingDc}
            src={item.streStepImgUrl}
            no={item.cookingNo}
          />
        );
      })}
    </RecipeDetailItemListContainer>
  );
}

export default RecipeDetailItemList;

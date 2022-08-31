import styled from "styled-components";
import IngredientTagList from "./IngredientTagList";
import RecipeDetailItemList from "./RecipeDetailItemList";
import RecipeReviewList from "./RecipeReviewList";
import { useRecoilState, useSetRecoilState } from "recoil";
import { viewedRecipeAtom } from "../../atom";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useState } from "react";
import Header from "../../components/Header";
import { getRecipeDetail } from "../../common/axios";

const RecipePhotoContainer = styled.div`
  position: relative;
  height: 415px;
  overflow: hidden;
`;

const RecipePhoto = styled.img`
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100vw;
  height: 100%;
  object-fit: cover;
`;

const RecipePhotoGradient = styled.div`
  width: 100%;
  height: 172px;
  position: absolute;
  bottom: 0;
  background: linear-gradient(
    180deg,
    rgba(0, 0, 0, 0) 0%,
    rgba(0, 0, 0, 0.6) 100%
  );
`;

const ContentsContainer = styled.div`
  padding: 19px 27px 0 27px;
  display: flex;
  flex-direction: column;
`;

const RecipeTitle = styled.p`
  font-weight: 600;
  font-size: 22px;
  line-height: 120%;
  letter-spacing: -0.02em;
  margin: 0px;
  margin-bottom: 6px;
`;

const RecipeShortDescription = styled.p`
  margin: 0;
  font-weight: 500;
  font-size: 14px;
  line-height: 120%;
  letter-spacing: -0.02em;

  color: #a6a6a6;
`;

const IngredientContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 24px;
`;

const Subtitle = styled.p`
  font-weight: 600;
  font-size: 14px;
  line-height: 120%;
  letter-spacing: -0.02em;
  margin: 0;
  margin-bottom: 9px;
`;

const Border = styled.div`
  background: rgba(35, 35, 35, 0.37);
  width: 100%;
  height: 1px;
  margin: 32px 0px 20px 0px;
`;

function Detail() {
  const setViewedRecipe = useSetRecoilState(viewedRecipeAtom);
  const [recipeDetail, setRecipeDetail] = useState([]);
  useEffect(() => {
    setViewedRecipe((prev) => [recipeId, ...prev]);
  }, [setViewedRecipe]);
  const { recipeId } = useParams();

  useEffect(() => {
    const getRecipeDetails = async () => {
      const result = await getRecipeDetail(recipeId);
      setRecipeDetail(result);
    };
    getRecipeDetails();
  }, [recipeId]);

  const recipeName = recipeDetail?.recipeInfo?.recipeNmKo;
  const recipeSummary = recipeDetail?.recipeInfo?.summary;
  const recipeImg = recipeDetail?.recipeInfo?.imgUrl;
  const recipeIrdnts = recipeDetail?.recipeIrdnts;
  const recipeDescription = recipeDetail?.recipeCrses;

  return (
    <>
      <Header></Header>
      <RecipePhotoContainer>
        <RecipePhoto src={recipeImg} />
        <RecipePhotoGradient />
      </RecipePhotoContainer>
      <ContentsContainer>
        <RecipeTitle>{recipeName}</RecipeTitle>
        <RecipeShortDescription>{recipeSummary}</RecipeShortDescription>
        <IngredientContainer>
          <Subtitle>레시피 재료</Subtitle>
          <IngredientTagList recipeIrdnts={recipeIrdnts} />
        </IngredientContainer>
      </ContentsContainer>
      <RecipeDetailItemList recipeDescription={recipeDescription} />
      <RecipeReviewList />
    </>
  );
}

export default Detail;

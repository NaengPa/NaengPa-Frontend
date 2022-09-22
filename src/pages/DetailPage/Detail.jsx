import styled from "styled-components";
import IngredientTagList from "../../components/DetailPage/IngredientTagList";
import RecipeDetailItemList from "../../components/DetailPage/RecipeDetailItemList";
import RecipeReviewList from "../../components/DetailPage/RecipeReviewList";
import { useRecoilState, useSetRecoilState } from "recoil";
import { recipeDetailAtom, viewedRecipeAtom } from "../../atom";
import { useEffect, useLayoutEffect } from "react";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { ReactComponent as Share } from "../../assets/shareWhite.svg";
import Header from "../../components/DetailPage/Header";
import { getRecipeDetail } from "../../common/axios";
import ShareModal from "../../components/ShareModal/ShareModal";
import LoadingPortal from "../../components/LoadingPortal";
import LoadingScreen from "../../components/LoadingScreen";
import RecipeLike from "../../components/DetailPage/RecipeLike";

function Detail() {
  const setViewedRecipe = useSetRecoilState(viewedRecipeAtom);
  const [recipeDetail, setRecipeDetail] = useRecoilState(recipeDetailAtom);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setViewedRecipe((prev) => [recipeId, ...prev]);
  }, [setViewedRecipe]);
  const { recipeId } = useParams();

  useLayoutEffect(() => {
    const email = JSON.parse(localStorage.getItem("userInfo"))?.email;
    setLoading(true);
    const getRecipeDetails = async () => {
      const result = await getRecipeDetail(email, recipeId);
      setRecipeDetail(result);
      setLoading(false);
    };
    getRecipeDetails();
  }, []);

  const recipeName = recipeDetail?.recipeInfo?.recipeNmKo;
  const recipeSummary = recipeDetail?.recipeInfo?.summary;
  const recipeImg = recipeDetail?.recipeInfo?.imgUrl;
  const recipeIrdnts = recipeDetail?.recipeIrdnts;
  const recipeDescription = recipeDetail?.recipeCrses;

  return loading ? (
    <LoadingPortal>
      <LoadingScreen />
    </LoadingPortal>
  ) : (
    <RecipeDetailContainer>
      {showModal ? (
        <ShareModal
          setShowModal={setShowModal}
          showModal={showModal}
          recipeDetail={recipeDetail}
        ></ShareModal>
      ) : (
        ""
      )}
      <Header></Header>
      <RecipePhotoContainer>
        <RecipePhoto src={recipeImg} />
        <RecipePhotoGradient>
          <RecipeLike id={recipeId} />
          <Share onClick={() => setShowModal(true)} />
        </RecipePhotoGradient>
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
    </RecipeDetailContainer>
  );
}

export default Detail;

const RecipeDetailContainer = styled.div`
  width: 100%;
  max-width: 420px;
  background-color: #ffffff;
`;

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
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
  padding: 16px;
  gap: 8px;
`;

const ContentsContainer = styled.div`
  padding: 16px 16px 0 16px;
  display: flex;
  flex-direction: column;
`;

const RecipeTitle = styled.p`
  font-style: normal;
  font-weight: 600;
  font-size: 24px;
  line-height: 30px;
  color: ${(props) => props.theme.colors.GREY_90};
  margin: 0px;
  margin-bottom: 6px;
`;

const RecipeShortDescription = styled.p`
  margin: 0;
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 17px;
  color: ${(props) => props.theme.colors.GREY_30};
`;

const IngredientContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 24px;
`;

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

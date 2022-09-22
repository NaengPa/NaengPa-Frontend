import styled from "styled-components";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { viewedRecipeAtom } from "../../atom";
import ViewedRecipeImgItem from "./ViewedRecipeImgItem";
import { Link } from "react-router-dom";
import { getCurRecipeList } from "../../common/axios";

const ViewedRecipeImgListContainer = styled.div`
  width: 100%;
  display: flex;
  gap: 16px;
`;

const ViewedRecipePhotoGradient = styled.div`
  width: 132px;
  height: 124px;
  position: absolute;
  right: -1px;
  background: linear-gradient(
    270deg,
    #f8fbff 0%,
    rgba(255, 255, 255, 0) 96.81%
  );
`;

function ViewedRecipeImgList({ item }) {
  const viewedRecipe = useRecoilValue(viewedRecipeAtom);
  const limitViewedRecipe = [...new Set(viewedRecipe)].splice(0, 5);
  const numberLimitViewedRecipe = [];
  for (let x of limitViewedRecipe) {
    numberLimitViewedRecipe.push(Number(x));
  }
  console.log(numberLimitViewedRecipe);
  const [viewedRecipeData, setViewedRecipeData] = useState([]);

  useEffect(() => {
    const getCurRecipeLists = async () => {
      const result = await getCurRecipeList(numberLimitViewedRecipe);
      setViewedRecipeData(result);
    };
    getCurRecipeLists();
  }, []);

  return (
    <ViewedRecipeImgListContainer>
      <ViewedRecipePhotoGradient />
      {numberLimitViewedRecipe.map((item) => {
        for (let x of viewedRecipeData) {
          if (x.recipeId === item) {
            return (
              <Link to={`/detail/${x.recipeId}`}>
                <div>
                  <ViewedRecipeImgItem src={x.imgUrl} />
                </div>
              </Link>
            );
          }
        }
      })}
    </ViewedRecipeImgListContainer>
  );
}

export default ViewedRecipeImgList;

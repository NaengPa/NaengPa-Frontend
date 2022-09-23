import styled from "styled-components";
import { ReactComponent as InactiveLike } from "../../assets/heartInactiveBlack.svg";
import { ReactComponent as ActiveLike } from "../../assets/heartActive.svg";
import { likeRecipe } from "../../common/axios";
import { useRecoilState, useSetRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";
import {
  foodDataAtom,
  recipeDetailAtom,
  targetFoodLikeYnAtom,
} from "../../atom";

const RecipeLikeContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

function FoodLikeBtn({ id, likeYn }) {
  const setRecipeDetail = useSetRecoilState(recipeDetailAtom);
  const [foodData, setFoodData] = useRecoilState(foodDataAtom);
  const setTargetFoodLikeYn = useSetRecoilState(targetFoodLikeYnAtom);

  const navigate = useNavigate();

  const email = JSON.parse(localStorage.getItem("userInfo"))?.email;
  const likeChange = () => {
    setTargetFoodLikeYn(() => {
      let targetLikeYn = null;
      foodData.forEach((item) =>
        item.recipeId === id ? (targetLikeYn = item.likeYn) : null
      );
      return !targetLikeYn;
    });

    setFoodData((prev) => {
      const newArr = [...prev].map((item) =>
        item.recipeId === id
          ? item.likeYn === true
            ? { ...item, likeCnt: item.likeCnt - 1, likeYn: !item.likeYn }
            : { ...item, likeCnt: item.likeCnt + 1, likeYn: !item.likeYn }
          : item
      );
      return newArr;
    });

    setRecipeDetail((prev) => {
      return prev.likeYn
        ? { ...prev, likeCnt: prev.likeCnt - 1, likeYn: false }
        : { ...prev, likeCnt: prev.likeCnt + 1, likeYn: true };
    });
    const likeData = {
      email: email,
      recipeId: id,
    };
    async function post() {
      await likeRecipe(likeData);
    }
    post();
  };

  const handleLike = (e) => {
    !!localStorage.getItem("token") ? likeChange() : navigate("/login");
  };

  return (
    <RecipeLikeContainer>
      {likeYn ? (
        <ActiveLike onClick={handleLike} />
      ) : (
        <InactiveLike onClick={handleLike} />
      )}
    </RecipeLikeContainer>
  );
}
export default FoodLikeBtn;

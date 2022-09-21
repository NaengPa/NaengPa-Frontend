import styled from "styled-components";
import { ReactComponent as InactiveLike } from "../../assets/heartInactiveBlack.svg";
import { ReactComponent as ActiveLike } from "../../assets/heartActive.svg";
import { likeRecipe } from "../../common/axios";
import { useSetRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";
import { foodDataAtom, recipeDetailAtom } from "../../atom";

const RecipeLikeContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

function FoodLikeBtn({ id, likeYn }) {
  const setRecipeDetail = useSetRecoilState(recipeDetailAtom);
  const setFoodData = useSetRecoilState(foodDataAtom);
  const navigate = useNavigate();

  const email = JSON.parse(localStorage.getItem("userInfo"))?.email;
  const likeChange = () => {
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

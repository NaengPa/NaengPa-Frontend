import styled from "styled-components";
import { ReactComponent as InactiveLike } from "../../assets/heartInactiveWhite.svg";
import { ReactComponent as ActiveLike } from "../../assets/heartActive.svg";
import { likeRecipe } from "../../common/axios";
import { useRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";
import { recipeDetailAtom } from "../../atom";

const RecipeLikeContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

function RecipeLike({ id }) {
  const [recipeDetail, setRecipeDetail] = useRecoilState(recipeDetailAtom);
  const navigate = useNavigate();

  const email = JSON.parse(localStorage.getItem("userInfo")).email;

  const likeChange = () => {
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
      {recipeDetail.likeYn ? (
        <ActiveLike onClick={handleLike} />
      ) : (
        <InactiveLike onClick={handleLike} />
      )}
    </RecipeLikeContainer>
  );
}
export default RecipeLike;

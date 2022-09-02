import styled from "styled-components";
import { ReactComponent as InactiveLike } from "../assets/heartInactiveBlack.svg";
import { ReactComponent as ActiveLike } from "../assets/heartActive.svg";
import { useEffect, useState } from "react";
import { likeArticle } from "../common/axios";

const ArticleLikeContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const LikeCount = styled.span`
  margin: 0;
  font-weight: 600;
  font-size: 14px;
  line-height: 17px;
  color: ${(props) => props.theme.colors.GREY_90};
`;

function ArticleLike({ id, likes, likeYn }) {
  const [isLiked, setIsLiked] = useState();
  const [likeCount, setLikeCount] = useState("");

  useEffect(() => {
    likeYn ? setIsLiked(true) : setIsLiked(false);
    setLikeCount(likes);
  }, []);

  const handleLike = (e) => {
    setIsLiked((prev) => !prev);
    const likeData = {
      boardId: id,
      email: JSON.parse(localStorage.getItem("userInfo")).email,
    };
    async function post(likeData) {
      const result = await likeArticle(likeData);
      setLikeCount(result.data);
      console.log(likeCount, isLiked);
    }

    post(likeData);
  };

  return (
    <ArticleLikeContainer>
      {isLiked ? (
        <ActiveLike onClick={handleLike} />
      ) : (
        <InactiveLike onClick={handleLike} />
      )}
      <LikeCount>{likeCount}</LikeCount>
    </ArticleLikeContainer>
  );
}
export default ArticleLike;

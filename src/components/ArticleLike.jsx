import styled from "styled-components";
import { ReactComponent as InactiveLike } from "../assets/heartInactiveBlack.svg";
import { ReactComponent as ActiveLike } from "../assets/heartActive.svg";
import { useEffect, useState } from "react";
import { likeArticle } from "../common/axios";
import { articleAtom } from "../atom";
import { useRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";

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
  const [article, setArticle] = useRecoilState(articleAtom);
  const navigate = useNavigate();

  const likeChange = () => {
    setArticle((prev) => {
      const copiedArr = [...prev].map((item) =>
        item.id === id
          ? item.likeYn === true
            ? { ...item, likes: likes - 1, likeYn: !likeYn }
            : { ...item, likes: likes + 1, likeYn: !likeYn }
          : item
      );
      return copiedArr;
    });
    const likeData = {
      boardId: id,
      email: JSON.parse(localStorage.getItem("userInfo")).email,
    };
    async function post(likeData) {
      await likeArticle(likeData);
    }
    post(likeData);
  };

  const handleLike = (e) => {
    !!localStorage.getItem("token") ? likeChange() : navigate("/login");
  };

  return (
    <ArticleLikeContainer>
      {likeYn ? (
        <ActiveLike onClick={handleLike} />
      ) : (
        <InactiveLike onClick={handleLike} />
      )}
      <LikeCount>{likes}</LikeCount>
    </ArticleLikeContainer>
  );
}
export default ArticleLike;

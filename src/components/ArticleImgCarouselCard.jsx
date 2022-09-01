import styled from "styled-components";

const ArticleImgContainer = styled.div`
  display: flex;
`;

const ArticleImg = styled.img`
  height: 310px;
  width: 100%;
  object-fit: cover;
  /* border: 1px solid black; */
  border-radius: 5px;
  flex: none;
`;

function ArticleImgCarouselCard({ imgUrl }) {
  return (
    <ArticleImgContainer>
      <ArticleImg src={imgUrl} />
    </ArticleImgContainer>
  );
}

export default ArticleImgCarouselCard;

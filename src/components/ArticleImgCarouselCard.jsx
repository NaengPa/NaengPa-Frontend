import styled from "styled-components";

// const Container = styled.div`
//   width: 100%;
//   height: 310px;
//   background: #b6c4cf;
//   border-radius: 5px;
//   /* object-fit: cover; */
//   margin-top: 8px;
//   border: 10px solid black;
// `;

const ArticleImg = styled.img`
  width: 100%;
  height: 310px;
  object-fit: cover;
`;

function ArticleImgCarouselCard({ imgUrl }) {
  return <ArticleImg src={imgUrl} />;
}

export default ArticleImgCarouselCard;

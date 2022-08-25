import styled from "styled-components";

import ArticleImgCarouselCard from "./ArticleImgCarouselCard";

const Container = styled.div`
  background: coral;
  width: 100%;
  height: 310px;
  overflow: hidden;
`;

function ArticleImgCarousel({ imgs }) {
  return (
    <Container>
      {imgs.map((item) => (
        <ArticleImgCarouselCard imgUrl={item} />
      ))}
    </Container>
  );
}

export default ArticleImgCarousel;

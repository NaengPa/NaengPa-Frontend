import styled from "styled-components";
import Slider from "react-slick";
import ArticleImgCarouselCard from "./ArticleImgCarouselCard";

const Container = styled.div`
  width: 100%;
  height: 310px;
  .slick-slider {
    width: 100%;
    height: 310px;
    box-sizing: border-box;
  }

  .slick-slide img {
    object-fit: cover;
    width: 100%;
    box-sizing: border-box;
  }
  .slick-dots {
    position: absolute;
    bottom: 30px;
    .slick-active {
      button::before {
        color: #929292;
      }
    }
    button::before {
      color: #bdbdbd;
    }
  }
`;

function ArticleImgCarousel({ imgs }) {
  const setting = {
    centerMode: true,
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    variableWidth: true,
  };
  return (
    <Container>
      <Slider {...setting}>
        {imgs.map((item) => (
          <ArticleImgCarouselCard imgUrl={item} />
        ))}
      </Slider>
    </Container>
  );
}

export default ArticleImgCarousel;

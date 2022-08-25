import styled from "styled-components";
import { Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import ArticleImgCarouselCard from "./ArticleImgCarouselCard";

const Container = styled.div`
  margin: 8px 0;
  border-radius: 5px;
  overflow: hidden;
  .swiper-pagination-bullet {
    background-color: aqua;
  }
  .swiper-pagination-bullet-active {
    background-color: tomato;
  }
`;

function ArticleImgCarousel({ imgs }) {
  return (
    <Container>
      <Swiper
        modules={[Pagination]}
        spaceBetween={50}
        slidesPerView={1}
        pagination={{ clickable: true }}
      >
        {imgs.map((item) => (
          <SwiperSlide>
            <ArticleImgCarouselCard imgUrl={item} />
          </SwiperSlide>
        ))}
      </Swiper>
    </Container>
  );
}

export default ArticleImgCarousel;

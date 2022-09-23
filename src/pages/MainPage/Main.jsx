import { Link } from "react-router-dom";
import { useRecoilValue } from "recoil";
import styled from "styled-components";

import { ReactComponent as Search } from "../../assets/mainSearch.svg";
import { viewedRecipeAtom } from "../../atom";
import RecentlyViewedRecipe from "../../components/MainPage/RecentlyViewedRecipe";

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 0px 27px;
`;

const Subtitle = styled.p`
  color: #a3a3a3;
  margin: 0;

  font-weight: 500;
  font-size: 14px;
  line-height: 140%;
`;

const TitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 32vh;
  z-index: 1;
`;

const Title = styled.p`
  font-weight: 700;
  font-size: 36px;
  line-height: 45px;
  letter-spacing: -1px;
  color: #000000;
  white-space: pre-wrap;
  margin: 0;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  span {
    font-size: 24px;
  }
`;

const SearchBtn = styled.button`
  width: 100%;
  height: 50px;
  background-color: #eef1f7;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 15px 0px 15px 20px;
  gap: 8px;
  border-radius: 10px;
  margin: 0;
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 120%;
  letter-spacing: -0.02em;
  color: #9ba1af;
`;

const RecentlyViewedRecipeContainer = styled.div`
  position: absolute;
  bottom: 80px;
  width: 100%;
`;

const MainBg = styled.div`
  background-color: #f8fbff;
  height: calc(var(--vh, 1vh) * 100);
  width: 100%;
  overflow: hidden;
`;

const Corn = styled.img`
  position: absolute;
  left: -20px;
  bottom: -200px;
`;

const Tomato = styled.img`
  position: absolute;
  right: -40px;
  bottom: -350px;
`;

const Carrot = styled.img`
  position: absolute;
  top: 50px;
  right: -20px;
  z-index: 0;
`;

const Burger = styled.img`
  position: absolute;
  top: 0px;
  right: -140px;
`;

function Main() {
  const viewedRecipe = useRecoilValue(viewedRecipeAtom);

  return (
    <MainBg>
      <Container>
        {viewedRecipe.length > 0 ? (
          <Burger src="images/burger.png" />
        ) : (
          <Carrot src="images/carrot.png" />
        )}

        <TitleWrapper>
          <Subtitle>오래된 재료는 비우고, 행복은 채워요</Subtitle>
          <Title>냉장고 파먹기❄️</Title>
        </TitleWrapper>
        <Link to={{ pathname: "/search" }}>
          <SearchBtn>
            <Search />
            최고의 레시피 찾기
          </SearchBtn>
        </Link>

        {viewedRecipe.length > 0 ? null : (
          <>
            <Corn src="images/corn.png" />
            <Tomato src="images/tomato.png" />
          </>
        )}
      </Container>
      {viewedRecipe.length > 0 ? (
        <RecentlyViewedRecipeContainer>
          <RecentlyViewedRecipe />
        </RecentlyViewedRecipeContainer>
      ) : null}
    </MainBg>
  );
}

export default Main;

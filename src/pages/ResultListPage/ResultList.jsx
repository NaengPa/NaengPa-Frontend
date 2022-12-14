import React, { useState, useEffect, useRef, useLayoutEffect } from "react";
import styled from "styled-components";
import AddFoodButton from "../../components/AddFoodButton";
import FilterButton from "../../components/FilterButton";
import FoodLikeBtn from "../../components/ResultListPage/FoodLikeBtn";
import { foodDataAtom } from "../../atom";
import { ReactComponent as ArrowRight } from "../../assets/upButton.svg";
import { useScroll } from "../../hooks/useScroll";
import { filterStateAtom, selectedIngredientAtom } from "../../atom";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import FoodButtonAlone from "../../components/FoodButtonAlone";
import { useNavigate } from "react-router-dom";
import { getRecipeList } from "../../common/axios";
import Filter from "../../components/Filter/Filter";
import filterItem from "../../Constant/constant";
import PreviousPageBtn from "../../components/PreviousPageBtn";
import SighImoticon from "../../assets/sigh.png";
import LoadingPortal from "../../components/LoadingPortal";
import LoadingScreen from "../../components/LoadingScreen";
import { useQuery } from "react-query";

const ResultList = () => {
  const homeRef = useRef(0);
  const mainRef = useRef(0);
  const [byPopularState, setByPopularState] = useState(true);
  const selectedIngredient = useRecoilValue(selectedIngredientAtom);
  const [foodData, setFoodData] = useRecoilState(foodDataAtom);
  const [filteredButton, setFilteredButton] = useState([]);
  const [foodList, setFoodList] = useState([...selectedIngredient]);
  const [show, setShow] = useState(false);
  const [filterFoodData, setFilterFoodData] = useState([]);
  const setFilterItemState = useSetRecoilState(filterStateAtom);
  const [filterClick, setFilterClick] = useState(0);
  const listContainerRef = useRef();
  const { isLoading, data } = useQuery("recipeData", () =>
    getRecipeList(
      selectedIngredient,
      JSON.parse(localStorage.getItem("userInfo"))?.email
    )
  );

  useEffect(() => {
    setFoodData(data?.recipeInfos);
    return () => {
      setFilterItemState(filterItem);
    };
  }, []);
  const { scrollY } = useScroll();

  const handleByPopular = () => {
    setFoodData(
      foodData.sort((a, b) => {
        return Number(b.likeCnt) - Number(a.likeCnt);
      })
    );
    setByPopularState(true);
  };

  const handleByCorrect = () => {
    setFoodData(
      foodData.sort((a, b) => {
        return b.containCnt - a.containCnt;
      })
    );
    setByPopularState(false);
  };

  const handleDelete = (e) => {
    setFoodList([foodList].filter((item) => item !== e.target.outerText));
  };

  const navigate = useNavigate();

  const clickHistoryData = (e) => {
    navigate(`/detail/${e.target.id}`, { replace: false, state: e.target.id });
  };

  const handleScroll = () => {
    document.getElementById("root").scrollIntoView({ behavior: "smooth" });
  };

  const handleShow = () => {
    setShow(true);
  };

  const handleClose = () => {
    setShow(false);
  };

  useEffect(() => {
    const copyFilteredButton = [...filteredButton];
    let copyFilteredButtonSorted = [...filteredButton];
    copyFilteredButton.forEach((items, index) => {
      if (
        filterItem[1].category.filter((item) => item.title === items).length ===
        0
      ) {
        const result = copyFilteredButton.filter((item) => item !== items);
        result.unshift(items);
        copyFilteredButtonSorted = result;
      }
    });

    //?????? ??????
    let lotatedFiltered = [];
    let countryFiltered = [];
    copyFilteredButtonSorted.forEach((items, index) => {
      let temporalFiltered = [];
      (lotatedFiltered.length > 0 ? lotatedFiltered : foodData).forEach(
        (recipe) => {
          if (
            filterItem[1].category.filter((item) => item.title === items)
              .length > 0
          ) {
            if (recipe.nationNm === items) {
              temporalFiltered.push(recipe);
            }
          } else if (
            filterItem[0].category.filter((item) => item.title === items)
              .length > 0
          ) {
            if (recipe.levelNm === items) {
              temporalFiltered.push(recipe);
            }
          } else if (
            filterItem[2].category.filter((item) => item.title === items)
              .length > 0
          ) {
            if (
              recipe.irdnts.filter(
                (item) =>
                  (item.irdntNm === "??????(??????)" ? "??????" : item.irdntNm) ===
                  items
              ).length === 0
            ) {
              temporalFiltered.push(recipe);
            }
          }
        }
      );

      if (
        filterItem[1].category.filter(
          (item) => item.title === copyFilteredButton[index + 1]
        ).length > 0 &&
        filterItem[1].category.filter(
          (item) => item.title === copyFilteredButton[index]
        ).length > 0
      ) {
        countryFiltered = [...countryFiltered, ...temporalFiltered];
      } else if (
        copyFilteredButton.filter(
          (items) =>
            filterItem[1].category.filter((item) => item.title === items)
              .length > 0
        ).length > 1 &&
        index === copyFilteredButton.length - 1
      ) {
        countryFiltered = [...countryFiltered, ...temporalFiltered];
      } else {
        lotatedFiltered = temporalFiltered;
      }
    });
    //recipeNmko<<????????? ?????? 1??????????????? ???????????? ??? ???????????? ??????????????? 0??????????????? ???????????? ????????? ?????? ????????? ???????????? ??????????????? 2??????????????? ?????? ???????????? ???????????????

    setFilterFoodData(
      countryFiltered.length > 0 ? countryFiltered : lotatedFiltered
    );
  }, [filteredButton]);
  const handleFilterClick = (items) => {
    const itemName = items.title;
    const isClicked = items.isClicked;
    if (
      (itemName === "?????????" || itemName === "?????????") &&
      filteredButton.filter((item) => item === itemName).length === 1
    ) {
      setFilteredButton((prev) =>
        filteredButton.filter((item) => item !== itemName)
      );
      setFilterClick(filterClick - 1);
      return;
    }
    if (
      (itemName === "?????????" || itemName === "?????????") &&
      filteredButton.filter((item) => item === "?????????" || item === "?????????")
        .length > 0
    ) {
      const firstIndexFiltered = filteredButton.filter((item) => {
        if (item === "?????????" || item === "?????????") {
          return;
        } else {
          return item;
        }
      });
      setFilteredButton((prev) => [...firstIndexFiltered, itemName]);
      return;
    }
    if (!isClicked) {
      setFilteredButton((prev) => [...filteredButton, itemName]);
      setFilterClick(filterClick + 1);
    } else {
      setFilteredButton((prev) =>
        filteredButton.filter((item) => item !== itemName)
      );
      setFilterClick(filterClick - 1);
    }
  };

  const headerContainerRef = useRef();
  const headerContainerHeight = headerContainerRef.current?.offsetHeight;

  return (
    <ResultListWrapper ref={homeRef}>
      {show ? (
        <Filter
          filterFoodData={filterFoodData}
          handleFilterClick={handleFilterClick}
          show={show}
          handleClose={handleClose}
          parentWidth={homeRef && homeRef.current?.offsetWidth}
        ></Filter>
      ) : (
        ""
      )}
      <FilterOp show={show}></FilterOp>
      <HeaderContainer
        parentWidth={homeRef && homeRef.current?.offsetWidth}
        ref={headerContainerRef}
      >
        <HeaderMainContainer>
          <ButtonIconContainer>
            <PreviousPageBtn></PreviousPageBtn>
            <FilterButton handleShow={handleShow}></FilterButton>
          </ButtonIconContainer>
          <TitleWhoIs scrollY={scrollY}>
            {localStorage.getItem("token")
              ? JSON.parse(localStorage.getItem("userInfo")).nickname + "???"
              : "??????"}
            ??? ?????????<br></br>?????? ???????????? ??????????????????
          </TitleWhoIs>
          <TitleChosen>????????? ??????</TitleChosen>
        </HeaderMainContainer>
        <FoodListWrapper>
          <AddFoodButton></AddFoodButton>
          {selectedIngredient.map((item) => (
            <FoodButtonAlone
              handleDelete={handleDelete}
              item={item}
            ></FoodButtonAlone>
          ))}
        </FoodListWrapper>
      </HeaderContainer>
      <MainContainer
        headerContainerHeight={headerContainerHeight}
        ref={mainRef}
      >
        {isLoading ? (
          <LoadingPortal>
            <LoadingScreen />
          </LoadingPortal>
        ) : (
          <>
            <UpButton
              parentWidth={homeRef && homeRef.current?.offsetWidth}
              scrollY={scrollY}
              onClick={handleScroll}
            >
              <StyledMyIconUp></StyledMyIconUp>
            </UpButton>
            <SortingLetter byPopularState={byPopularState}>
              <button
                byPopularState={byPopularState}
                onClick={handleByPopular}
                className="byPopular"
              >
                ?????????
              </button>
              <button
                byPopularState={byPopularState}
                onClick={handleByCorrect}
                className="byCorrect"
              >
                ????????????
              </button>
            </SortingLetter>
            <ListContainer ref={listContainerRef}>
              {filterClick > 0 && filterFoodData.length === 0 ? (
                <FilterDefaultMessage>
                  <img src={SighImoticon} alt="" />
                  <span className="title">?????? ????????? ?????????</span>
                  <span className="main">?????? ????????? ????????? ??????????????????.</span>
                </FilterDefaultMessage>
              ) : (
                ""
              )}
              {(filterClick > 0 ? filterFoodData : data?.recipeInfos).map(
                (item) => (
                  <TextWrapper key={item.recipeId} id={item.recipeId}>
                    <img
                      src={item.imgUrl}
                      alt=""
                      id={item.recipeId}
                      onClick={clickHistoryData}
                    />
                    <SummaryAndLike>
                      <ListSpan id={item.recipeId} onClick={clickHistoryData}>
                        {item.summary}
                      </ListSpan>
                      <IconWrapper>
                        <FoodLikeBtn id={item.recipeId} likeYn={item.likeYn} />
                        <FoodLikeSpan>{item.likeCnt}</FoodLikeSpan>
                      </IconWrapper>
                    </SummaryAndLike>
                  </TextWrapper>
                )
              )}
            </ListContainer>
          </>
        )}
      </MainContainer>
    </ResultListWrapper>
  );
};

export default ResultList;
const ResultListWrapper = styled.div`
  position: relative;
  width: 100%;
  margin: auto;
  box-sizing: border-box;
  min-height: 100vh;
  height: 100%;
`;

const FilterOp = styled.div`
  display: ${({ show }) => (show ? "block" : "none")};
  position: fixed;
  width: 420px;
  top: 0;
  background-color: black;
  opacity: 0.5;
  z-index: 1000;
  height: 100vh;
`;

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-bottom: 16px;
  width: ${(props) => `${props.parentWidth}px`};
  position: fixed;
  background-color: white;
  padding-left: 16px 0 16px 16px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.05);
`;

const HeaderMainContainer = styled.div`
  padding: 16px 16px 0 16px;
  display: flex;
  flex-direction: column;
`;

const ButtonIconContainer = styled.div`
  margin-top: 12px;
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

const TitleWhoIs = styled.div`
  display: ${({ scrollY }) => (scrollY > 145 ? "none" : "block")};
  transition: 300ms all ease-in-out;
  margin-top: 8px;
  font-weight: 500;
  font-size: 24px;
  line-height: 30px;
  img {
    transform: translateY(20%);
  }
`;

const TitleChosen = styled.div`
  margin-top: 8px;
  font-weight: 500;
  font-size: 13px;
  line-height: 120%;
  margin-bottom: 8px;
  color: ${({ theme }) => theme.colors.GREY_50};
`;

const FoodListWrapper = styled.div`
  display: flex;
  align-items: center;
  overflow-x: scroll;
  padding-left: 16px;
  ::-webkit-scrollbar {
    display: none;
  }
`;
const MainContainer = styled.div`
  box-sizing: content-box;
  padding: 16px;
  padding-top: ${(props) => `${props.headerContainerHeight}px`};
  padding-bottom: 50px;
  height: 100%;
  background-color: ${({ theme }) => theme.colors.WHITE};
  ::-webkit-scrollbar {
    display: none;
  }
`;

const SortingLetter = styled.div`
  margin: 16px 0;
  text-align: end;
  font-size: 12px;
  font-weight: 600;
  .byPopular {
    color: ${(props) =>
      props.byPopularState
        ? props.theme.colors.MAIN_COLOR
        : props.theme.colors.GREY_30};
    background-color: ${(props) =>
      props.byPopularState ? props.theme.colors.PRIMARY_50 : "transparent"};
    padding: 6px 12px;
    border-radius: 5px;
  }
  .byCorrect {
    color: ${(props) =>
      props.byPopularState
        ? props.theme.colors.GREY_30
        : props.theme.colors.MAIN_COLOR};
    background-color: ${(props) =>
      props.byPopularState ? "transparent" : props.theme.colors.PRIMARY_50};
    padding: 6px 12px;
    border-radius: 5px;
  }
`;

const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.colors.WHITE};
  width: calc(100% + 32px);
  margin-left: -16px;
`;

const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-bottom: 20px;
  width: calc(100% - 32px);
  margin-left: 16px;
  cursor: pointer;
  img {
    object-fit: cover;
    height: 184px;
    border-radius: 10px;
    margin-bottom: 12px;
  }
`;
const ListSpan = styled.div`
  margin-right: 17px;
  font-size: 14px;
  font-weight: 600;
`;

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  white-space: nowrap;
`;

const FoodLikeSpan = styled.span`
  margin-left: 8px;
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 17px;
  color: ${({ theme }) => theme.colors.GREY_90};
`;

const SummaryAndLike = styled.div`
  display: flex;
  justify-content: space-between;
`;

const UpButton = styled.button`
  display: ${({ scrollY }) => (scrollY > 0 ? "flex" : "none")};
  width: 45px;
  height: 45px;
  align-items: center;
  justify-content: center;
  text-align: center;
  border-radius: 50%;
  position: fixed;
  bottom: 94px;
  transform: ${(props) => `translateX(${props.parentWidth - 77}px)`};
  background-color: white;
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.2);
  transition: all 300ms ease;
`;
const StyledMyIconUp = styled(ArrowRight)`
  transform: translateY(-2px);
`;

const FilterDefaultMessage = styled.div`
  display: flex;
  flex-direction: column;
  color: ${({ theme }) => theme.colors.GREY_50};
  align-items: center;
  justify-content: center;
  height: 500px;
  img {
    margin-bottom: 8px;
    width: 40px;
    height: 40px;
  }
  .title {
    font-size: 22px;
    margin-bottom: 8px;
    font-weight: 600;
  }
  .main {
    font-size: 14px;
    font-weight: 500;
  }
`;

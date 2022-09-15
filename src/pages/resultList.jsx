import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import AddFoodButton from "../components/addFoodButton";
import FilterButton from "../components/filterButton";
import { ReactComponent as HeartActive } from "../assets/heartActive.svg";
import { ReactComponent as ArrowRight } from "../assets/upButton.svg";
import { useScroll } from "../hooks/useScroll";
import { filterStateAtom, selectedIngredientAtom } from "../atom";
import { useRecoilState } from "recoil";
import FoodButtonAlone from "../components/foodButtonAlone";
import { useNavigate } from "react-router-dom";
import { getRecipeList } from "../common/axios";
import Filter from "../components/filter/filter";
import filterItem from "../Constant/constant";
import PreviousPageBtn from "../components/PreviousPageBtn";
import SighImoticon from "../assets/sigh.png";
import LoadingPortal from "../components/LoadingPortal";
import LoadingScreen from "../components/LoadingScreen";

const ResultList = () => {
  const homeRef = useRef(0);
  const mainRef = useRef(0);
  console.log(homeRef);
  const [byPopularState, setByPopularState] = useState(true);
  const [selectedIngredient, setSelectedIngredient] = useRecoilState(
    selectedIngredientAtom
  );
  const [foodData, setFoodData] = useState([]);
  const [filteredButton, setFilteredButton] = useState([]);
  const [foodList, setFoodList] = useState([...selectedIngredient]);
  const [show, setShow] = useState(false);
  const [filterFoodData, setFilterFoodData] = useState([]);
  const [filtered, setFiltered] = useState();
  const [filterItemState, setFilterItemState] = useRecoilState(filterStateAtom);
  const [filterClick, setFilterClick] = useState(0); // 필터결과가 하나도 없을떄 핸들링 해주기위해 만든 상태
  const listContainerRef = useRef();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const getRecipeLists = async () => {
      const result = await getRecipeList(selectedIngredient);
      setFoodData(result.recipeInfos);
      setFiltered(result.filterInfo);
      setLoading(false);
    };
    getRecipeLists();
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

    //로직 시작
    let lotatedFiltered = [];
    let countryFiltered = [];
    const res = copyFilteredButtonSorted.forEach((items, index) => {
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
                  (item.irdntNm === "허브(민트)" ? "민트" : item.irdntNm) ===
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
    //recipeNmko<<레시피 이름 1번인덱스면 레시피에 총 재료에서 추가해야됨 0번인덱스면 레시피에 클릭한 버튼 이외에 친구들로 적용되야됨 2번인덱스면 있는 재료들이 삭제되야됨

    setFilterFoodData(
      countryFiltered.length > 0 ? countryFiltered : lotatedFiltered
    );
  }, [filteredButton]);
  const handleFilterClick = (items) => {
    const itemName = items.title;
    const isClicked = items.isClicked;
    if (
      (itemName === "요알못" || itemName === "요잘알") &&
      filteredButton.filter((item) => item === itemName).length === 1
    ) {
      setFilteredButton((prev) =>
        filteredButton.filter((item) => item !== itemName)
      );
      setFilterClick(filterClick - 1);
      return;
    }
    if (
      (itemName === "요알못" || itemName === "요잘알") &&
      // filterItemState[0].category.filter((item) => item.title).length > 0
      filteredButton.filter((item) => item === "요알못" || item === "요잘알")
        .length > 0
    ) {
      const firstIndexFiltered = filteredButton.filter((item) => {
        if (item === "요알못" || item === "요잘알") {
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
            셰프의 재료로 만들 수 있는<br></br>멋진 요리들이에요
            <img
              width={35}
              height={35}
              alt=""
              src="https://ifh.cc/g/MzlDmN.png"
            ></img>
          </TitleWhoIs>
          <TitleChosen>선택한 재료</TitleChosen>
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
        {loading ? (
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
                인기순
              </button>
              <button
                byPopularState={byPopularState}
                onClick={handleByCorrect}
                className="byCorrect"
              >
                정확도순
              </button>
            </SortingLetter>
            <ListContainer ref={listContainerRef}>
              {filterClick > 0 && filterFoodData.length === 0 ? (
                <FilterDefaultMessage>
                  <img src={SighImoticon} alt="" />
                  <span className="title">검색 결과가 없습니다.</span>
                  <span className="main">
                    다른 검색어를 입력해 보거나 <br></br> 옵션을 재선택해 보시기
                    바랍니다.
                  </span>
                </FilterDefaultMessage>
              ) : (
                ""
              )}
              {(filterClick > 0 ? filterFoodData : foodData).map((item) => (
                <TextWrapper
                  key={item.recipeId}
                  onClick={clickHistoryData}
                  id={item.recipeId}
                >
                  <img src={item.imgUrl} alt="" />
                  <SummaryAndLike>
                    <ListSpan>{item.summary}</ListSpan>
                    <IconWrapper>
                      <StyledMyIcon></StyledMyIcon>
                      <span>{item.likeCnt}</span>
                    </IconWrapper>
                  </SummaryAndLike>
                </TextWrapper>
              ))}
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
  height: calc(var(--vh, 1vh) * 100);
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
    pointer-events: none;
    margin-bottom: 12px;
  }
`;
const ListSpan = styled.div`
  margin-right: 17px;
  font-size: 14px;
  font-weight: 600;
`;

const StyledMyIcon = styled(HeartActive)``;

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  pointer-events: none;
  white-space: nowrap;
  font-size: 14px;
  span {
    margin-left: 8px;
    font-weight: 600;
  }
`;

const SummaryAndLike = styled.div`
  pointer-events: none;
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

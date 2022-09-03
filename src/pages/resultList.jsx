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

const ResultList = () => {
  const homeRef = useRef(0);
  const [byPopularState, setByPopularState] = useState(true);
  // const [mainTextIs, setMainTextIs] = useState(true);
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

  useEffect(() => {
    window.scrollTo(0, 1);
    const getRecipeLists = async () => {
      const result = await getRecipeList(selectedIngredient);
      setFoodData(result.recipeInfos);
      setFiltered(result.filterInfo);
      console.log(result);
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
    navigate(`/${e.target.id}/detail`, { replace: false, state: e.target.id });
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

  // useEffect(() => {
  //   filteredButton.flatMap((items) => {
  //     if (
  //       filterItem[1].category.filter((item) => item.title === items)
  //         .length > 0
  //     ) {//1번쨰 로직

  //       if (!isClicked) {
  //         const filter = [
  //           ...(filterFoodData.length > 0 ? filterFoodData : foodData),
  //         ].filter(
  //           //이건 맞음
  //           (item) => item.nationNm === itemName
  //         );
  //         const filterOne =
  //           filterItemState[1].category.filter(
  //             (item) => item.isClicked === true
  //           ).length > 0
  //             ? [...filterFoodData, ...filter]
  //             : filter; //1번 인덱스에서 발생할때는 이게 맞거든 ?근데 3번이나 1번을
  //         setFilterFoodData(filterOne);
  //         console.log(isClicked);
  //       } else if (isClicked) {
  //         const filter = filterFoodData.filter(
  //           (item) => item.nationNm !== itemName
  //         );
  //         setFilterFoodData(filter);
  //         console.log("false");
  //       }
  //     } else if (
  //       //2번쨰 로직
  //       filterItem[0].category.filter((item) => item.title === itemName)
  //         .length > 0
  //     ) {
  //       if (!isClicked) {
  //         const filter = [
  //           ...(filterFoodData.length > 0 ? filterFoodData : foodData),
  //         ].filter(
  //           //이건 맞음
  //           (item) => item.levelNm === itemName
  //         );
  //         const filterOne =
  // filterItemState[0].category.filter(
  //   (item) => item.isClicked === true
  // ).length > 0
  //             ? [...filterFoodData, ...filter]
  //             : filter; //1번 인덱스에서 발생할때는 이게 맞거든 ?근데 3번이나 1번을
  //         setFilterFoodData(filterOne);
  //       } else if (isClicked) {
  //         const filter = filterFoodData.filter(
  //           (item) => item.levelNm !== itemName
  //         );
  //         setFilterFoodData(filter);
  //         console.log("false");
  //       }
  //     } else if (
  //       //3번쨰 로직
  //       filterItem[2].category.filter((item) => item.title === itemName)
  //         .length > 0
  //     ) {
  //       if (!isClicked) {
  //         const filter = [
  //           ...(filterFoodData.length > 0 ? filterFoodData : foodData),
  //         ].filter(
  //           (item) =>
  //             item.irdnts.filter(
  //               (item) =>
  //                 (item.irdntNm === "허브(민트)" ? "민트" : item.irdntNm) ===
  //                 itemName
  //             ).length === 0
  //         );
  //         console.log(isClicked);
  //         console.log(filter);
  //         setFilterFoodData(filter);
  //       } else if (isClicked) {
  //         const filteredData = [...foodData].filter(
  // (item) =>
  //   item.irdnts.filter(
  //     (item) =>
  //       (item.irdntNm === "허브(민트)" ? "민트" : item.irdntNm) ===
  //       itemName
  //   ).length !== 0
  //         );
  //         const filter = [...filterFoodData, ...filteredData];
  //         console.log(isClicked);
  //         console.log(filter);
  //         setFilterFoodData(filter);
  //       }
  //     }
  //   });
  // },[filteredButton]);

  useEffect(() => {
    const res = filteredButton.flatMap((items) =>
      foodData.filter((recipe) => {
        if (
          filterItem[1].category.filter((item) => item.title === items).length >
          0
        ) {
          return recipe.nationNm === items;
        } else if (
          filterItem[0].category.filter((item) => item.title === items).length >
          0
        ) {
          return recipe.levelNm === items;
        } else if (
          filterItem[2].category.filter((item) => item.title === items).length >
          0
        ) {
          return (
            recipe.irdnts.filter(
              (item) =>
                (item.irdntNm === "허브(민트)" ? "민트" : item.irdntNm) ===
                items
            ).length === 0
          );
        }
        return console.log("잘못된 값입니다");
      })
    );
    //recipeNmko<<레시피 이름 1번인덱스면 레시피에 총 재료에서 추가해야됨 0번인덱스면 레시피에 클릭한 버튼 이외에 친구들로 적용되야됨 2번인덱스면 있는 재료들이 삭제되야됨
    console.log(res);
    // let arrayContrast = [];
    // res.forEach((item) => arrayContrast.push(item.recipeNmKo));
    // const onlyFiltered = res.filter(
    //   (item, index) => res[index].recipeNmKo.indexOf(item.recipeNmKo) !== index
    // );

    function findDuplicates(arr) {
      const distinct = new Set(arr); // 성능 향상을 위해
      const filtered = arr.filter((item) => {
        // 맨 처음 만날 때 집합에서 요소를 제거합니다.
        if (distinct.has(item)) {
          distinct.delete(item);
        }
        // 후속 만남에서 요소를 반환합니다.
        else {
          return item;
        }
      });

      return [...new Set(filtered)];
    }

    const onlyFiltered = findDuplicates(res);
    const set = new Set(res);
    const realRes =
      filteredButton.length ===
        filteredButton.filter(
          (items) =>
            filterItem[1].category.filter((item) => item.title === items)
              .length > 0
        ).length || filterClick === 1
        ? [...set]
        : onlyFiltered;
    setFilterFoodData(realRes);
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
      console.log("hi");
      const firstIndexFiltered = filteredButton.filter((item) => {
        if (item === "요알못" || item === "요잘알") {
          return;
        } else {
          return item;
        }
      });
      setFilteredButton((prev) => [...firstIndexFiltered, itemName]);
      console.log(firstIndexFiltered, filterClick);
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

    console.log(filteredButton);
    console.log(isClicked);
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
        ></Filter>
      ) : (
        ""
      )}
      <FilterOp show={show}></FilterOp>
      <HeaderContainer ref={headerContainerRef}>
        <HeaderMainContainer>
          <ButtonIconContainer>
            <PreviousPageBtn></PreviousPageBtn>
            <FilterButton handleShow={handleShow}></FilterButton>
          </ButtonIconContainer>
          <TitleWhoIs scrollY={scrollY}>
            셰프의 재료로 만들 수 있는<br></br>멋진 요리들이에요{" "}
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
      <MainContainer headerContainerHeight={headerContainerHeight}>
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
        <ListContainer>
          {/* {filterFoodData.length > 0
            ? filterFoodData.map((item) => (
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
              ))
            : "레시피가없어용"} */}
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
      </MainContainer>
      <UpButton scrollY={scrollY} onClick={handleScroll}>
        <StyledMyIconUp></StyledMyIconUp>
      </UpButton>
    </ResultListWrapper>
  );
};

export default ResultList;
const ResultListWrapper = styled.div`
  position: relative;
  width: 100%;
  margin: auto;
  box-sizing: border-box;
`;

const FilterOp = styled.div`
  display: ${({ show }) => (show ? "block" : "none")};
  /* visibility: ${({ show }) => (show ? "visible" : "hidden")}; */
  position: fixed;
  width: 400px;
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
  width: 418px;
  position: fixed;
  top: 0px;
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
  line-height: 120%;
  img {
    transform: translateX(-10%) translateY(-10%);
  }
`;

const TitleChosen = styled.div`
  margin-top: 8px;
  font-weight: 600;
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
  min-height: 100vh;
  padding: 16px;
  padding-top: ${(props) => `${props.headerContainerHeight}px`};
  padding-bottom: 50px;
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
`;

const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-bottom: 20px;
  cursor: pointer;
  img {
    object-fit: cover;
    width: 100%;
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
  display: ${({ scrollY }) => (scrollY > 0 ? "auto" : "none")};
  width: 45px;
  height: 45px;
  line-height: 45px;
  text-align: center;
  border-radius: 50%;
  position: sticky;
  bottom: 94px;
  transform: translateX(350px);
  background-color: white;
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.2);
  transition: all 300ms ease;
`;
const StyledMyIconUp = styled(ArrowRight)`
  transform: translateY(-2px);
`;

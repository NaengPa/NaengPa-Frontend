import React, { useEffect, useState } from "react";
import styled from "styled-components";
import FoodButton from "../../components/FoodButton";
import { ReactComponent as searchXButton } from "../../assets/searchXButton.svg";
import { ReactComponent as inputSearchButton } from "../../assets/inputSearch.svg";
import { ReactComponent as Loading } from "../../assets/loading.svg";
import { useRecoilState } from "recoil";
import { myFrigeAtom, selectedIngredientAtom } from "../../atom";
import FrigeButton from "../../components/FrigeButton";
import { useNavigate } from "react-router-dom";
import SearchButton from "../../components/SearchButton";
import { getFrigeIrdnt, getIngredients } from "../../common/axios";
import apple from "../../assets/apple.png";
import { useQueries } from "react-query";

function SearchIndex() {
  const [searchInput, setSearchInput] = useState("");
  const [selectedIngredient, setSelectedIngredient] = useRecoilState(
    selectedIngredientAtom
  );
  const [viewMyFrigeAtom, setViewMyFrigeAtom] = useRecoilState(myFrigeAtom);
  const [searchData, setSearchData] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const navigate = useNavigate();
  const results = useQueries([
    {
      queryKey: "searchData2",
      queryFn: () => getIngredients(),
    },
    {
      queryKey: [
        "myFrigeData",
        JSON.parse(localStorage.getItem("userInfo")).email,
      ],
      queryFn: () =>
        getFrigeIrdnt(JSON.parse(localStorage.getItem("userInfo")).email),
    },
  ]);
  console.log(results[0].data);

  const isLoadingSearch = results[0].isLoading;
  const isLoadingFrige = results[1].isLoading;

  useEffect(() => {
    if (selectedIngredient?.length > 0) {
      setSearchData(
        results[0].data.filter(
          (item) => selectedIngredient.includes(item) === false
        )
      );
    } else {
      setSearchData(results[0].data);
    }
    setViewMyFrigeAtom(results[1].data);
  }, []);

  useEffect(() => {
    if (searchInput !== "") {
      setFilterData(
        results[0].data?.filter((item) => item.includes(searchInput))
      );
    } else {
      setFilterData([]);
    }
  }, [searchInput, searchData]);

  const addListClick = (buttonName) => {
    setSelectedIngredient([...selectedIngredient, buttonName]);
    setSearchData(searchData.filter((item) => item !== buttonName));
  };

  const handleDelete = (itemName) => {
    setSelectedIngredient(
      selectedIngredient.filter((item) => item !== itemName)
    );
    setSearchData([...searchData, itemName]);
  };

  const handleChangingSearch = (e) => {
    setSearchInput(e.target.value);
  };

  const handleXButton = () => {
    setSearchInput("");
  };

  const handleAdd = (itemName) => {
    if (selectedIngredient.includes(itemName)) {
      setSelectedIngredient(
        selectedIngredient.filter((item) => item !== itemName)
      );
      setSearchData([...searchData, itemName]);
    } else {
      setSelectedIngredient([...selectedIngredient, itemName]);
      setSearchData(searchData.filter((item) => item !== itemName));
    }
  };

  const moveToNext = () => {
    navigate("/resultlist");
  };
  return (
    <StyledContainer>
      <SearchContainer>
        <RefridgeTitle>
          요리에 사용할 재료를{"\n"}선택해주세요 <img src={apple} alt="" />
        </RefridgeTitle>
        <FormControlWrapper>
          <StyledMyIconSearch searchInput={searchInput}></StyledMyIconSearch>
          <FormInput
            disabled={isLoadingSearch ? true : false}
            placeholder={
              isLoadingSearch
                ? "재료를 불러오고 있어요 "
                : "재료를 검색해주세요"
            }
            value={searchInput}
            onChange={handleChangingSearch}
            searchInput={searchInput}
          />
          {searchInput.length > 0 ? (
            <SearchInputXButton
              searchInput={searchInput}
              onClick={handleXButton}
            >
              <StyledMyIconSearchX></StyledMyIconSearchX>
            </SearchInputXButton>
          ) : (
            ""
          )}
        </FormControlWrapper>
        <SearchListContainer>
          {filterData?.map((item) => {
            return (
              <SearchButton
                addListClick={() => addListClick(item)}
                item={item}
              ></SearchButton>
            );
          })}
        </SearchListContainer>
      </SearchContainer>
      <MainContainer>
        <MyFrigeContainer>
          <SelectTitle>내 냉장고에서도 골라볼래요</SelectTitle>
          <SelectItemArea>
            {isLoadingFrige ? (
              <LoadingIndicator></LoadingIndicator>
            ) : viewMyFrigeAtom?.length === 0 ? (
              `하단의 내 냉장고 아이콘을 누르면 냉장고를 채울 수 있어요.`
            ) : (
              viewMyFrigeAtom?.map((item) => (
                <FrigeButton
                  handleAdd={() => handleAdd(item)}
                  item={item}
                ></FrigeButton>
              ))
            )}
          </SelectItemArea>
        </MyFrigeContainer>
        <IngredientContainer>
          <SelectTitle>이 재료들로 요리할래요</SelectTitle>

          <FoodButtonContainer>
            {selectedIngredient === []
              ? null
              : selectedIngredient.map((item) => (
                  <FoodButton
                    key={item.id}
                    handleDelete={() => handleDelete(item)}
                    item={item}
                  ></FoodButton>
                ))}
          </FoodButtonContainer>
        </IngredientContainer>
        <RecipeSearchButton
          disabled={isLoadingSearch ? true : false}
          onClick={moveToNext}
        >
          맞춤 레시피 찾기
        </RecipeSearchButton>
        <SearchGradient />
      </MainContainer>
    </StyledContainer>
  );
}
export default SearchIndex;

const StyledContainer = styled.div`
  padding: 40px 16px 0 16px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: ${({ theme }) => theme.colors.WHITE};
  min-height: calc(var(--vh, 1vh) * 100);
  height: 100%;
`;

const RefridgeTitle = styled.h2`
  margin: 0 0 16px 0;
  font-weight: 600;
  font-size: 24px;
  line-height: 30px;
  letter-spacing: -0.165px;
  white-space: pre-wrap;
  img {
    transform: translateY(2px);
  }
`;

const SelectTitle = styled.h3`
  color: ${({ theme }) => theme.colors.GREY_50};
  font-style: normal;
  font-weight: 600;
  font-size: 13px;
  line-height: 20px;
  letter-spacing: -0.01em;
  margin: 0;
`;

const SelectItemArea = styled.div`
  display: flex;
  flex-wrap: wrap;
  min-height: 120px;
  background: ${({ theme }) => theme.colors.GREY_10};
  width: 100%;
  padding: 16px;
  -ms-overflow-style: none;
  border-radius: 5px;
  margin-top: 8px;
  gap: 8px;
  color: ${({ theme }) => theme.colors.GREY_40};
  font-style: normal;
  font-weight: 600;
  font-size: 13px;
  line-height: 20px;
  letter-spacing: -0.01em;
  white-space: pre-wrap;
`;
const FoodButtonContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  min-height: 120px;
  background: ${({ theme }) => theme.colors.GREY_10};
  width: 100%;
  padding: 16px;
  -ms-overflow-style: none;
  border-radius: 5px;
  margin-top: 8px;
  gap: 8px;
  margin-bottom: 138px;
`;

const SearchContainer = styled.div`
  padding-bottom: 37px;
`;

const MyFrigeContainer = styled.div`
  margin-bottom: 16px;
`;

const IngredientContainer = styled.div``;

const StyledMyIconSearch = styled(inputSearchButton)`
  display: ${({ searchInput }) => (searchInput ? "none" : "block")};
  cursor: pointer;
  position: absolute;
  left: 15px;
  top: 24px;
  transform: translateY(-50%);
`;

const FormControlWrapper = styled.div`
  position: relative;
`;

const SearchListContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding-top: 15px;
  gap: 8px;
`;

const StyledMyIconSearchX = styled(searchXButton)``;

const FormInput = styled.input`
  outline: none;
  border: none;
  caret-color: ${({ theme }) => theme.colors.MAIN_COLOR};
  width: 100%;
  padding: 13px 15px;
  padding-left: ${({ searchInput }) => (searchInput === "" ? "37px" : "13px")};
  background: ${({ theme }) => theme.colors.GREY_10};
  border-radius: 5px;
  height: 50px;
  font-size: 14px;
  font-weight: 500;
  ::placeholder {
    color: ${({ theme }) => theme.colors.GREY_50};
  }
`;

const SearchInputXButton = styled.div`
  width: 22px;
  height: 22px;
  background-color: ${({ theme }) => theme.colors.MAIN_COLOR};
  border-radius: 50%;
  display: ${({ searchInput }) => (searchInput ? "block" : "none")};
  cursor: pointer;
  position: absolute;
  right: 15px;
  top: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const RecipeSearchButton = styled.button`
  position: fixed;
  bottom: 72px;
  width: calc(100% - 32px);
  max-width: calc(420px - 32px);
  margin: 0 -16px 0 0px;

  align-items: center;
  color: #ffffff;
  cursor: pointer;
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 20px;
  text-align: center;
  color: #ffffff;
  height: 50px;
  background: ${(props) => props.theme.colors.MAIN_COLOR};
  border-radius: 5px;
  z-index: 1;
  &:disabled {
    background: ${(props) => props.theme.colors.GREY_30};
    box-shadow: none;
  }
`;

const MainContainer = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
`;

const SearchGradient = styled.div`
  z-index: 0;
  width: calc(100% - 32px);
  max-width: calc(420px - 32px);
  height: 178px;
  position: fixed;
  bottom: 56px;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0), #ffffff 55.59%);
  pointer-events: none;
`;

const LoadingIndicator = styled(Loading)`
  width: 40px;
  height: 40px;
  animation: rotate_loading 2s linear infinite;
  transform-origin: 50% 50%;
  margin: auto;

  @keyframes rotate_loading {
    100% {
      transform: rotate(360deg);
    }
  }
`;

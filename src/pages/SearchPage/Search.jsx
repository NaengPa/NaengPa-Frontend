import React, { useEffect, useState } from "react";
import styled from "styled-components";
import FoodButton from "../../components/foodButton";
import { ReactComponent as searchXButton } from "../../assets/searchXButton.svg";
import { ReactComponent as inputSearchButton } from "../../assets/inputSearch.svg";
import { ReactComponent as Loading } from "../../assets/loading.svg";
import { useRecoilState } from "recoil";
import { myFrigeAtom, selectedIngredientAtom } from "../../atom";
import FrigeButton from "../../components/frigeButton";
import { useNavigate } from "react-router-dom";
import SearchButton from "../../components/searchButton";
import { getFrigeIrdnt, getIngredients } from "../../common/axios";

function SearchIndex() {
  const [searchInput, setSearchInput] = useState("");
  const [selectedIngredient, setSelectedIngredient] = useRecoilState(
    selectedIngredientAtom
  );
  const [viewMyFrigeAtom, setViewMyFrigeAtom] = useRecoilState(myFrigeAtom);
  const [data, setData] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const [loadingState, setLoadingState] = useState(false);

  useEffect(() => {
    const getIngredient = async () => {
      const result = await getIngredients();
      setData(result);
    };

    const get = async () => {
      const result = await getFrigeIrdnt(
        JSON.parse(localStorage.getItem("userInfo")).email
      );
      setViewMyFrigeAtom(result);
      setLoadingState(false);
    };
    if (localStorage.getItem("token")) {
      setLoadingState(true);
      get();
    }
    getIngredient();
  }, []);

  useEffect(() => {
    if (searchInput !== "") {
      setFilterData(data.filter((item) => item.includes(searchInput)));
    } else {
      setFilterData([]);
    }
  }, [searchInput, data]);

  const addListClick = (e) => {
    setSelectedIngredient([...selectedIngredient, e.target.textContent]);
    setData(data.filter((item) => item !== e.target.textContent));
  };

  const handleDelete = (e) => {
    setSelectedIngredient(
      selectedIngredient.filter((item) => item !== e.target.textContent)
    );
    setData([...data, e.target.textContent]);
  };

  const handleChangingSearch = (e) => {
    setSearchInput(e.target.value);
  };

  const handleXButton = () => {
    setSearchInput("");
  };

  const handleAdd = (e) => {
    const targetText = e.target.textContent;
    if (selectedIngredient.includes(targetText)) {
      setSelectedIngredient(
        selectedIngredient.filter((item) => item !== targetText)
      );
      setData([...data, targetText]);
    } else {
      setSelectedIngredient([...selectedIngredient, e.target.textContent]);
      setData(data.filter((item) => item !== targetText));
    }
  };

  const navigate = useNavigate();

  const moveToNext = (e) => {
    navigate("/resultlist");
  };
  return (
    <StyledContainer>
      <SearchContainer>
        <RefridgeTitle>
          요리에 사용할 재료를{"\n"}선택해주세요. 🍎
        </RefridgeTitle>
        <FormControlWrapper>
          <StyledMyIconSearch searchInput={searchInput}></StyledMyIconSearch>
          <FormInput
            placeholder={
              data.length > 0 ? "재료를 검색해주세요" : "재료를 불러오고 있어요"
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
          {filterData.map((item) => {
            return (
              <SearchButton
                addListClick={addListClick}
                item={item}
              ></SearchButton>
            );
          })}
        </SearchListContainer>
      </SearchContainer>
      <MainContainer>
        <MyFrigeContainer>
          <SelectTitle>내 냉장고에서도 골라보세요</SelectTitle>
          <SelectItemArea>
            {loadingState ? (
              <LoadingIndicator></LoadingIndicator>
            ) : viewMyFrigeAtom.length === 0 ? (
              `하단의 내 냉장고 아이콘을 누르면${"\n"}냉장고를 채울 수 있어요`
            ) : (
              viewMyFrigeAtom.map((item) => (
                <FrigeButton handleAdd={handleAdd} item={item}></FrigeButton>
              ))
            )}
          </SelectItemArea>
        </MyFrigeContainer>
        <IngredientContainer>
          <SelectTitle>이 재료들로 요리할래요</SelectTitle>
          {/* TODO: 선택한 재료가 있는 경우/없는 경우*/}
          <FoodButtonContainer>
            {selectedIngredient === []
              ? null
              : selectedIngredient.map((item) => (
                  <FoodButton
                    key={item.id}
                    handleDelete={handleDelete}
                    item={item}
                  ></FoodButton>
                ))}
          </FoodButtonContainer>
        </IngredientContainer>
        <RecipeSearchButton
          disabled={data.length > 0 ? false : true}
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

const IngredientContainer = styled.div`
  /* margin-bottom: 16px; */
`;

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
  /* width: calc(100% - 32px);
  max-width: calc(420px - 32px); */
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
  /* padding-bottom: 56px; */
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

import React, { useEffect, useState } from "react";
import styled from "styled-components";
import FoodButton from "../../components/foodButton";
import { ReactComponent as searchXButton } from "../../assets/searchXButton.svg";
import { ReactComponent as inputSearchButton } from "../../assets/inputSearch.svg";
import axios from "axios";
import { useRecoilState } from "recoil";
import { myFrigeAtom, selectedIngredientAtom } from "../../atom";
import FrigeButton from "../../components/frigeButton";
import { useNavigate } from "react-router-dom";
import SearchButton from "../../components/searchButton";
import { getIngredients } from "../../common/axios";

function SearchIndex() {
  const [searchInput, setSearchInput] = useState("");
  const [selectedIngredient, setSelectedIngredient] = useRecoilState(
    selectedIngredientAtom
  );
  const [viewMyFrigeAtom, setViewMyFrigeAtom] = useRecoilState(myFrigeAtom);
  const [data, setData] = useState([]);
  const [filterData, setFilterData] = useState([]);
  useEffect(() => {
    const getIngredient = async () => {
      const result = await getIngredients();
      setData(result);
    };
    getIngredient();
    console.log(viewMyFrigeAtom);
  }, []);

  console.log(window.location.pathname);
  useEffect(() => {
    if (searchInput !== "") {
      setFilterData(data.filter((item) => item.includes(searchInput)));
    } else {
      setFilterData([]);
    }
  }, [searchInput, data]);

  const addListClick = (e) => {
    console.log(e);
    setSelectedIngredient([...selectedIngredient, e.target.textContent]);
    setData(data.filter((item) => item !== e.target.textContent));
  };
  const handleDelete = (e) => {
    console.log(e);
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
    setSelectedIngredient([...selectedIngredient, e.target.textContent]);
    setData(data.filter((item) => item !== e.target.textContent));
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
          <StyledMyIconSearchX
            searchInput={searchInput}
            onClick={handleXButton}
          ></StyledMyIconSearchX>
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
            {viewMyFrigeAtom.length === 0
              ? "냉장고가 비었어요! 하단의 냉장고 버튼을 눌러서 냉장고를 채워주세요"
              : viewMyFrigeAtom.map((item) => (
                  <FrigeButton handleAdd={handleAdd} item={item}></FrigeButton>
                ))}
          </SelectItemArea>
        </MyFrigeContainer>
        <IngredientContainer>
          <SelectTitle>이 재료들로 요리해요</SelectTitle>
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
  height: calc(var(--vh, 1vh) * 100);
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

const StyledMyIconSearchX = styled(searchXButton)`
  display: ${({ searchInput }) => (searchInput ? "block" : "none")};
  cursor: pointer;
  position: absolute;
  right: 15px;
  top: 16px;
`;

const FormInput = styled.input`
  outline: none;
  border: none;
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

const RecipeSearchButton = styled.button`
  position: fixed;
  bottom: 72px;
  width: calc(100% - 32px);
  max-width: calc(420px - 32px);
  align-items: center;
  color: #ffffff;

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
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0) -10.29%,
    #ffffff 55.59%
  );
  pointer-events: none;
`;

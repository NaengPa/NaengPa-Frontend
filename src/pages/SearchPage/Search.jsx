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
import { get_GetIngredients } from "../../common/axios";

function SearchIndex() {
  const [searchInput, setSearchInput] = useState("");
  const [selectedIngredient, setSelectedIngredient] = useRecoilState(
    selectedIngredientAtom
  );
  const [viewMyFrigeAtom, setViewMyFrigeAtom] = useRecoilState(myFrigeAtom);
  const [data, setData] = useState([]);
  const [filterData, setFilterData] = useState([]);
  useEffect(() => {
    (async () => {
      let promise = new Promise((resolve, reject) => {
        resolve(get_GetIngredients());
      });
      let result = await promise;
      setData(result);
    })();
  }, []);

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
          요리에 사용할 재료를
          <br />
          선택해주세요.{" "}
          <img
            alt=""
            width={25}
            height={25}
            src="https://ifh.cc/g/4lkTwh.png"
          ></img>
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
      <MyFrigeContainer>
        <SelectTitle>내 냉장고에서도 골라보세요</SelectTitle>
        <SelectItemArea>
          {viewMyFrigeAtom.length === 0
            ? "하단의 냉장고 버튼을 눌러서 냉장고를 채워주세요"
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
            ? ""
            : selectedIngredient.map((item) => (
                <FoodButton
                  key={item.id}
                  handleDelete={handleDelete}
                  item={item}
                ></FoodButton>
              ))}
        </FoodButtonContainer>
        <SelectedItemWrap></SelectedItemWrap>
      </IngredientContainer>
      <RecipeSearchButton data={data} onClick={moveToNext}>
        레시피 검색하기
      </RecipeSearchButton>
    </StyledContainer>
  );
}
export default SearchIndex;

const StyledContainer = styled.div`
  padding-left: 27px;
  padding-right: 27px;
  padding-bottom: 64px;
`;

const RefridgeTitle = styled.h2`
  margin-top: 34px;
  margin-bottom: 19px;
  font-weight: 600;
  font-size: 24px;
  line-height: 30px;
  letter-spacing: -0.165px;
  img {
    transform: translateY(-20%);
  }
`;

const SelectTitle = styled.h3`
  color: #a6a6a6;
  margin-bottom: 6px;
  font-weight: 500;
  font-size: 14px;
  line-height: 17px;
  letter-spacing: -0.165px;
`;
const SelectedItemWrap = styled.div`
  margin-bottom: 20px;
  padding-bottom: 10px;
`;
const SelectItemArea = styled.h3`
  display: flex;
  flex-wrap: wrap;
  height: 165px;
  padding: 17px 19px;
  font-weight: 500;
  font-size: 14px;
  line-height: 17px;
  letter-spacing: -0.165px;
  color: #9ba1af;
  background: #eef1f7;
  border-radius: 10px;
`;
const FoodButtonContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  min-height: 120px;
  background: #eef1f7;
  width: 100%;
  padding: 21px 14px;
  -ms-overflow-style: none;
  border-radius: 10px;
`;

const SearchContainer = styled.div`
  padding-bottom: 37px;
`;

const MyFrigeContainer = styled.div``;

const IngredientContainer = styled.div``;

const StyledMyIconSearch = styled(inputSearchButton)`
  display: ${({ searchInput }) => (searchInput ? "none" : "block")};
  cursor: pointer;
  position: absolute;
  left: 15px;
  top: 22px;
  transform: translateY(-50%);
`;

const FormControlWrapper = styled.div`
  position: relative;
`;

const SearchListContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding-top: 15px;
`;

const StyledMyIconSearchX = styled(searchXButton)`
  display: ${({ searchInput }) => (searchInput ? "block" : "none")};
  cursor: pointer;
  position: absolute;
  right: 15px;
  top: 13px;
`;

const FormInput = styled.input`
  outline: none;
  border: none;
  width: 100%;
  padding: 13px 15px;
  padding-left: ${({ searchInput }) => (searchInput === "" ? "37px" : "13px")};
  background: #eef1f7;
  border-radius: 10px;
  height: 42px;
  font-size: 14px;
  font-weight: 500;
  ::placeholder {
    color: #9ba1af;
  }
`;

const RecipeSearchButton = styled.div`
  margin-bottom: 21px;
  padding: 10px 20px;
  height: 57px;
  box-shadow: 0px 3px 10px #a9d0ff;
  line-height: 65px;
  font-weight: 600;
  font-size: 16px;
  line-height: 37px;
  letter-spacing: -0.165px;
  color: #fff;
  background: ${({ data }) => (data.length > 0 ? "#2e8cfe" : "#A9A9A9")};
  border-radius: 10px;
  box-sizing: border-box;
  pointer-events: ${({ data }) => (data.length > 0 ? "auto" : "none")};
  cursor: pointer;
  text-align: center;
`;

import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { ReactComponent as Search } from "../../assets/search.svg";
import { myFrigeAtom } from "../../atom";
import { getIngredients } from "../../common/axios";
import AllFrigeList from "./AllFrigeList";

const FrigeWrapper = styled.div`
  height: 100vh;
`;

const FrigeSearchContainer = styled.div`
  width: 100%;
  padding: 70px 27px 0px 27px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.05);
  background-color: white;
`;

const FrigeTitle = styled.p`
  font-style: normal;
  font-weight: 600;
  font-size: 24px;
  line-height: 30px;
  color: #132029;

  white-space: pre-wrap;
`;

const InputWrapper = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
  padding-left: 16px;
  margin-bottom: 16px;
  height: 50px;
  background: #eff3f8;
  border-radius: 5px;
`;

const StyledInput = styled.input`
  position: absolute;
  width: 90%;
  height: 100%;
  /* padding-left: 30px; */
  background: transparent;

  border: none;

  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 17px;

  color: #1e313e;

  ::placeholder {
    font-style: normal;
    font-weight: 600;
    font-size: 14px;
    line-height: 17px;
    color: #698292;
  }
  &:focus {
    outline: none;
  }
`;

const IngredientItemList = styled.div`
  display: flex;
  padding-bottom: 16px;
  height: 100%;
  flex-wrap: wrap;
  gap: 8px;
`;

const AllFrigeListContainer = styled.div`
  display: flex;
  padding-bottom: 23px;
  height: calc(100vh - 360px);
`;

const IngredientItem = styled.button`
  height: 36px;
  border: 1px solid #b6c4cf;
  border-radius: 50px;
  display: flex;
  align-items: center;
  padding: 0;
  font-style: normal;
  font-weight: 600;
  font-size: 13px;
  line-height: 20px;
  text-align: center;
  letter-spacing: -0.005em;
  color: #425867;
`;

const SelectedIngredientItem = styled.button`
  background: #0091ff;
  border: 1px solid #0091ff;
  border-radius: 50px;
  display: flex;
  align-items: center;
  height: 36px;
  padding: 0;
  color: #ffffff;
`;

const IngredientName = styled.p`
  margin: 10px 15px;
  font-weight: 500;
  font-size: 14px;
  line-height: 120%;
  letter-spacing: -0.03em;
`;

const SelectionCompleteBtn = styled.button`
  bottom: 83px;
  width: 100%;
  align-items: center;
  color: #ffffff;

  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 20px;
  text-align: center;
  color: #ffffff;
  height: 50px;
  background: #0091ff;
  border-radius: 5px;

  &:disabled {
    background: #b6c4cf;
    box-shadow: none;
  }
`;

const FrigeGradient = styled.div`
  z-index: 0;
  width: 100%;
  height: 170px;
  position: absolute;
  bottom: 64px;
  background: linear-gradient(
    181.02deg,
    rgba(255, 255, 255, 0) 13.62%,
    #ffffff 55.49%
  );
`;

const Wrapper = styled.div`
  z-index: 1;
  width: 100%;
  padding: 0 27px;
  position: fixed;
  max-width: 420px;
  bottom: 80px;
`;

function Frige() {
  const [searchText, setSearchText] = useState("");
  const [myFrige, setMyFrige] = useRecoilState(myFrigeAtom);
  const [irdnt, setIrdnt] = useState([]);

  useEffect(() => {
    async function get() {
      const result = await getIngredients();
      setIrdnt(result);
    }
    get();
  }, []);

  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setSearchText(value);
  };

  const filteredIrdntList = [...irdnt].filter(
    (item) => searchText !== "" && item.includes(searchText)
  );

  return (
    <FrigeWrapper>
      <FrigeSearchContainer>
        <FrigeTitle>셰프의 냉장고 재료를{"\n"}선택해주세요 🥦</FrigeTitle>
        <InputWrapper>
          {!searchText && <Search />}

          <StyledInput
            value={searchText}
            onChange={onChange}
            placeholder="        재료를 검색해 주세요"
          ></StyledInput>
        </InputWrapper>
        <IngredientItemList>
          {filteredIrdntList.map((item) => (
            <div>
              {myFrige.indexOf(item) === -1 ? (
                <IngredientItem
                  onClick={() => {
                    setMyFrige((prev) => [...prev, item]);
                  }}
                >
                  <IngredientName>{item}</IngredientName>
                </IngredientItem>
              ) : (
                <SelectedIngredientItem
                  onClick={() =>
                    setMyFrige((prev) =>
                      [...prev].filter((element) => element !== item)
                    )
                  }
                >
                  <IngredientName>{item}</IngredientName>
                </SelectedIngredientItem>
              )}
            </div>
          ))}
        </IngredientItemList>
      </FrigeSearchContainer>
      <AllFrigeListContainer>
        <AllFrigeList irdnt={irdnt} />
      </AllFrigeListContainer>
      <Wrapper>
        {myFrige.length === 0 ? (
          <SelectionCompleteBtn disabled>선택 완료</SelectionCompleteBtn>
        ) : (
          <Link to={{ pathname: "/myfrige" }}>
            <SelectionCompleteBtn>선택 완료</SelectionCompleteBtn>
          </Link>
        )}
      </Wrapper>
      <FrigeGradient />
    </FrigeWrapper>
  );
}

export default Frige;

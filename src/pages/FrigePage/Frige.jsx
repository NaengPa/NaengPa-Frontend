import { useEffect, useRef } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { ReactComponent as Search } from "../../assets/search.svg";
import { myFrigeAtom } from "../../atom";
import { getIngredients, postFrigeIrdnt } from "../../common/axios";
import AllFrigeList from "../../components/FrigePage/AllFrigeList";
import LoadingPortal from "../../components/LoadingPortal";
import LoadingScreen from "../../components/LoadingScreen";

const FrigeWrapper = styled.div`
  height: calc(var(--vh, 1vh) * 100);
  overflow-y: hidden;
  display: flex;
  flex-direction: column;
  position: relative;
`;

const FrigeSearchContainer = styled.div`
  width: 100%;
  padding: 40px 16px 0px 16px;
  box-shadow: ${(props) =>
    props.isInputFocused
      ? "0px 4px 10px rgba(0, 0, 0, 0.05)"
      : props.filteredIrdntList.length > 0
      ? "0px 4px 10px rgba(0, 0, 0, 0.05)"
      : "none"};
  margin-bottom: ${(props) =>
    props.isInputFocused
      ? "24px"
      : props.filteredIrdntList.length > 0
      ? "24px"
      : "16px"};
  background-color: white;
`;

const FrigeTitle = styled.p`
  font-style: normal;
  font-weight: 600;
  font-size: 24px;
  line-height: 30px;
  color: ${(props) => props.theme.colors.GREY_90};
  margin: 0;
  white-space: pre-wrap;
`;

const InputWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  padding: 0 16px;
  margin-top: 16px;
  height: 50px;
  background: ${(props) => props.theme.colors.GREY_10};
  border-radius: 5px;
`;

const StyledSearch = styled(Search)`
  display: ${(props) => (props.isInputFocused ? "none" : "flex")};
`;

const StyledInput = styled.input`
  display: flex;
  width: 100%;
  height: 100%;

  background: transparent;
  border: none;
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 17px;
  color: ${(props) => props.theme.colors.GREY_80};

  ::placeholder {
    font-style: normal;
    font-weight: 600;
    font-size: 14px;
    line-height: 17px;
    color: ${(props) => props.theme.colors.GREY_50};
  }
  &:focus {
    outline: none;
    ::placeholder {
      opacity: 0;
    }
  }
`;

const IngredientItemList = styled.div`
  display: flex;
  padding: ${(props) =>
    props.isInputFocused
      ? props.filteredIrdntList.length > 0
        ? "16px 0"
        : "24px 0 0 0"
      : props.filteredIrdntList.length > 0
      ? "16px 0"
      : "0"};
  flex-wrap: wrap;
  gap: 8px;
`;

const AllFrigeListContainer = styled.div`
  display: flex;
  height: calc(100% - 322px - ${(props) => props.searchHeight}px);
  box-sizing: border-box;
  overflow-y: hidden;
`;

const IngredientItem = styled.button`
  height: 36px;
  border: 1px solid ${(props) => props.theme.colors.GREY_30};
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
  color: ${(props) => props.theme.colors.GREY_60};
`;

const SelectedIngredientItem = styled.button`
  background: ${(props) => props.theme.colors.MAIN_COLOR};
  border: 1px solid ${(props) => props.theme.colors.MAIN_COLOR};
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
  z-index: 1;
  bottom: 72px;
  width: calc(100% - 32px);
  max-width: calc(420px - 32px);
  position: fixed;
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

  &:disabled {
    background: ${(props) => props.theme.colors.GREY_30};
    box-shadow: none;
  }
`;

const FrigeGradient = styled.div`
  z-index: 0;
  width: calc(100% - 32px);
  max-width: calc(420px - 32px);
  height: 178px;
  position: fixed;
  bottom: 56px;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0), #ffffff 55.59%);
  pointer-events: none;
`;

function Frige() {
  const [searchText, setSearchText] = useState("");
  const [myFrige, setMyFrige] = useRecoilState(myFrigeAtom);
  const [irdnt, setIrdnt] = useState([]);
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [searchHeight, setSearchHeight] = useState("");
  const [isDisabled, setIsDisabled] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const searchRef = useRef();

  useEffect(() => {
    console.log(myFrige);
    myFrige.length > 0 ? setIsDisabled(false) : setIsDisabled(true);
  }, [myFrige]);

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

  useEffect(() => {
    setSearchHeight(searchRef.current.offsetHeight);
  }, [filteredIrdntList]);

  const handleMyFrige = (e) => {
    setMyFrige((prev) => {
      return [...prev].sort();
    });
    const newFrigeData = {
      email: JSON.parse(localStorage.getItem("userInfo")).email,
      irdntNms: myFrige,
    };
    const post = async () => {
      setIsLoading(true);
      await postFrigeIrdnt(newFrigeData);
      setIsLoading(false);
      navigate("/myfrige");
    };

    post();
  };

  return (
    <FrigeWrapper>
      <LoadingPortal>{isLoading ? <LoadingScreen /> : null}</LoadingPortal>
      <FrigeSearchContainer
        filteredIrdntList={filteredIrdntList}
        isInputFocused={isInputFocused}
      >
        <FrigeTitle>
          {JSON.parse(localStorage.getItem("userInfo")).nickname}의 냉장고
          재료를{"\n"}선택해주세요 🥦
        </FrigeTitle>
        <InputWrapper>
          {!searchText && <StyledSearch isInputFocused={isInputFocused} />}

          <StyledInput
            value={searchText}
            onChange={onChange}
            placeholder="찾으시는 재료의 검색도 가능해요"
            onFocus={() => setIsInputFocused(true)}
            onBlur={() => setIsInputFocused(false)}
          ></StyledInput>
        </InputWrapper>

        <IngredientItemList
          filteredIrdntList={filteredIrdntList}
          isInputFocused={isInputFocused}
          ref={searchRef}
        >
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
            //TODO 유니크한 키 부여하기
          ))}
        </IngredientItemList>

        <SelectionCompleteBtn disabled={isDisabled} onClick={handleMyFrige}>
          선택 완료
        </SelectionCompleteBtn>

        <FrigeGradient />
      </FrigeSearchContainer>
      <AllFrigeListContainer searchHeight={searchHeight}>
        <AllFrigeList irdnt={irdnt} />
      </AllFrigeListContainer>
    </FrigeWrapper>
  );
}

export default Frige;

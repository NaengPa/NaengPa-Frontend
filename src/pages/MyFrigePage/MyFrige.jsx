import { Link } from "react-router-dom";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { myFrigeAtom } from "../../atom";

const MyFrigeContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  background-color: #ffffff;
  height: 100vh;
  padding: 0px 16px;

  overflow-y: hidden;
  ::-webkit-scrollbar {
    display: none;
  }
`;

const MyFrigeTitle = styled.p`
  margin-top: 40px;
  font-style: normal;
  font-weight: 600;
  font-size: 24px;
  line-height: 30px;
  color: ${(props) => props.theme.colors.GREY_90};

  white-space: pre-wrap;
`;

const MyFrigeListContainer = styled.div`
  background: ${(props) => props.theme.colors.GREY_10};
  border-radius: 5px;
  width: 100%;
  height: calc(100vh - 256px);
  /* height: 100vh; */
  padding: 16px 16px;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  overflow-y: scroll;
  align-content: flex-start;
`;

const MyFrigeItem = styled.div`
  background: ${(props) => props.theme.colors.MAIN_COLOR};
  border: 1px solid ${(props) => props.theme.colors.MAIN_COLOR};
  border-radius: 50px;
  display: flex;
  align-items: center;
  height: 36px;
  padding: 0;
  color: #ffffff;
`;

const MyFrigeName = styled.p`
  margin: 10px 15px;
  font-weight: 500;
  font-size: 14px;
  line-height: 120%;
  letter-spacing: -0.03em;
`;

const SelectionCompleteBtn = styled.button`
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

const FrigeGradient = styled.div`
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
`;

function MyFrige() {
  const myFrige = useRecoilValue(myFrigeAtom);

  return (
    <MyFrigeContainer>
      <MyFrigeTitle>
        오래된 재료는 비워지고{"\n"}행복은 채워질 셰프의 냉장고 🥰
      </MyFrigeTitle>
      <MyFrigeListContainer>
        {myFrige.map((item) => (
          <MyFrigeItem>
            <MyFrigeName>{item}</MyFrigeName>
          </MyFrigeItem>
        ))}
      </MyFrigeListContainer>

      <Link to={{ pathname: "/frige" }}>
        <SelectionCompleteBtn>
          {myFrige.length > 0 ? "냉장고 설정 다시하기" : "냉장고 설정하기"}
        </SelectionCompleteBtn>
      </Link>
      <FrigeGradient />
    </MyFrigeContainer>
  );
}

export default MyFrige;

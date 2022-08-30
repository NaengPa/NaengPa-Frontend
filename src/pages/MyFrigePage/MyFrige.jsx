import { Link } from "react-router-dom";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { myFrigeAtom } from "../../atom";

const MyFrigeContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  padding: 0px 27px;
  margin-top: 84px;
`;

const MyFrigeTitle = styled.p`
  font-style: normal;
  font-weight: 600;
  font-size: 24px;
  line-height: 30px;
  color: #132029;

  white-space: pre-wrap;
`;

const MyFrigeListContainer = styled.div`
  background: #eff3f8;
  border-radius: 10px;
  width: 100%;
  height: calc(100vh - 300px);
  padding: 20px 22px;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  overflow-y: scroll;
  align-content: flex-start;
`;

const MyFrigeItem = styled.div`
  background: #0091ff;
  border: 1px solid #0091ff;
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
  width: 90%;
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
  max-width: 420px;
  position: fixed;
  padding: 0 27px;
  bottom: 80px;
`;

function MyFrige() {
  const myFrige = useRecoilValue(myFrigeAtom);
  return (
    <>
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
      </MyFrigeContainer>
      <Wrapper>
        <Link to={{ pathname: "/frige" }}>
          <SelectionCompleteBtn>
            {myFrige.length > 0 ? "냉장고 설정 다시하기" : "냉장고 설정하기"}
          </SelectionCompleteBtn>
        </Link>
      </Wrapper>
      <FrigeGradient />
    </>
  );
}

export default MyFrige;

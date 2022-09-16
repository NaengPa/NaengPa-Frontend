import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import { myFrigeAtom } from "../../atom";
import { getFrigeIrdnt } from "../../common/axios";

const MyFrigeContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  background-color: #ffffff;
  height: calc(var(--vh, 1vh) * 100);
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
  -ms-overflow-style: none;
  white-space: pre-wrap;
  ::-webkit-scrollbar {
    display: none;
  }
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
  const [myFrige, setMyFrige] = useRecoilState(myFrigeAtom);
  useEffect(() => {
    const get = async () => {
      const result = await getFrigeIrdnt(
        JSON.parse(localStorage.getItem("userInfo")).email
      );
      setMyFrige(result);
    };

    get();
  }, []);

  return (
    <MyFrigeContainer>
      <MyFrigeTitle>
        지금{"\n"}
        {JSON.parse(localStorage.getItem("userInfo")).nickname}님의 냉장고에는❄️
      </MyFrigeTitle>
      <MyFrigeListContainer>
        {myFrige.length > 0
          ? myFrige.map((item) => (
              <MyFrigeItem>
                <MyFrigeName>{item}</MyFrigeName>
              </MyFrigeItem>
            ))
          : `내 냉장고가 비어있어요.${"\n"}설정 버튼을 눌러서 재료를 추가해주세요.`}
      </MyFrigeListContainer>

      <Link to={{ pathname: "/frige" }}>
        <SelectionCompleteBtn>내 냉장고 설정</SelectionCompleteBtn>
      </Link>
      <FrigeGradient />
    </MyFrigeContainer>
  );
}

export default MyFrige;

import styled from "styled-components";
import { ReactComponent as BadgeIcon } from "../../assets/badge.svg";
import { ReactComponent as CalenderIcon } from "../../assets/calender.svg";
import { ReactComponent as SavedRecipeIcon } from "../../assets/savedRecipe.svg";
import { ReactComponent as CreatedRecipeIcon } from "../../assets/createdRecipe.svg";
import { useRef, useState } from "react";
import ErrorModal from "./ErrorModal";
import { getLoginInfo } from "../../common/kakaoLogin";
import { useEffect } from "react";

const MyPageWrapper = styled.div`
  background: #f8fbff;
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  padding: 80px 27px 0 27px;
`;
const Background = styled.div`
  position: absolute;
  width: 100%;
  height: 521px;
  left: 0px;
  top: -195px;
  background: #2e8cfe;
  border-radius: 187.5px;
  z-index: 10;
`;

const User = styled.div`
  width: 100%;
  height: 40%;
  background: #ffffff;
  box-shadow: 0px 0px 20px rgba(46, 140, 254, 0.05);
  border-radius: 10px;
  max-width: 100%;
  z-index: 20;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  img {
    width: 94px;
    height: 94px;
    border-radius: 50%;
  }
`;
const UserProfileImg = styled.img``;
const UserNameTitle = styled.span`
  font-weight: 600;
  font-size: 24px;
  line-height: 120%;
  color: #232323;
  margin-top: 12px;
`;
const UserNameSubtitle = styled.span`
  font-weight: 500;
  font-size: 14px;
  line-height: 120%;
  text-align: center;
  letter-spacing: -0.05em;
  color: #232323;
  margin-top: 2px;
`;
const UserDescriptionContainer = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 13px;
`;

const UserDescription = styled.div`
  height: 31px;
  padding: 7px 15px;
  background: #2e8cfe;
  border-radius: 50px;
  font-weight: 500;
  font-size: 14px;
  line-height: 120%;
  letter-spacing: -0.03em;

  color: #ffffff;
`;

const Btn = styled.button`
  display: flex;
  flex-direction: column;
  width: 47.5%;
  height: 19vh;
  background: #ffffff;
  box-shadow: 0px 0px 20px rgba(46, 140, 254, 0.05);
  border-radius: 20px;
  padding: 0;
  margin-bottom: 17px;
  justify-content: space-between;
  padding: 20px 15px;
`;
const BtnTitle = styled.span`
  font-weight: 600;
  font-size: 18px;
  line-height: 120%;
  color: #232323;
  white-space: pre-wrap;
  text-align: left;
`;
const BtnContainer = styled.div`
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-top: 21px;
`;

const IconContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
`;

function MyPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userInfo, setUserInfo] = useState();
  const handleModal = () => {
    setIsModalOpen((prev) => !prev);
  };

  useEffect(() => {
    const getInfo = async () => {
      const result = await getLoginInfo(localStorage.getItem("token"));
      setUserInfo(result);
    };
    getInfo();
  }, []);

  return (
    <>
      {isModalOpen ? (
        <ErrorModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
      ) : null}
      <MyPageWrapper>
        <Background />
        <User>
          <img src={userInfo?.imgUrl} alt="" />
          <UserNameTitle>{userInfo?.nickname}</UserNameTitle>
          <UserNameSubtitle>반가운 냉파 셰프</UserNameSubtitle>
          <UserDescriptionContainer>
            <UserDescription>혼밥</UserDescription>
            <UserDescription>비건식</UserDescription>
            <UserDescription>술안주</UserDescription>
          </UserDescriptionContainer>
        </User>

        <BtnContainer>
          <Btn onClick={handleModal}>
            <BtnTitle>내가 받은{"\n"}뱃지</BtnTitle>
            <IconContainer>
              <BadgeIcon />
            </IconContainer>
          </Btn>
          <Btn onClick={handleModal}>
            <BtnTitle>냉파{"\n"}달력</BtnTitle>
            <IconContainer>
              <CalenderIcon />
            </IconContainer>
          </Btn>
          <Btn onClick={handleModal}>
            <BtnTitle>저장한{"\n"}레시피</BtnTitle>
            <IconContainer>
              <SavedRecipeIcon />
            </IconContainer>
          </Btn>
          <Btn onClick={handleModal}>
            <BtnTitle>내가 만든{"\n"}레시피</BtnTitle>
            <IconContainer>
              <CreatedRecipeIcon />
            </IconContainer>
          </Btn>
        </BtnContainer>
      </MyPageWrapper>
    </>
  );
}
export default MyPage;

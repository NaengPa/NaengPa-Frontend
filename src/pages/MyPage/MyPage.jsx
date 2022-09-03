import styled from "styled-components";
import { ReactComponent as Star } from "../../assets/star.svg";
import { ReactComponent as Calendar } from "../../assets/calendar.svg";
import { ReactComponent as Bookmark } from "../../assets/bookmark.svg";
import { ReactComponent as Article } from "../../assets/article.svg";
import { useState } from "react";
import ErrorModal from "../../components/ErrorModal";
import { useEffect } from "react";
import Divider from "../../components/Divider";

const MyPageWrapper = styled.div`
  background: #f8fbff;
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  padding: 40px 16px 0 16px;
`;
const Background = styled.div`
  position: absolute;
  width: 100%;
  height: 221px;
  left: 0px;
  top: 0;
  background: ${(props) => props.theme.colors.MAIN_COLOR};
  z-index: 10;
`;

const User = styled.div`
  width: 100%;
  height: 240px;
  background: #ffffff;
  box-shadow: 0px 0px 20px rgba(46, 140, 254, 0.05);
  border-radius: 5px;
  max-width: 100%;
  z-index: 20;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const UserProfileImg = styled.img`
  width: 97px;
  height: 97px;
  border-radius: 50%;
  object-fit: cover;
`;

const UserNameTitleSection = styled.span`
  font-weight: 600;
  font-size: 24px;
  line-height: 120%;
  color: #232323;
  margin-top: 12px;
`;

const UserNameTitle = styled.span`
  font-weight: 600;
  font-size: 24px;
  line-height: 120%;
  color: ${(props) => props.theme.colors.MAIN_COLOR};
`;
const UserNameSubtitle = styled.span`
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 17px;
  color: ${(props) => props.theme.colors.GREY_50};
`;

const Btn = styled.button`
  display: flex;
  align-items: center;
  height: 96px;
  padding: 38px 8px;
  margin: 0 8px;
  border-bottom: 1px solid ${(props) => props.theme.colors.GREY_10};
`;

const BtnTitle = styled.span`
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 20px;
  color: ${(props) => props.theme.colors.GREY_90};
  margin-left: 16px;
`;

const BtnContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 24px;
  background: rgba(255, 255, 255, 0.8);
  border: 1px solid #ffffff;
  box-shadow: 0px 0px 10px rgba(182, 196, 207, 0.3);
  border-radius: 5px;
  & > :last-child {
    border: none;
  }
`;

function MyPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userInfo, setUserInfo] = useState();
  const handleModal = () => {
    setIsModalOpen((prev) => !prev);
  };

  useEffect(() => {
    setUserInfo(JSON.parse(localStorage.getItem("userInfo")));
  }, []);

  return (
    <>
      {isModalOpen ? (
        <ErrorModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
      ) : null}
      <MyPageWrapper>
        <Background />
        <User>
          <UserProfileImg src={userInfo?.imgUrl} alt="" />
          <UserNameTitleSection>
            <UserNameTitle>{userInfo?.nickname}</UserNameTitle> 님!
          </UserNameTitleSection>
          <UserNameSubtitle>즐거운 냉파 되세요</UserNameSubtitle>
        </User>

        <BtnContainer>
          <Btn onClick={handleModal}>
            <Star />
            <BtnTitle>내가 받은 뱃지</BtnTitle>
          </Btn>

          <Btn onClick={handleModal}>
            <Calendar />
            <BtnTitle>냉파 출석체크</BtnTitle>
          </Btn>
          <Btn onClick={handleModal}>
            <Bookmark />
            <BtnTitle>저장한 레시피</BtnTitle>
          </Btn>
          <Btn onClick={handleModal}>
            <Article />
            <BtnTitle>내 작성 글</BtnTitle>
          </Btn>
        </BtnContainer>
      </MyPageWrapper>
    </>
  );
}
export default MyPage;

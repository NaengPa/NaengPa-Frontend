import { ReactComponent as ErrorModalIcon } from "../assets/errorModalIcon.svg";
import styled from "styled-components";

const ErrorModalWrapper = styled.div`
  position: absolute;
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
`;

const ErrorModalContainer = styled.div`
  width: 320px;
  height: 425px;
  background: #ffffff;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  justify-content: center;
  z-index: 102;
`;

const ErrorModalTitle = styled.span`
  font-weight: 700;
  font-size: 24px;
  line-height: 120%;
  text-align: center;
  letter-spacing: -0.03em;
  color: #232323;
  margin-top: 17px;
`;

const ErrorModalSubtitle = styled.span`
  font-weight: 500;
  font-size: 12px;
  line-height: 120%;
  text-align: center;
  letter-spacing: -0.03em;
  color: #232323;
  margin-top: 11px;
  white-space: pre-wrap;
`;

const ErrorModalDimmer = styled.div`
  position: absolute;
  background: #3030305a;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  width: 100%;
  height: 100vh;
  z-index: 101;
`;

function ErrorModal({ isModalOpen, setIsModalOpen }) {
  const handleModal = (e) => {
    setIsModalOpen((prev) => !prev);
  };
  return (
    <ErrorModalWrapper>
      <ErrorModalDimmer onClick={handleModal} />
      <ErrorModalContainer>
        <ErrorModalIcon />
        <ErrorModalTitle>서비스 준비 중입니다</ErrorModalTitle>
        <ErrorModalSubtitle>
          행복을 채우는 서비스를 위하여 준비 중에 있습니다.{"\n"}빠른 시일 내에
          준비하여 찾아뵙겠습니다.
        </ErrorModalSubtitle>
      </ErrorModalContainer>
    </ErrorModalWrapper>
  );
}
export default ErrorModal;

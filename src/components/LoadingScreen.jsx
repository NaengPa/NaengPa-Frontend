import Lottie from "lottie-react";
import loadingLottie from "../assets/lottie/loadingLottie.json";
import styled from "styled-components";

const LoadingScreenContainer = styled.div`
  width: 100%;
  max-width: 420px;
  margin: auto;
  left: 50%;
  transform: translateX(-50%);
  height: 100vh;
  position: absolute;
  background-color: white;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
`;
const LottieContainer = styled.div`
  width: 100px;
  display: flex;
`;

function LoadingScreen() {
  return (
    <LoadingScreenContainer>
      <LottieContainer>
        <Lottie animationData={loadingLottie} />
      </LottieContainer>
    </LoadingScreenContainer>
  );
}

export default LoadingScreen;

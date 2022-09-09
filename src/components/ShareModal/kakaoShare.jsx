import React, { useEffect } from "react";
import { ReactComponent as Kakaotalk } from "../../assets/kakaotalk.svg";

const KakaoShare = ({ recipeDetail }) => {
  console.log(recipeDetail);
  useEffect(() => {
    initKakao(); //
  }, []);

  //자바스크립트키로 카카오 init
  const initKakao = () => {
    if (window.Kakao) {
      const kakao = window.Kakao;
      if (!kakao.isInitialized()) {
        kakao.init("a3a9461dc1698830366d7c634ca18e01");
      }
    }
  };

  //버튼을 누르면 실행되는 함수
  const shareKakao = () => {
    //이부분이 매우 헷갈림 여러 사이트를 참고했는데 이 sendDefault부분을 잘 봐야한다.
    window.Kakao.Link.sendDefault({
      objectType: "feed",
      content: {
        title: "title",
        description: "main",
        imageUrl: "imageUrl",
        link: {
          mobileWebUrl: "url",
          webUrl: "url",
        },
      },
      buttons: [
        {
          title: "buttonTitle",
          link: {
            mobileWebUrl: "url",
            webUrl: "url",
          },
        },
      ],
    });
  };

  return <Kakaotalk onClick={shareKakao}></Kakaotalk>;
};

export default KakaoShare;

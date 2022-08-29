import axios from "axios";
let baseURL = process.env.REACT_APP_SERVER_API_KEY;

export async function getKakaoLogin(kakaoUrl) {
  try {
    const { data } = await axios({
      method: "GET",
      url: `${baseURL}/oauth/kakao?code=${kakaoUrl}&redirectUrl=${
        window.location.href.split("?")[0]
      }`,
    });
    return data;
  } catch (error) {
    throw new Error(error);
  }
}

export async function getLoginInfo(value) {
  console.log(localStorage.getItem("token"));
  console.log(value);
  try {
    const { data } = await axios({
      method: "GET",
      url: `${baseURL}/oauth/login`,
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    return data;
  } catch (error) {
    // throw new Error(error);
    console.log(error);
  }
}

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
    localStorage.setItem("token", data);
    return data;
  } catch (error) {
    throw new Error(error);
  }
}

export async function getLoginInfo(value) {
  try {
    const { data } = await axios({
      method: "GET",
      url: `${baseURL}/oauth/login`,
      headers: {
        authorization: `Bearer ${value}`,
      },
    });
    localStorage.setItem("userInfo", JSON.stringify(data));
    return data;
  } catch (error) {
    return error;
  }
}

export async function getRefreshLogin(value) {
  try {
    const { data } = await axios({
      method: "GET",
      url: `${baseURL}/user/refreshSignIn`,
      headers: {
        authorization: `Bearer ${value}`,
      },
    });

    return data;
  } catch (error) {
    throw new Error(error);
  }
}

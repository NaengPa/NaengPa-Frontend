import axios from "axios";
let baseURL = process.env.REACT_APP_SERVER_API_KEY;

export async function getKakaoLogin(kakaoUrl) {
  try {
    const { data } = await axios({
      method: "GET",
      url: `${baseURL}/oauth/kakao?code=${kakaoUrl}`,
    });
    return data;
  } catch (error) {
    throw new Error(error);
  }
}

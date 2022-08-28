import axios from "axios";
let baseURL = process.env.REACT_APP_SERVER_API_KEY;

const client = axios.create({});

client.defaults.headers["Access-Control-Allow-Origin"] = "*";

client.interceptors.request.use(
  (config) => {
    if (!config?.headers) {
      throw new Error(
        `Expected 'config' and 'config.headers' not to be undefined`
      );
    }
    const tokens = localStorage.getItem("token");
    if (!tokens) throw new Error("No tokens found");
    config.headers.authorization = `Bearer ${tokens}`;
    // config.headers
    // Access-Control-Allow-Origin: *
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

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

export async function getLoginInfo(value) {
  console.log(localStorage.getItem("token"));
  console.log(value);
  try {
    const response = await client.put(`${baseURL}/oauth/login`);
    // const { data } = await axios({
    //   method: "GET",
    //   url: `${baseURL}/oauth/login`,
    //   headers: {
    //     authorization: `Bearer ${localStorage.getItem("token")}`,
    //   },
    // });

    return response.data;
  } catch (error) {
    // throw new Error(error);
    console.log(error);
  }
}

import axios from "axios";

const baseURL = process.env.REACT_APP_SERVER_API_KEY;

export async function localSignIn(userInfo) {
  try {
    const { data } = await axios({
      method: "POST",
      url: `${baseURL}/user/signUp`,
      data: {
        email: userInfo.target[0].value,
        nickname: userInfo.target[1].value,
        password: userInfo.target[2].value,
        imgUrl: "",
      },
      headers: { contentType: "application/json" },
    });
    return data;
  } catch (error) {
    throw new Error(error);
  }
}

export async function localLogin(userInfo) {
  try {
    const { data } = await axios({
      method: "POST",
      url: `${baseURL}/user/signIn`,
      data: {
        email: userInfo.target[0].value,
        password: userInfo.target[1].value,
      },
      headers: { contentType: "application/json" },
    });
    return data;
  } catch (error) {
    throw new Error(error);
  }
}

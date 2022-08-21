import axios from "axios";
let baseURL = process.env.REACT_APP_SERVER_API_KEY;

export async function getEmailCheck(value) {
  try {
    const { data } = await axios({
      url: `${baseURL}/user/duplEmail?email=${value}`,
      method: "GET",
    });
    return data;
  } catch (error) {
    throw new Error(error);
  }
}

export async function getNicknameCheck(value) {
  try {
    const { data } = await axios({
      url: `${baseURL}/user/duplNickname?nickname=${value}`,
      method: "GET",
    });
    return data;
  } catch (error) {
    throw new Error(error);
  }
}

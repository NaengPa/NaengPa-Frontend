import axios from "axios";
let baseURL = process.env.REACT_APP_SERVER_API_KEY;

export async function getRecipeList(irdntNms, email) {
  try {
    const response = await axios({
      method: "POST",
      url: `${baseURL}/recipe/getRecipeList`,
      data: {
        irdntNms: [...irdntNms],
        email: email,
      },
      headers: { contentType: "application/json" },
    });
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
}

export async function getIngredients() {
  try {
    let data = [];
    const response = await axios({
      method: "get",
      url: `${baseURL}/recipe/getIrdnt`,
      headers: { contentType: "application/json" },
    });
    for (let i = 0; i < response.data.length; i++) {
      data.push(response.data[i].irdntNm);
    }
    return data;
  } catch (error) {
    throw new Error(error);
  }
}

export async function getRecipeDetail(email, recipeId) {
  try {
    const response = await axios({
      method: "get",
      url: `${baseURL}/recipe/getRecipeDetail/?email=${email}&recipeId=${recipeId}`,
      headers: { contentType: "application/json" },
    });
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
}

export async function likeRecipe(data) {
  try {
    const response = await axios({
      method: "POST",
      url: `${baseURL}/recipe/like`,
      data: data,
      headers: { contentType: "application/json" },
    });
    return response;
  } catch (error) {
    throw new Error(error);
  }
}

export async function getCurRecipeList(numberLimitViewedRecipe) {
  try {
    const response = await axios({
      method: "POST",
      url: `${baseURL}/recipe/getCurRecipeList`,
      data: {
        recipeIds: [...numberLimitViewedRecipe],
      },
      headers: { contentType: "application/json" },
    });
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
}

export async function getArticle(email) {
  try {
    const response = await axios.get(`${baseURL}/board?email=${email}`);
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
}

export async function postArticle(newArticle) {
  try {
    const response = await axios({
      method: "POST",
      url: `${baseURL}/board`,
      data: newArticle,
      headers: { contentType: "application/json" },
    });
    return response;
  } catch (error) {
    throw new Error(error);
  }
}

export async function deleteArticle(id, email) {
  try {
    const response = await axios({
      method: "DELETE",
      url: `${baseURL}/board?id=${id}&email=${email}`,
      headers: { contentType: "application/json" },
    });
    return response;
  } catch (error) {
    throw new Error(error);
  }
}

export async function likeArticle(data) {
  try {
    const response = await axios({
      method: "POST",
      url: `${baseURL}/board/like`,
      data: data,
      headers: { contentType: "application/json" },
    });
    return response;
  } catch (error) {
    throw new Error(error);
  }
}

export async function editArticle(data) {
  try {
    const response = await axios({
      method: "PUT",
      url: `${baseURL}/board`,
      data: data,
      headers: { contentType: "application/json" },
    });
    return response;
  } catch (error) {
    throw new Error(error);
  }
}

export async function postFrigeIrdnt(data) {
  try {
    const response = await axios({
      method: "POST",
      url: `${baseURL}/refrigerator`,
      data: data,
      headers: { contentType: "application/json" },
    });
    return response;
  } catch (error) {
    throw new Error(error);
  }
}

export async function getFrigeIrdnt(email) {
  try {
    const response = await axios.get(`${baseURL}/refrigerator/${email}`);
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
}

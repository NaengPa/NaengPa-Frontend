import axios from "axios";
let baseURL = process.env.REACT_APP_SERVER_API_KEY;

export async function getRecipeList(data) {
  try {
    const response = await axios({
      method: "POST",
      url: `${baseURL}/recipe/getRecipeList`,
      data: {
        irdntNms: [...data],
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

export async function getRecipeDetail(recipeId) {
  try {
    const response = await axios({
      method: "get",
      url: `${baseURL}/recipe/getRecipeDetail/${recipeId}`,
      headers: { contentType: "application/json" },
    });
    return response.data;
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

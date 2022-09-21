import { atom } from "recoil";
import filterItem from "./Constant/constant";
export const selectedIngredientAtom = atom({
  key: "selectedIngredient",
  default: [],
});

export const viewedRecipeAtom = atom({
  key: "viewedRecipe",
  default: [],
});

export const myFrigeAtom = atom({
  key: "viewedFrige",
  default: [],
});

export const pageStateAtom = atom({
  key: "pageState",
  default: [],
});

export const foodDataAtom = atom({
  key: "foodData",
  default: [],
});

export const recipeDetailAtom = atom({
  key: "recipeDetail",
  default: [],
});

export const articleAtom = atom({
  key: "article",
  default: [],
});

export const articleImgAtom = atom({
  key: "articleImg",
  default: [],
});

export const articlePreviewImgAtom = atom({
  key: "articlePreviewImg",
  default: [],
});

export const articleTextAtom = atom({
  key: "articleText",
  default: "",
});

export const articleDeleteAtom = atom({
  key: "articleDelete",
  default: false,
});

export const articleDeleteIdAtom = atom({
  key: "articleDeleteId",
  default: "",
});

export const navBarHeightAtom = atom({
  key: "navBarHeight",
  default: "",
});

export const filterStateAtom = atom({
  key: "filterState",
  default: filterItem,
});

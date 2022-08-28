import { atom } from "recoil";
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
  default: "",
});

export const navBarHeightAtom = atom({
  key: "navBarHeight",
  default: "",
});

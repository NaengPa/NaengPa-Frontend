import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState, useSetRecoilState } from "recoil";

import {
  articleAtom,
  articleImgAtom,
  articlePreviewImgAtom,
  articleTextAtom,
} from "../atom";
import { postArticle } from "../common/axios";

function ArticleUploadBtn() {
  const [text, setText] = useRecoilState(articleTextAtom);
  const [imgList, setImgList] = useRecoilState(articleImgAtom);
  const [isDisabled, setIsDisabled] = useState(true);
  const setPreviewImgList = useSetRecoilState(articlePreviewImgAtom);
  const navigate = useNavigate();

  useEffect(() => {
    imgList.length > 0 && text ? setIsDisabled(false) : setIsDisabled(true);
  }, [text, imgList]);

  const onClick = (event) => {
    event.preventDefault();
    const newArticle = {
      imgs: imgList,
      content: text,
      email: JSON.parse(localStorage.getItem("userInfo")).email,
      recipeId: "",
    };
    async function post(newArticle) {
      await postArticle(newArticle);
    }

    post(newArticle);
    setText("");
    setImgList([]);
    setPreviewImgList([]);
    setIsDisabled(true);
    navigate("/community");
  };
  return (
    <button disabled={isDisabled} onClick={onClick}>
      등록
    </button>
  );
}

export default ArticleUploadBtn;

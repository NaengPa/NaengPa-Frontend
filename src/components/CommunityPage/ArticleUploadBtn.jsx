import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState, useSetRecoilState } from "recoil";

import {
  articleAtom,
  articleImgAtom,
  articlePreviewImgAtom,
  articleTextAtom,
} from "../../atom";
import { postArticle } from "../../common/axios";
import LoadingPortal from "../LoadingPortal";
import LoadingScreen from "../LoadingScreen";

function ArticleUploadBtn() {
  const [text, setText] = useRecoilState(articleTextAtom);
  const [imgList, setImgList] = useRecoilState(articleImgAtom);
  const [isDisabled, setIsDisabled] = useState(true);
  const setPreviewImgList = useSetRecoilState(articlePreviewImgAtom);
  const [article, setArticle] = useRecoilState(articleAtom);
  const [isLoading, setIsLoading] = useState(false);
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
      setIsLoading(true);
      await postArticle(newArticle);
    }

    setArticle((prev) => {
      return [...prev, newArticle];
    });

    const upload = async () => {
      await post(newArticle);
      setText("");
      setImgList([]);
      setPreviewImgList([]);
      setIsDisabled(true);
      setIsLoading(false);
      navigate("/community");
    };

    upload();
  };
  return (
    <>
      <LoadingPortal>{isLoading ? <LoadingScreen /> : null}</LoadingPortal>
      <button disabled={isDisabled} onClick={onClick}>
        등록
      </button>
    </>
  );
}

export default ArticleUploadBtn;

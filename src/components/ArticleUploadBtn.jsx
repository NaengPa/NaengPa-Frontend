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
  const [article, setArticle] = useRecoilState(articleAtom);
  const setPreviewImgList = useSetRecoilState(articlePreviewImgAtom);
  const navigate = useNavigate();
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
    console.log(article);
    setText("");
    setImgList([]);
    setPreviewImgList([]);
    navigate("/community");
  };
  return <button onClick={onClick}>등록</button>;
}

export default ArticleUploadBtn;

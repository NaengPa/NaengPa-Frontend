import { useRecoilState, useSetRecoilState } from "recoil";

import {
  articleImgAtom,
  articlePreviewImgAtom,
  articleTextAtom,
} from "../atom";
import { postArticle } from "../common/axios";

function ArticleUploadBtn() {
  const [text, setText] = useRecoilState(articleTextAtom);
  const [imgList, setImgList] = useRecoilState(articleImgAtom);
  const setPreviewImgList = useSetRecoilState(articlePreviewImgAtom);

  const onClick = (event) => {
    event.preventDefault();
    const newArticle = {
      imgs: imgList,
      content: text,
      email: "test123@gmail.com",
      recipeId: "",
    };
    async function post(newArticle) {
      await postArticle(newArticle);
    }

    post(newArticle);
    setText("");
    setImgList([]);
    setPreviewImgList([]);
  };
  return <button onClick={onClick}>등록</button>;
}

export default ArticleUploadBtn;

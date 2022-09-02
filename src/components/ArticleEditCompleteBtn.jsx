import { useNavigate } from "react-router-dom";
import { useRecoilState, useSetRecoilState } from "recoil";
import {
  articleAtom,
  articleImgAtom,
  articlePreviewImgAtom,
  articleTextAtom,
} from "../atom";

import { editArticle } from "../common/axios";

function ArticleEditCompleteBtn({ id }) {
  const [text, setText] = useRecoilState(articleTextAtom);
  const [imgList, setImgList] = useRecoilState(articleImgAtom);
  const [article, setArticle] = useRecoilState(articleAtom);
  const setPreviewImgList = useSetRecoilState(articlePreviewImgAtom);
  const navigate = useNavigate();

  const onClick = (event) => {
    event.preventDefault();
    const editedArticle = {
      id: id,
      email: JSON.parse(localStorage.getItem("userInfo")).email,
      content: text,
    };
    async function put(editedArticle) {
      await editArticle(editedArticle);
    }

    put(editedArticle);
    setArticle((prev) => {
      const editedArticleArr = [...prev].map((item) =>
        item.id === id ? { ...item, content: text } : item
      );
      return editedArticleArr;
    });
    setText("");
    navigate("/community");
  };
  return <button onClick={onClick}>수정</button>;
}

export default ArticleEditCompleteBtn;

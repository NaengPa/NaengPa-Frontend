import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { articleAtom, articleTextAtom } from "../../atom";

import { editArticle } from "../../common/axios";

function ArticleEditCompleteBtn({ id }) {
  const [text, setText] = useRecoilState(articleTextAtom);
  const [, setArticle] = useRecoilState(articleAtom);
  const [isDisabled, setIsDisabled] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    text ? setIsDisabled(false) : setIsDisabled(true);
  }, [text]);

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
  return (
    <button disabled={isDisabled} onClick={onClick}>
      수정
    </button>
  );
}

export default ArticleEditCompleteBtn;

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { articleAtom, articleTextAtom } from "../../atom";

import { editArticle } from "../../common/axios";
import LoadingScreen from "../LoadingScreen";

function ArticleEditCompleteBtn({ id }) {
  const [text, setText] = useRecoilState(articleTextAtom);
  const [, setArticle] = useRecoilState(articleAtom);
  const [isDisabled, setIsDisabled] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

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
    setArticle((prev) => {
      const editedArticleArr = [...prev].map((item) =>
        item.id === id ? { ...item, content: text } : item
      );
      return editedArticleArr;
    });
    async function put(editedArticle) {
      setIsLoading(true);
      await editArticle(editedArticle);
      setText("");
      setIsLoading(false);
      navigate("/community");
    }

    put(editedArticle);
  };
  return (
    <>
      {isLoading ? <LoadingScreen /> : null}
      <button disabled={isDisabled} onClick={onClick}>
        수정
      </button>
    </>
  );
}

export default ArticleEditCompleteBtn;

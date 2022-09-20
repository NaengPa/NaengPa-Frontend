import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { articleAtom, articleTextAtom } from "../../atom";
import { editArticle } from "../../common/axios";
import LoadingPortal from "../LoadingPortal";
import LoadingScreen from "../LoadingScreen";
import styled from "styled-components";

const EditBtn = styled.button`
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 20px;
  text-align: center;
  color: ${(props) => props.theme.colors.MAIN_COLOR};
  :disabled {
    color: ${(props) => props.theme.colors.GREY_30};
  }
`;

function ArticleEditCompleteBtn({ id, width }) {
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
      <LoadingPortal>
        {isLoading ? <LoadingScreen width={width} /> : null}
      </LoadingPortal>
      <EditBtn disabled={isDisabled} onClick={onClick}>
        수정
      </EditBtn>
    </>
  );
}

export default ArticleEditCompleteBtn;

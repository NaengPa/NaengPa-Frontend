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
import styled from "styled-components";

const UploadBtn = styled.button`
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 20px;
  text-align: center;
  color: ${(props) => props.theme.colors.GREY_30};
`;

function ArticleUploadBtn({ width }) {
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

  console.log(width);
  return (
    <>
      <LoadingPortal>
        {isLoading ? <LoadingScreen width={width} /> : null}
      </LoadingPortal>
      <UploadBtn disabled={isDisabled} onClick={onClick}>
        등록
      </UploadBtn>
    </>
  );
}

export default ArticleUploadBtn;

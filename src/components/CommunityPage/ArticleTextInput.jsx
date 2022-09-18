import { useEffect } from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { articleTextAtom } from "../../atom";

const Wrapper = styled.div`
  width: 100%;
  height: calc(100% - 200px);
`;
const StyledInput = styled.textarea`
  width: 100%;
  height: 100%;

  word-wrap: break-word;
  border: none;
  resize: none;
  &:focus {
    outline: none;
  }
  ::placeholder {
    color: ${(props) => props.theme.colors.GREY_30};
  }
`;

function ArticleTextInput() {
  const [text, setText] = useRecoilState(articleTextAtom);

  useEffect(() => {
    setText("");
  }, []);

  const onTextChange = (event) => {
    const {
      target: { value },
    } = event;
    setText(value);
  };

  return (
    <Wrapper>
      <StyledInput
        value={text}
        onChange={onTextChange}
        placeholder="내용을 입력해주세요"
      />
    </Wrapper>
  );
}
export default ArticleTextInput;

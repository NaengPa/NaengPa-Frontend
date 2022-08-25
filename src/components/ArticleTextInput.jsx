import { useRecoilState } from "recoil";
import styled from "styled-components";
import { articleTextAtom } from "../atom";

const StyledInput = styled.input`
  border: none;
  &:focus {
    outline: none;
  }
  ::placeholder {
    color: #b6c4cf;
  }
`;

function ArticleTextInput() {
  const [text, setText] = useRecoilState(articleTextAtom);
  const onTextChange = (event) => {
    const {
      target: { value },
    } = event;
    setText(value);
  };

  return (
    <StyledInput
      value={text}
      onChange={onTextChange}
      placeholder="내용을 입력해주세요"
    />
  );
}
export default ArticleTextInput;

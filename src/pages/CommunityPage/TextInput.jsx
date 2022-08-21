import styled from "styled-components";

const StyledInput = styled.input`
  border: none;
  &:focus {
    outline: none;
  }
  ::placeholder {
    color: #b6c4cf;
  }
`;

function TextInput() {
  return <StyledInput placeholder="내용을 입력해주세요" />;
}
export default TextInput;

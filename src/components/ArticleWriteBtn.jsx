import { Link } from "react-router-dom";
import styled from "styled-components";
import { ReactComponent as Plus } from "../assets/plus.svg";

const Button = styled.button`
  width: 54px;
  height: 54px;
  background: ${(props) => props.theme.colors.MAIN_COLOR};
  border-radius: 50%;
`;

const BtnContainer = styled.div`
  width: 54px;
  height: 54px;
  position: fixed;
  bottom: 72px;
  filter: drop-shadow(0px 0px 10px rgba(0, 0, 0, 0.25));
  z-index: 20;
`;

function ArticleWriteBtn() {
  return (
    <BtnContainer>
      <Link to={{ pathname: "/write" }}>
        <Button>
          <Plus />
        </Button>
      </Link>
    </BtnContainer>
  );
}
export default ArticleWriteBtn;

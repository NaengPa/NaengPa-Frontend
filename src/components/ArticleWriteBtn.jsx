import { Link } from "react-router-dom";
import styled from "styled-components";
import { ReactComponent as Plus } from "../assets/plus.svg";

const Button = styled.button`
  width: 54px;
  height: 54px;
  background: #0091ff;
  border-radius: 50%;
`;

const BtnContainer = styled.div`
  width: 54px;
  height: 54px;
  position: sticky;
  bottom: 56px;
  transform: translateX(340px);
  filter: drop-shadow(0px 0px 10px rgba(0, 0, 0, 0.25));
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

import styled from "styled-components";

const DevideLine = styled.div`
  height: 1px;
  border: none;
  border-bottom: 1px solid #b6c4cf;
  margin: 16px 0;
`;

function Divider() {
  return <DevideLine />;
}
export default Divider;

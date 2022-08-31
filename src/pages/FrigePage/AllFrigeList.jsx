import { useRecoilState } from "recoil";
import styled from "styled-components";
import { myFrigeAtom } from "../../atom";

const IngredientItem = styled.button`
  height: 36px;

  display: flex;
  align-items: center;

  padding: 0;
  border: 1px solid ${(props) => props.theme.colors.PRIMARY_300};
  border-radius: 50px;
  color: ${(props) => props.theme.colors.PRIMARY_300};
`;

const SelectedIngredientItem = styled.button`
  background: ${(props) => props.theme.colors.MAIN_COLOR};
  border: 1px solid ${(props) => props.theme.colors.MAIN_COLOR};
  border-radius: 50px;
  display: flex;
  align-items: center;
  height: 36px;
  padding: 0;
  color: #ffffff;
`;

const IngredientName = styled.p`
  margin: 10px 15px;
  font-style: normal;
  font-weight: 600;
  font-size: 13px;
  line-height: 20px;
  text-align: center;
  letter-spacing: -0.005em;
`;

const AllFrigeListContainer = styled.div`
  width: 100%;
  padding: 0px 16px 16px 16px;
  flex-wrap: wrap;
  display: flex;
  gap: 8px;
  overflow-y: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
`;

function AllFrigeList({ irdnt }) {
  const [myFrige, setMyFrige] = useRecoilState(myFrigeAtom);

  return (
    <AllFrigeListContainer>
      {irdnt.map((item) =>
        myFrige.indexOf(item) === -1 ? (
          <IngredientItem onClick={() => setMyFrige((prev) => [...prev, item])}>
            <IngredientName>{item}</IngredientName>
          </IngredientItem>
        ) : (
          <SelectedIngredientItem
            onClick={() =>
              setMyFrige((prev) =>
                [...prev].filter((element) => element !== item)
              )
            }
          >
            <IngredientName>{item}</IngredientName>
          </SelectedIngredientItem>
        )
      )}
    </AllFrigeListContainer>
  );
}

export default AllFrigeList;

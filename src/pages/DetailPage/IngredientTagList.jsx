import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { selectedIngredientAtom } from "../../atom";

const StyledIngredientTagList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 27px;
`;

const SelectedIngredientTag = styled.div`
  align-items: center;
  background: ${(props) => props.theme.colors.MAIN_COLOR};
  padding: 8px 16px;
  border: 1px solid ${(props) => props.theme.colors.MAIN_COLOR};
  border-radius: 50px;
  display: flex;
  height: 36px;
  background: ${(props) => props.theme.colors.MAIN_COLOR};

  font-style: normal;
  font-weight: 600;
  font-size: 13px;
  line-height: 20px;
  text-align: center;
  letter-spacing: -0.005em;
  color: #ffffff;
`;

const UnSelectedIngredientTag = styled.div`
  align-items: center;
  height: 36px;
  background: #ffffff;
  border: 1px solid ${(props) => props.theme.colors.GREY_50};
  border-radius: 50px;
  padding: 8px 16px;
  display: flex;

  font-style: normal;
  font-weight: 600;
  font-size: 13px;
  line-height: 20px;
  text-align: center;
  letter-spacing: -0.005em;
  color: ${(props) => props.theme.colors.GREY_50};
`;

function IngredientTagList({ recipeIrdnts }) {
  const selectedIngredient = useRecoilValue(selectedIngredientAtom);

  return (
    <StyledIngredientTagList>
      {recipeIrdnts?.map((item) => {
        for (let x of selectedIngredient) {
          if (x === item.irdntNm) {
            return (
              <SelectedIngredientTag key={item.irdntNm}>
                {item.irdntNm}
              </SelectedIngredientTag>
            );
          }
        }
        return (
          <UnSelectedIngredientTag key={item.irdntNm}>
            {item.irdntNm}
          </UnSelectedIngredientTag>
        );
      })}
    </StyledIngredientTagList>
  );
}

export default IngredientTagList;

import styled from "styled-components";

const RecipeDetailPhotoContainer = styled.div`
  position: relative;
  height: 181px;
  width: 100%;
  overflow: hidden;
  border-radius: 5px;
  margin-bottom: 16px;
`;

const RecipeDetailPhoto = styled.img`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  height: 181px;
  width: 100%;
  object-fit: cover;
`;

const ItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 16px 0px 0px 0px;
  border-bottom: 0.5px solid rgba(46, 140, 254, 0.3);
`;

const RecipeDescriptionText = styled.p`
  font-style: normal;
  font-weight: 500;
  font-size: 13px;
  line-height: 20px;
  letter-spacing: -0.01em;
  color: ${(props) => props.theme.colors.GREY_50};
  margin: 0;
`;

const RecipeNoContainer = styled.div`
  width: 60px;
  height: 27px;
  background: rgba(46, 140, 254, 0.13);
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5px 10px;
  margin-right: 8px;
  white-space: nowrap;
  font-weight: 700;
  font-size: 14px;
  line-height: 17px;
  letter-spacing: -0.165px;
  color: ${(props) => props.theme.colors.MAIN_COLOR};
`;

const RecipeDescriptionContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 8px;
`;

function RecipeDetailItem({ description, src, no }) {
  return (
    <ItemContainer>
      {src !== "" ? (
        <RecipeDetailPhotoContainer>
          <RecipeDetailPhoto src={src} />
        </RecipeDetailPhotoContainer>
      ) : null}
      <RecipeDescriptionContainer>
        <RecipeNoContainer>Step {no}</RecipeNoContainer>
        <RecipeDescriptionText>{description}</RecipeDescriptionText>
      </RecipeDescriptionContainer>
    </ItemContainer>
  );
}

export default RecipeDetailItem;

import styled from "styled-components";

const CardContainer = styled.div`
  width: 100%;
  height: 94px;
  background: #eff3f8;
  border-radius: 5px;
  display: flex;
  padding: 16px;
  justify-content: space-between;
  align-items: center;
`;
const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
`;
const Title = styled.span`
  font-weight: 600;
  font-size: 16px;
  line-height: 20px;
  color: #132029;
`;
const Subtitle = styled.span`
  font-weight: 600;
  font-size: 13px;
  line-height: 20px;
  letter-spacing: -0.005em;
  color: #698292;
`;
const RecipeImg = styled.img`
  width: 111px;
  height: 62px;
  border-radius: 5px;
  object-fit: contain;
`;

function ReferredRecipeCard() {
  return (
    <CardContainer>
      <TextContainer>
        <Title>이 레시피를 참고했어요</Title>
        <Subtitle>오픈 아보카도 샌드위치</Subtitle>
      </TextContainer>
      <RecipeImg src="https://image.ytn.co.kr/general/jpg/2021/0311/202103110915014429_d.jpg" />
    </CardContainer>
  );
}

export default ReferredRecipeCard;

import { useState } from "react";
import styled from "styled-components";
import { ReactComponent as PlusIcon } from "../../assets/plusCreateRecipeDetail.svg";
import ErrorModal from "../ErrorModal";
import ModalPortal from "../ModalPortal";

const CreateRecipeReviewContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-width: 160px;
  height: 90px;
  background: ${(props) => props.theme.colors.GREY_10};
  border-radius: 5px;
`;

const Subtitle = styled.span`
  margin-top: 5px;
  font-style: normal;
  font-weight: 600;
  font-size: 13px;
  line-height: 20px;
  letter-spacing: -0.01em;
  color: ${(props) => props.theme.colors.GREY_40};
`;

function CreateRecipeReview() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleModal = () => {
    setIsModalOpen((prev) => !prev);
  };
  return (
    <>
      <ModalPortal>
        {isModalOpen ? (
          <ErrorModal
            isModalOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
          />
        ) : null}
      </ModalPortal>
      <CreateRecipeReviewContainer onClick={handleModal}>
        <PlusIcon />
        <Subtitle>저도 자랑할래요</Subtitle>
      </CreateRecipeReviewContainer>
    </>
  );
}

export default CreateRecipeReview;

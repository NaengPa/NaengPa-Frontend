import React from "react";
import styled from "styled-components";
import FilterCategoryButton from "./filterCategoryButton";

const FilterCategory = ({ filterItem }) => {
  return (
    <Container>
      <CategoryWrapper>
        <CategoryTitle>{filterItem.title}</CategoryTitle>
        <CategoryButtonContainer>
          {filterItem.category.map((item) => (
            <FilterCategoryButton item={item}></FilterCategoryButton>
          ))}
        </CategoryButtonContainer>
      </CategoryWrapper>
    </Container>
  );
};

export default FilterCategory;

const Container = styled.div`
  margin-bottom: 20px;
`;

const CategoryWrapper = styled.div``;

const CategoryTitle = styled.div`
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 10px;
`;

const CategoryButtonContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

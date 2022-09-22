import React from "react";
import styled from "styled-components";
import FilterCategoryButton from "./FilterCategoryButton";

const FilterCategory = ({
  filterItem,
  handleFilterClick,
  filterFoodData,
  firstIndex,
  handleFilter,
}) => {
  return (
    <Container>
      <CategoryWrapper>
        <CategoryTitle>{filterItem.title}</CategoryTitle>
        <CategoryButtonContainer>
          {filterItem.category.map((item, index) => (
            <FilterCategoryButton
              handleFilter={handleFilter}
              secondIndex={index}
              firstIndex={firstIndex}
              filterFoodData={filterFoodData}
              handleFilterClick={handleFilterClick}
              filterItem={filterItem}
              item={item}
            ></FilterCategoryButton>
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

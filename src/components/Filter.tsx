import styled from "styled-components";
import { useState } from "react";

type FilterProps = {
  onSetFilteredProducts: (
    selectValue: string,
    checkboxesValues: string[]
  ) => void;
};

const Filter = ({ onSetFilteredProducts }: FilterProps) => {
  const [checkboxesValues, setCheckboxesValues] = useState<string[]>([]);
  const [selectValue, setSelectValue] = useState("");

  const handleFilterChange: React.ChangeEventHandler<
    HTMLSelectElement | HTMLInputElement
  > = (event) => {
    const { value, type } = event.target;
    if (type === "checkbox") {
      const checkboxElement = event.target as HTMLInputElement;
      const changedCheckboxesValues = checkboxElement.checked
        ? [...checkboxesValues, value]
        : checkboxesValues.filter(
            (checkboxesValue) => checkboxesValue !== value
          );
      setCheckboxesValues(changedCheckboxesValues);
      onSetFilteredProducts(selectValue, changedCheckboxesValues);
      console.log("checkbox changed");
    }
    if (type === "select-one") {
      const changedSelectValue = event.target.value;
      setSelectValue(changedSelectValue);
      onSetFilteredProducts(changedSelectValue, checkboxesValues);
      console.log(checkboxesValues);
      console.log("select changed");
    }
  };

  return (
    <FilterContainer>
      <StyledLabel htmlFor="filter">Sortieren nach:</StyledLabel>
      <StyledSelect id="filter" onChange={handleFilterChange}>
        <option value="recommendation">Empfolen</option>
        <option value="price ascending">Preis:Aufsteigend</option>
        <option value="price descending">Preis:Absteigend</option>
        <option value="new arrivals first">Neuheiten</option>
      </StyledSelect>
      <label>
        <StyledInput
          type="checkbox"
          name="wallet"
          value="wallet"
          onChange={handleFilterChange}
        />
        Geldbörse
      </label>
      <label>
        <StyledInput
          type="checkbox"
          name="cardholder"
          value="cardholder"
          onChange={handleFilterChange}
        />
        Kartenhalter
      </label>
      <label>
        <StyledInput
          type="checkbox"
          name="pendant"
          value="pendant"
          onChange={handleFilterChange}
        />
        Anhänger
      </label>
      <label>
        <StyledInput
          type="checkbox"
          name="bag"
          value="bag"
          onChange={handleFilterChange}
        />
        Tasche
      </label>
    </FilterContainer>
  );
};

export default Filter;

const FilterContainer = styled.section`
  margin: 1em auto;
  padding: 0 1em;
  width: 94%;
  border-radius: 1em;
  border: solid 3px var(--color-04);
  display: flex;
  flex-flow: wrap;
  justify-content: space-evenly;
  align-items: center;
`;
const StyledLabel = styled.label`
  font-weight: bold;
`;

const StyledSelect = styled.select`
  margin: 1em;
  width: 12em;
  height: 2em;
  border-radius: 5px;
  background-color: var(--color-01);
`;

const StyledInput = styled.input`
  accent-color: var(--color-05);
`;

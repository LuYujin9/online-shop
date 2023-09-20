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
    <>
      <label htmlFor="filter">Sortieren nach:</label>
      <select id="filter" onChange={handleFilterChange}>
        <option value="recommendation">Empfolen</option>
        <option value="price ascending">Preis:Aufsteigend</option>
        <option value="price descending">Preis:Absteigend</option>
        <option value="new arrivals first">Neuheiten</option>
      </select>
      <label>
        <input
          type="checkbox"
          name="wallet"
          value="wallet"
          onChange={handleFilterChange}
        />
        Geldbörse
      </label>
      <label>
        <input
          type="checkbox"
          name="cardholder"
          value="cardholder"
          onChange={handleFilterChange}
        />
        Kartenhalter
      </label>
      <label>
        <input
          type="checkbox"
          name="pendant"
          value="pendant"
          onChange={handleFilterChange}
        />
        Anhänger
      </label>
      <label>
        <input
          type="checkbox"
          name="bag"
          value="bag"
          onChange={handleFilterChange}
        />
        Tasche
      </label>
    </>
  );
};

export default Filter;

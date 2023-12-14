import React from "react";

const Select = ({ id, name, selectValue, onChange, options, values, labelText }) => (
  <label>
    {labelText}
    <select id={id} name={name} value={selectValue} onChange={onChange}>
      {options.map((option, index) => (
        <option key={index} value={values[index]}>{option}</option>
        ))}
    </select>
  </label>
);

export default Select;

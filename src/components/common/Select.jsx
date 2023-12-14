import React from "react";

const Select = ({ id, name, className, labelClassName, selectValue, onChange, options, values, labelText }) => (
  <label className={labelClassName}>
    {labelText}
    <select id={id} className={className} name={name} value={selectValue} onChange={onChange}>
      {options.map((option, index) => (
        <option key={index} value={values[index]}>{option}</option>
        ))}
    </select>
  </label>
);

export default Select;

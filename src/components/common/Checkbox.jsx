import React from "react";

const Checkbox = ({ id, label, labelClassName, onChange }) => (
  <>
    <label htmlFor={id} className={labelClassName}>
      {label}
    </label>
    <input
      id={id}
      className="toggle-filters-input"
      type="checkbox"
      onChange={onChange}
    />
  </>
);

export default Checkbox;

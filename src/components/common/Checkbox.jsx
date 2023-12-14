import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Checkbox = ({ id, label, icon, labelClassName, onChange }) => (
  <>
    <label htmlFor={id} className={labelClassName}>
      {icon && <FontAwesomeIcon icon={icon} />}
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

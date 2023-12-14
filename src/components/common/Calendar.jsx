import React from "react";

const Calendar = ({ labelText, className, labelClassName, onChange }) => (
  <label className={labelClassName}>
    {labelText}
    <input type="date" className={className} onChange={onChange} />
  </label>
);

export default Calendar;

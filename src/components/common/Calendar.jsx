import React from "react";

const Calendar = ({ labelText, onChange }) => (
  <label>
    {labelText}
    <input type="date" onChange={onChange} />
  </label>
);

export default Calendar;

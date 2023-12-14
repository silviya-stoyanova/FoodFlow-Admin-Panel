import React from "react";

const Button = ({ className, text, disabled, onClick }) => (
  <button className={className} disabled={disabled} onClick={onClick}>
    {text}
  </button>
);

export default Button;

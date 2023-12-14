import React from "react";

const Button = ({ className, text, disabled, onClick, children }) => (
  <button className={className} disabled={disabled} onClick={onClick}>
    {children ? children : text}
  </button>
);

export default Button;

import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const formatCellWithDate = (cell) =>
  Date.parse(cell) && cell.toLocaleDateString("en-GB", "dd/MM/YYYY");

const convertToTitleCase = (text) => {
  const words = text.replace(/([A-Z])/g, " $1").toLowerCase();
  return words.charAt(0).toUpperCase() + words.slice(1);
};

const reverseDate = (date) => date.split("/").reverse().join("/");

const formatBooleanCellWithIcon = (cell, truthyIcon, falsyIcon) =>
  cell.getValue() === true ? (
    <FontAwesomeIcon icon={truthyIcon} color="#656565" />
  ) : (
    <FontAwesomeIcon icon={falsyIcon} color="#D32F2F" />
  );

export {
  formatCellWithDate,
  reverseDate,
  convertToTitleCase,
  formatBooleanCellWithIcon,
};

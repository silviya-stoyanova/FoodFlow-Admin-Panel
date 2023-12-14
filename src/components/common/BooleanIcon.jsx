import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const BooleanIcon = ({ boolean, truthyIcon, falsyIcon }) =>
  boolean ? (
    <FontAwesomeIcon icon={truthyIcon} color="#656565" />
  ) : (
    <FontAwesomeIcon icon={falsyIcon} color="#D22F2F" />
  );

export default BooleanIcon;

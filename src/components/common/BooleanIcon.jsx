import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose, faCheck } from "@fortawesome/free-solid-svg-icons";

const BooleanIcon = ({ boolean }) =>
  boolean ? (
    <FontAwesomeIcon icon={faCheck} color="#656565" />
  ) : (
    <FontAwesomeIcon icon={faClose} color="#D22F2F" />
  );

export default BooleanIcon;

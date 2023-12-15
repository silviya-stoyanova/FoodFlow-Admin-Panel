import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBan, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import {
  DELETE_PROMPT_TEXT,
  REJECT_PROMPT_TEXT,
  STATUSES,
} from "../../utils/constants";
import Button from "../common/Button";

const { REJECTED } = STATUSES;

const TableActions = ({
  row,
  data,
  setData,
  setDisplayData,
  setPage,
  isOneRowOnPage,
  rejectButtonTitle,
  deleteButtonTitle,
}) => {
  const markAsRejected = (id) => {
    const confirmed = window.confirm(REJECT_PROMPT_TEXT);

    if (confirmed) {
      setData(
        data.map((row) => ({
          ...row,
          status: row.id === id ? REJECTED : row.status,
        }))
      );
    }
  };

  const handleDelete = (id) => {
    const confirmed = window.confirm(DELETE_PROMPT_TEXT);

    if (confirmed) {
      setData(data.filter((row) => row.id !== id));

      if (isOneRowOnPage) {
        setPage(0);
      }
    }
  };

  return (
    <td className="table-data table-data-actions">
      <Button
        text="Reject"
        onClick={() => markAsRejected(row.id)}
        className="table-data-actions-button"
      >
        <FontAwesomeIcon
          icon={faBan}
          color="#656565"
          title={rejectButtonTitle}
        />
      </Button>
      <Button
        text="Delete"
        onClick={() => handleDelete(row.id)}
        className="table-data-actions-button"
      >
        <FontAwesomeIcon
          icon={faTrashCan}
          color="#D22F2F"
          title={deleteButtonTitle}
        />
      </Button>
    </td>
  );
};

export default TableActions;

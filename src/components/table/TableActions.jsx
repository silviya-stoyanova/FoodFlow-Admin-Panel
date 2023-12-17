import React, { useContext, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBan, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import {
  DELETE_PROMPT_TEXT,
  REJECT_PROMPT_TEXT,
  STATUSES,
} from "../../utils/constants";
import Button from "../common/Button";
import { DataContext } from "../orders-table/OrdersTable";
import { FiltersContext } from "./Table";
import filterData from "../../utils/filter";

const { REJECTED } = STATUSES;

const TableActions = ({
  row,
  setPage,
  setDisplayData,
  isOneRowOnPage,
  rejectButtonTitle,
  deleteButtonTitle,
}) => {
  const { data, setData } = useContext(DataContext);
  const { filters } = useContext(FiltersContext);

  const markAsRejected = (id) => {
    const confirmed = window.confirm(REJECT_PROMPT_TEXT);

    if (confirmed) {
      setData((prevData) => {
        const updatedData = prevData.map((row) => ({
          ...row,
          status: row.id === id ? REJECTED : row.status,
        }));

        filterData(updatedData, filters, setDisplayData, setPage);
        return updatedData;
      });
    }
  };

  const handleDelete = (id) => {
    const confirmed = window.confirm(DELETE_PROMPT_TEXT);

    if (confirmed) {
      setData((prevData) => prevData.filter((row) => row.id !== id));

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

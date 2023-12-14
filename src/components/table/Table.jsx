import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBan, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { convertToTitleCase, formatCellWithDate } from "../../utils/common";
import {
  REJECT_PROMPT_TEXT,
  DELETE_PROMPT_TEXT,
  STATUSES,
} from "../../utils/constants";
import BooleanIcon from "../common/BooleanIcon";
import Button from "../common/Button";
import Pagination from "./Pagination";
import Filters from "./Filters";

const { REJECTED } = STATUSES;

const Table = ({ data, setData, rejectButtonTitle, deleteButtonTitle }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [displayData, setDisplayData] = useState([]);

  const headers = data.length ? Object.keys(data[0]) : [];
  const firstRowOnPage = page * rowsPerPage;
  const lastRowOnPage = page * rowsPerPage + rowsPerPage;
  const rows =
    rowsPerPage > 0
      ? displayData.slice(firstRowOnPage, lastRowOnPage)
      : displayData;

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
    }
  };

  return (
    <section className="table-container">
      {/* {console.log(data)} */}
      <Filters data={data} setDisplayData={setDisplayData} />

      <article className="table-inner-container">
        <table className="table">
          <thead className="table-head">
            <tr className="table-row">
              {headers.map((header) => (
                <th className="table-header" key={header}>
                  {convertToTitleCase(header)}
                </th>
              ))}
              <th className="table-header">Actions</th>
            </tr>
          </thead>
          <tbody className="table-body">
            {rows.map((row, index) => (
              <tr className="table-row" key={index}>
                {headers.map((header) => (
                  <td className="table-data" key={header}>
                    {row[header] instanceof Date ? (
                      formatCellWithDate(row[header])
                    ) : typeof row[header] === "boolean" ? (
                      <BooleanIcon boolean={row[header]} />
                    ) : (
                      row[header]
                    )}
                  </td>
                ))}
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
              </tr>
            ))}
          </tbody>
        </table>
      </article>

      <Pagination
        page={page}
        setPage={setPage}
        rowsPerPage={rowsPerPage}
        setRowsPerPage={setRowsPerPage}
        displayData={displayData}
      />
    </section>
  );
};

export default Table;

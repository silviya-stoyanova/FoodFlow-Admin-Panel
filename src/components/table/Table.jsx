import React, { useState } from "react";
import { convertToTitleCase, formatCellWithDate } from "../../utils/common";
import { STATUSES } from "../../utils/constants";
import BooleanIcon from "../common/BooleanIcon";
import Button from "../common/Button";
import Pagination from "./Pagination";
import Filters from "./Filters";

const { REJECTED } = STATUSES;

const Table = ({ data, setData }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [displayData, setDisplayData] = useState([]);

  const headers = data.length ? Object.keys(data[0]) : [];
  const firstRowOnPage = page * rowsPerPage;
  const lastRowOnPage = page * rowsPerPage + rowsPerPage;
  const rows =
    rowsPerPage > 0
      ? displayData.slice(firstRowOnPage, lastRowOnPage)
      : displayData;

  const markAsRejected = (id) => {
    setData(
      data.map((row) => ({
        ...row,
        status: row.id === id ? REJECTED : row.status,
      }))
    );
  };

  const handleDelete = (id) => {
    setData(data.filter((row) => row.id !== id));
  };

  return (
    <section className="table-container">
      <Filters data={data} setDisplayData={setDisplayData} />

      <table className="table">
        <thead>
          <tr>
            {headers.map((header) => (
              <th key={header}>{convertToTitleCase(header)}</th>
            ))}
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={index}>
              {headers.map((header) => (
                <td key={header}>
                  {row[header] instanceof Date ? (
                    formatCellWithDate(row[header])
                  ) : typeof row[header] === "boolean" ? (
                    <BooleanIcon boolean={row[header]} />
                  ) : (
                    row[header]
                  )}
                </td>
              ))}
              <td>
                <Button text="Reject" onClick={() => markAsRejected(row.id)} />
                <Button text="Delete" onClick={() => handleDelete(row.id)} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

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

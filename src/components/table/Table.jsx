import React, { useState } from "react";
import { convertToTitleCase, formatCellWithDate } from "../../utils/common";
import { STATUSES } from "../../utils/constants";
import Button from "../common/Button";
import Pagination from "./Pagination";
import Filters from "./Filters";

const { REJECTED } = STATUSES;

const Table = ({ data, setData }) => {
  const [displayData, setDisplayData] = useState([]);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);


  const handleMarkAsDeclined = (orderNumber) => {
    setData(
      data.map((order) => ({
        ...order,
        status: order.orderNumber === orderNumber ? REJECTED : order.status,
      }))
    );
  };

  const handleDelete = (orderNumber) => {
    setData(data.filter((order) => order.orderNumber !== orderNumber));
  };

  const headers = data.length ? Object.keys(data[0]) : [];

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
          {(rowsPerPage > 0
            ? displayData.slice(
                page * rowsPerPage,
                page * rowsPerPage + rowsPerPage
              )
            : displayData
          ).map((row) => (
            <tr key={row.orderNumber}>
              {headers.map((header) => (
                <td key={header}>
                  {row[header] instanceof Date
                    ? formatCellWithDate(row[header])
                    : typeof row[header] === "boolean"
                    ? row[header]
                      ? "true"
                      : "false"
                    : row[header]}
                </td>
              ))}
              <td>
                <Button
                  text="Reject"
                  onClick={() => handleMarkAsDeclined(row.orderNumber)}
                />
                <Button
                  text="Delete"
                  onClick={() => handleDelete(row.orderNumber)}
                />
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

import React, { useState } from "react";
import { convertToTitleCase, formatCellWithDate } from "../../utils/utils";
import { STATUSES } from "../../utils/constants";
import Button from "../common/Button";
import Pagination from "./Pagination";
import Filters from "./Filters";

const { REJECTED } = STATUSES;

const Table = ({ data, setData }) => {
  const [filtersLabel, setFiltersLabel] = useState("Show filters");
  const [displayData, setDisplayData] = useState([]);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);


  const handleMarkAsDeclined = (orderNumber) => {
    const updatedOrders = data.map((order) =>
      order.orderNumber === orderNumber ? { ...order, status: REJECTED } : order
    );

    setData(updatedOrders);
  };

  const handleDelete = (orderNumber) => {
    setData(data.filter((order) => order.orderNumber !== orderNumber));
  };

  const changeFiltersLabel = () => {
    return setFiltersLabel((prevToggleFiltersText) =>
      prevToggleFiltersText === "Show filters" ? "Hide filters" : "Show filters"
    );
  };

  const headers = data.length ? Object.keys(data[0]) : [];

  return (
    <section className="table-container">
      <label htmlFor="toggle-filters" className="toggle-filters-button">
        {filtersLabel}
      </label>
      <input
        id="toggle-filters"
        className="toggle-filters-input"
        type="checkbox"
        onChange={changeFiltersLabel}
      />

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

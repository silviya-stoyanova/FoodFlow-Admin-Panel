import React, { useState, useEffect } from "react";
import { PAYMENT_METHODS, STATUSES } from "../../utils/constants";
import {
  convertToTitleCase,
  formatCellWithDate,
  reverseDate,
} from "../../utils/utils";

const { REJECTED } = STATUSES;
const { CARD, CASH, INVOICE } = PAYMENT_METHODS;

const Table = ({ data, setData }) => {
  const [filters, setFilters] = useState({});
  const [filtersLabel, setFiltersLabel] = useState("Show filters");
  const [displayData, setDisplayData] = useState([]);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    filterData();
  }, [data, filters]);

  const filterData = () => {
    const filteredData = data.filter((item) => {
      let match = true;

      for (const key in filters) {
        const startDate = filters[key].start;
        const endDate = filters[key].end;
        const startDateFormatted =
          startDate && new Date(reverseDate(startDate));
        const endDateFormatted = endDate && new Date(reverseDate(endDate));

        if (!Date.parse(item[key])) {
          if (item[key].toString() !== filters[key].toString()) {
            match = false;
            break;
          }
        } else {
          if (startDate && endDate) {
            if (
              item[key] >= startDateFormatted &&
              item[key] <= endDateFormatted
            ) {
              match = true;
            } else {
              match = false;
              break;
            }
          } else if (startDate) {
            if (item[key] >= new Date(reverseDate(startDate))) {
              match = true;
            } else {
              match = false;
              break;
            }
          } else if (endDate) {
            if (item[key] <= endDateFormatted) {
              match = true;
            } else {
              match = false;
              break;
            }
          }
        }
      }

      return match;
    });
    setDisplayData(filteredData);
  };

  const onFilterChange = (e, column = null, type = null) => {
    const { name, value } = e.target;

    setFilters((prevFilters) =>
      value === ""
        ? (prevFilters) => {
            if (Date.parse(value)) {
              const { [column]: oldFilter, ...rest } = prevFilters;
              const { [type]: oldFilterType, ...otherOldFilterTypes } =
                oldFilter;
              return { ...otherOldFilterTypes, ...rest };
            } else {
              const { [name]: oldFilter, ...rest } = prevFilters;
              return rest;
            }
          }
        : Date.parse(value)
        ? {
            ...prevFilters,
            [column]: {
              ...prevFilters[column],
              [type]: value,
            },
          }
        : { ...prevFilters, [name]: value }
    );
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

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
      <article className="filters">
        <section>
          <label>
            Created on start date:
            <input
              type="date"
              onChange={(e) => onFilterChange(e, "createdDate", "start")}
            />
          </label>
          <label>
            Created on end date:
            <input
              type="date"
              onChange={(e) => onFilterChange(e, "createdDate", "end")}
            />
          </label>
        </section>
        <section>
          <label>
            Delivered on start date:
            <input
              type="date"
              onChange={(e) => onFilterChange(e, "deliveredDate", "start")}
            />
          </label>
          <label>
            Delivered on end date:
            <input
              type="date"
              onChange={(e) => onFilterChange(e, "deliveredDate", "end")}
            />
          </label>
        </section>
        <section>
          <label>
            Payment method:
            <select onChange={onFilterChange} name="paymentMethod">
              <option value="">All</option>
              <option value={CARD}>{CARD}</option>
              <option value={CASH}>{CASH}</option>
              <option value={INVOICE}>{INVOICE}</option>
            </select>
          </label>
        </section>
        <section>
          <label>
            Is paid:
            <select onChange={onFilterChange} name="isPaid">
              <option value="">All</option>
              <option value="true">true</option>
              <option value="false">false</option>
            </select>
          </label>
        </section>
        <section>
          <label>
            Is new customer:
            <select onChange={onFilterChange} name="isNewCustomer">
              <option value="">All</option>
              <option value="true">true</option>
              <option value="false">false</option>
            </select>
          </label>
        </section>
      </article>

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
                  {Date.parse(row[header])
                    ? formatCellWithDate(row[header])
                    : typeof row[header] === "boolean"
                    ? row[header]
                      ? "true"
                      : "false"
                    : row[header]}
                </td>
              ))}
              <td>
                <button onClick={() => handleMarkAsDeclined(row.orderNumber)}>
                  Reject
                </button>
                <button onClick={() => handleDelete(row.orderNumber)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <section className="pagination">
        <label htmlFor="rows-per-page">Rows per page:</label>
        <select
          id="rows-per-page"
          value={rowsPerPage}
          onChange={handleChangeRowsPerPage}
        >
          <option value={10}>10</option>
          <option value={25}>25</option>
          <option value={50}>50</option>
          <option value={100}>100</option>
        </select>

        <span className="showing">
          Showing {page * rowsPerPage + 1}-
          {Math.min((page + 1) * rowsPerPage, displayData.length)} of{" "}
          {displayData.length}
        </span>

        <button
          className="prev"
          onClick={(e) => handleChangePage(e, page - 1)}
          disabled={page === 0}
        >
          Prev
        </button>

        <button
          className="next"
          onClick={(e) => handleChangePage(e, page + 1)}
          disabled={page >= Math.ceil(displayData.length / rowsPerPage) - 1}
        >
          Next
        </button>
      </section>
    </section>
  );
};

export default Table;

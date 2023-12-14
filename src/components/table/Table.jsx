import React, { useState, useEffect } from "react";
import { PAYMENT_METHODS, STATUSES } from "../../utils/constants";
import {
  convertToTitleCase,
  formatCellWithDate,
  reverseDate,
} from "../../utils/utils";
import Pagination from "./Pagination";
import Select from "../common/Select";
import Calendar from "../common/Calendar";

const { REJECTED } = STATUSES;
const { ALL, CARD, CASH, INVOICE } = PAYMENT_METHODS;

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

        if (key !== "createdDate" && key !== "deliveredDate") {
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
            if (item[key] < new Date(reverseDate(startDate))) {
              match = false;
              break;
            }
          } else if (endDate) {
            if (item[key] > endDateFormatted || item[key] === "") {
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
        ? ((prevFilters) => {
            if (column === "createdDate" || "deliveredDate") {
              const { [column]: oldFilter, ...rest } = prevFilters;
              const { [type]: oldFilterType, ...otherOldFilterTypes } =
                oldFilter;

              // console.log({ [column]: otherOldFilterTypes, ...rest });

              return { [column]: otherOldFilterTypes, ...rest };
            } else {
              const { [name]: oldFilter, ...rest } = prevFilters;
              return rest;
            }
          })(prevFilters)
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
          <Calendar
            labelText="Created after:"
            onChange={(e) => onFilterChange(e, "createdDate", "start")}
          />
          <Calendar
            labelText="Created before:"
            onChange={(e) => onFilterChange(e, "createdDate", "end")}
          />
        </section>
        <section>
          <Calendar
            labelText="Delivered after:"
            onChange={(e) => onFilterChange(e, "deliveredDate", "start")}
          />
          <Calendar
            labelText="Delivered before:"
            onChange={(e) => onFilterChange(e, "deliveredDate", "end")}
          />
        </section>
        <section>
          <Select
            onChange={onFilterChange}
            name="paymentMethod"
            options={[ALL, CARD, CASH, INVOICE]}
            values={["", CARD, CASH, INVOICE]}
            labelText="Payment method:"
          />
        </section>
        <section>
          <Select
            onChange={onFilterChange}
            name="isPaid"
            options={[ALL, "true", "false"]}
            values={["", true, false]}
            labelText="Is paid:"
          />
        </section>
        <section>
          <Select
            onChange={onFilterChange}
            name="isNewCustomer"
            options={[ALL, "true", "false"]}
            values={["", true, false]}
            labelText="Is new customer:"
          />
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

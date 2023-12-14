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
  const [displayData, setDisplayData] = useState([]);

  useEffect(() => {
    filterData();
  }, [data, filters]);

  const filterData = () => {
    const filteredData = data.filter((item) => {
      let match = true;

      for (const key in filters) {
        console.log(filters);

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
        ? (({ [name]: oldFilter, ...rest }) => rest)(prevFilters)
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

  const headers = data.length ? Object.keys(data[0]) : [];


  return (
    <section className="table-container">
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
          {displayData.map((row) => (
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
    </section>
  );
};

export default Table;

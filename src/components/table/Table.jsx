import React, { useState, useContext } from "react";
import { DataContext } from "../orders-table/OrdersTable";
import Filters from "./Filters";
import TableHeader from "./TableHeader";
import TableBody from "./TableBody";
import Pagination from "./Pagination";

const Table = ({ rejectButtonTitle, deleteButtonTitle }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [displayData, setDisplayData] = useState([]);
  const { data } = useContext(DataContext);

  const headers = data.length ? Object.keys(data[0]) : [];
  const firstRowOnPage = page * rowsPerPage;
  const lastRowOnPage = page * rowsPerPage + rowsPerPage;
  const rows =
    rowsPerPage > 0
      ? displayData.slice(firstRowOnPage, lastRowOnPage)
      : displayData;

  return (
    <section className="table-container">
      <Filters setDisplayData={setDisplayData} setPage={setPage} />

      <article className="table-inner-container">
        <table className="table">
          <TableHeader headers={headers} />
          <TableBody
            rows={rows}
            headers={headers}
            setPage={setPage}
            rejectButtonTitle={rejectButtonTitle}
            deleteButtonTitle={deleteButtonTitle}
          />
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

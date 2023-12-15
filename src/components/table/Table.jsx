import React, { useState } from "react";
import Filters from "./Filters";
import TableHeader from "./TableHeader";
import TableBody from "./TableBody";
import Pagination from "./Pagination";

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

  return (
    <section className="table-container">
      {/* {console.log(data)} */}
      <Filters data={data} setDisplayData={setDisplayData} />

      <article className="table-inner-container">
        <table className="table">
          <TableHeader headers={headers} data={data} />
          <TableBody
            rows={rows}
            headers={headers}
            data={data}
            setData={setData}
            setDisplayData={setDisplayData}
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

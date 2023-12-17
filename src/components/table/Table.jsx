import React, { useState, useContext, useEffect, createContext } from "react";
import { DataContext } from "../orders-table/OrdersTable";
import Filters from "./Filters";
import TableHeader from "./TableHeader";
import TableBody from "./TableBody";
import Pagination from "./Pagination";

const FiltersContext = createContext(null);

const Table = ({
  rejectButtonTitle,
  deleteButtonTitle,
  shouldShowFilters,
  shouldShowPagination,
}) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [displayData, setDisplayData] = useState([]);
  const [filters, setFilters] = useState({});
  const { data, dataLength } = useContext(DataContext);

  const headers = data.length ? Object.keys(data[0]) : [];
  const firstRowOnPage = page * rowsPerPage;
  const lastRowOnPage = page * rowsPerPage + rowsPerPage;
  const rows =
    rowsPerPage > 0
      ? displayData.slice(firstRowOnPage, lastRowOnPage)
      : displayData;

  useEffect(() => {
    setDisplayData(data);
  }, [data]);

  useEffect(() => {
    setDisplayData(displayData);
  }, [displayData]);

  return (
    <FiltersContext.Provider value={{ filters, setFilters }}>
      <section className="table-container">
        {shouldShowFilters && (
          <Filters setDisplayData={setDisplayData} setPage={setPage} />
        )}

        <article
          className={
            shouldShowPagination && dataLength > 5
              ? "table-inner-container with-pagination"
              : "table-inner-container"
          }
        >
          <table className="table">
            <TableHeader headers={headers} />
            <TableBody
              rows={rows}
              headers={headers}
              setPage={setPage}
              setDisplayData={setDisplayData}
              rejectButtonTitle={rejectButtonTitle}
              deleteButtonTitle={deleteButtonTitle}
            />
          </table>
        </article>

        {shouldShowPagination && dataLength > 5 && (
          <Pagination
            page={page}
            setPage={setPage}
            rowsPerPage={rowsPerPage}
            setRowsPerPage={setRowsPerPage}
            displayData={displayData}
          />
        )}
      </section>
    </FiltersContext.Provider>
  );
};

export default Table;

export { FiltersContext };

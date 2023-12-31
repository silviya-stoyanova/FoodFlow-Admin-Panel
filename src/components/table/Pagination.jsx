import React from "react";
import Select from "../common/Select";
import Button from "../common/Button";

const Pagination = ({
  page,
  setPage,
  rowsPerPage,
  setRowsPerPage,
  displayData,
}) => {
  const firstItemOnPage = displayData.length ? page * rowsPerPage + 1 : 0;
  const lastItemOnPage = Math.min((page + 1) * rowsPerPage, displayData.length);
  const totalItems = displayData.length;
  const isPrevButtonDisabled = page === 0;
  const isNextButtonDisabled =
    page >= Math.ceil(displayData.length / rowsPerPage) - 1;

  const handleChangePage = (newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <section className="pagination">
      <Select
        id="rows-per-page"
        selectValue={rowsPerPage}
        onChange={handleChangeRowsPerPage}
        options={[5, 10, 25, 50]}
        values={[5, 10, 25, 50]}
        labelText="Rows per page:"
        className="pagination-label-select"
        labelClassName="pagination-label"
      />
      <p className="showing">
        Showing {firstItemOnPage}-{lastItemOnPage} of {totalItems} item(s)
      </p>
      <article>
        <Button
          className="pagination-prev-button"
          text="Prev"
          disabled={isPrevButtonDisabled}
          onClick={() => handleChangePage(page - 1)}
        />
        <Button
          className="pagination-next-button"
          text="Next"
          disabled={isNextButtonDisabled}
          onClick={() => handleChangePage(page + 1)}
        />
      </article>
    </section>
  );
};

export default Pagination;

import React, { useContext } from "react";
import { convertToTitleCase } from "../../utils/common";
import { ACTIONS_COLUMN, DATA_NOT_FOUND_TEXT } from "../../utils/constants";
import { DataContext } from "../orders-table/OrdersTable";

const TableHeader = ({ headers }) => {
  const { data } = useContext(DataContext);

  return (
    <thead className="table-head">
      <tr className="table-row">
        {headers.map((header) => (
          <th className="table-header" key={header}>
            {convertToTitleCase(header)}
          </th>
        ))}
        <th className="table-header">
          {data.length ? ACTIONS_COLUMN : DATA_NOT_FOUND_TEXT}
        </th>
      </tr>
    </thead>
  );
};

export default TableHeader;

import React from "react";
import { formatCellWithDate } from "../../utils/common";
import BooleanIcon from "../common/BooleanIcon";
import TableActions from "./TableActions";

const TableBody = ({
  rows,
  headers,
  setPage,
  rejectButtonTitle,
  deleteButtonTitle,
}) => (
  <tbody className="table-body">
    {rows.map((row, index) => (
      <tr className="table-row" key={index}>
        {headers.map((header) => (
          <td className="table-data" key={header}>
            {row[header] instanceof Date ? (
              formatCellWithDate(row[header])
            ) : typeof row[header] === "boolean" ? (
              <BooleanIcon boolean={row[header]} />
            ) : (
              row[header]
            )}
          </td>
        ))}
        <TableActions
          row={row}
          setPage={setPage}
          isOneRowOnPage={rows.length === 1}
          rejectButtonTitle={rejectButtonTitle}
          deleteButtonTitle={deleteButtonTitle}
        />
      </tr>
    ))}
  </tbody>
);

export default TableBody;

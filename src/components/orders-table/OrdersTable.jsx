import React, { useState, useEffect } from "react";
import {
  DELETE_PROMPT_TEXT,
  MANAGE_ORDERS_TITLE,
  REJECT_PROMPT_TEXT,
} from "../../utils/constants";
import { getOrdersData } from "../../services/get-data";
import Table from "../table/Table";

const OrdersTable = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    (async () => {
      var ordersData = await getOrdersData();
      setData(ordersData);
    })();
  }, []);

  return (
    <main className="page">
      <h1 className="page-title">{MANAGE_ORDERS_TITLE}</h1>
      <Table
        data={data}
        setData={setData}
        rejectButtonTitle="Reject"
        deleteButtonTitle="Delete"
      />
    </main>
  );
};

export default OrdersTable;
